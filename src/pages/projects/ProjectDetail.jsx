import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject, getProjectById } from "../../services/projectService";
import ConfirmModal from "../../components/ConfirmModal";
import { useAuth } from "../../context/AuthContext";
import { getTasks, updateTask } from "../../services/taskService";
import { getMembers } from "../../services/profileService";
import { IoIosAdd, IoIosArrowRoundBack } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { supabase } from "../../lib/supabase";
import Container from "../../components/Container";
import TaskCard from "../../components/TaskCard";
import TaskFilters from "../../components/TaskFilters";
import { capitalize, formatDate } from "../../utils/formatters";
import { LuCalendar1, LuCalendarClock } from "react-icons/lu";

const ProjectDetail = () => {
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [openDropdown, setOpenDropdown] = useState(null);
  const { id } = useParams();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const onConfirm = async () => {
    // first delete all the tasks, before deleting the projects..
    const { error: taskError } = await supabase
      .from("tasks")
      .delete()
      .eq("project_id", projectData.id);

    if (taskError) {
      setError(taskError.message);
      return;
    }

    // deleting the project
    const { error } = await deleteProject(projectData?.id);
    if (error) {
      setError(error.message);
      return;
    }
    setIsOpen(false);
    navigate("/projects");
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  const onEdit = () => {
    navigate(`/projects/${id}/edit`);
  };

  useEffect(() => {
    // get the project
    const getData = async (id) => {
      try {
        setLoading(true);
        const { data, error } = await getProjectById(id);
        const { data: tasks, error: taskError } = await getTasks(id);
        const { data: membersData, error: membersError } = await getMembers();
        
        if (error) {
          setError(error.message);
          return;
        }
        if (taskError) {
          setError(taskError.message);
          return;
        }

        if(membersError){
          setError(membersError.message);
          return;
        }

        setProjectData(data);
        setTasks(tasks);
        setMembers(membersData || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData(id);
  }, [id]);

  const handleStatusChange = async (taskId, newStatus) => {
    const { error } = await updateTask(taskId, { status: newStatus });
    if (error) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  const priorityConfig = {
    high: { color: "bg-red-100 text-red-600", label: "High" },
    medium: { color: "bg-yellow-100 text-yellow-600", label: "Medium" },
    low: { color: "bg-green-100 text-green-600", label: "Low" },
  };

  const statusConfig = {
    pending: { color: "bg-orange-100 text-orange-600", label: "Pending" },
    inProgress: { color: "bg-blue-100 text-blue-600", label: "In Progress" },
    done: { color: "bg-green-100 text-green-600", label: "Done" },
  };

  const filteredTasks = tasks.filter((task) => {
   return (currentFilter === 'all' || task.assigned_to === user.id) &&
    (statusFilter === 'all' || task.status === statusFilter) &&
    (priorityFilter === 'all' || task.priority === priorityFilter)
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks/totalTasks) * 100);
  return (
    <Container>
      <div onClick={()=>setOpenDropdown(null)} className="relative">
        {isOpen && (
          <ConfirmModal
            onCancel={onCancel}
            onConfirm={onConfirm}
            setIsOpen={setIsOpen}
          />
        )}
        <div className="flex justify-between items-center">
          <button
            onClick={() => navigate("/projects")}
            className="flex gap-0.5 items-center font-medium bg-slate-200 rounded-md px-2 py-2 cursor-pointer hover:opacity-80 transition-all duration-200"
          >
            <IoIosArrowRoundBack />
          </button>

          {role === "admin" && (
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={onEdit}
                className="border border-slate-300 rounded-md px-3 py-2 cursor-pointer"
              >
                <CiEdit />
              </button>
              <button
                onClick={() => setIsOpen(true)}
                className="border bg-red-200 text-red-500 rounded-md px-3 py-2 cursor-pointer"
              >
                <MdOutlineDelete />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6">
            <h1 className="text-3xl text-primary font-semibold mb-0.5 ">
              {capitalize(projectData?.name)}
            </h1>

            <p className="text-slate-700 mb-1">{capitalize(projectData?.description)}</p>

            <div className="mt-2">

            <div className="flex items-center gap-1 text-xs"><span><LuCalendar1 /></span>Created on: <span>{formatDate(projectData?.created_at)}</span></div>

            <div className="flex items-center gap-1 text-xs"><span><LuCalendarClock /></span> Due Date: <span>{formatDate(projectData?.due_date)}</span></div>
            </div>
            {/* progress bar */}
            <div className="mt-4 border border-border bg-card p-4 rounded-xl flex items-center justify-center gap-4">
  <div
    className="relative size-10 rounded-full flex items-center justify-center transition-all duration-200"
    style={{
      background: `conic-gradient(
        var(--color-primary) ${progress * 3.6}deg,
        #e2e8f0 ${progress * 3.6}deg
      )`,
    }}
  >
    <div className="size-7 bg-white rounded-full flex items-center justify-center">
      <span className="font-bold text-xs text-primary">
        {progress}%
      </span>
    </div>
  </div>

  <div>
    <p className="font-semibold text-primary">Project Progress</p>
    <p className="text-sm text-slate-500">
      {completedTasks} of {totalTasks} tasks completed
    </p>
  </div>
</div>
          </div>
        )}

        {/* tasks */}
        <div className="border border-border bg-card rounded-md p-2 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-center text-primary font-medium text-2xl">
              Tasks
            </h3>

        <div className="flex items-center gap-2">

            

            {/* filters */}
            <TaskFilters
            role={role}
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            />

            {role === "admin" && (
              <button
              onClick={() => navigate(`/projects/${id}/create-task`)}
              className="bg-primary rounded-md p-1 text-white text-lg font-bold cursor-pointer"
              >
               <IoIosAdd/>
              </button>
            )}
            </div>
  </div>
            
          

          {!loading && filteredTasks.length === 0 && (
            <p className="text-center text-slate-700 mt-4">
              Nothing here yet
              <br />
              Add a task to get this project moving.
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {filteredTasks.map((task) => (
              <TaskCard
              key={task.id}
              task={task}
              user={user}
              role={role}
              handleStatusChange={handleStatusChange}
              priorityConfig={priorityConfig}
              statusConfig={statusConfig}
              navigate={navigate}
              onTaskDelete={setTasks}
              members={members}
              />
            ))}
          </div>
        </div>

        {/* error */}
        {error && <p>{error}</p>}
      </div>
    </Container>
  );
};

export default ProjectDetail;

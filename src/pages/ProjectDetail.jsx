import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject, getProjectById } from "../services/ProjectService";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/AuthContext";
import { getTasks, updateTask } from "../services/taskService";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiEdit, CiFilter } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { supabase } from "../lib/supabase";
import Container from "../components/Container";
import { BiSort } from "react-icons/bi";
import TaskCard from "../components/TaskCard";

const ProjectDetail = () => {
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
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
        if (error) {
          setError(error.message);
          return;
        }
        if (taskError) {
          setError(taskError.message);
          return;
        }

        setProjectData(data);
        setTasks(tasks);
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
  console.log("project data", projectData);
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
            className="flex gap-0.5 items-center font-medium bg-slate-200 rounded-md px-2 py-1 cursor-pointer hover:opacity-80 transition-all duration-200"
          >
            <IoIosArrowRoundBack /> Projects
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
            <h1 className="text-3xl font-semibold mb-0.5 text-slate-900">
              {projectData?.name}
            </h1>

            <p className="text-slate-800">{projectData?.description}</p>

            {/* progress bar */}
            <div></div>
          </div>
        )}

        {/* tasks */}
        <div className="border border-slate-300 rounded-md p-2 mt-4">
          <div className="flex justify-between items-center">
            <h3 className="text-center text-slate-900 font-medium text-2xl">
              Tasks
            </h3>

            {role === "admin" && (
              <button
                onClick={() => navigate(`/projects/${id}/create-task`)}
                className="bg-primary text-sm rounded-md px-2 py-1 text-white font-medium cursor-pointer"
              >
                Add Task
              </button>
            )}

            {/* filters */}
            <div>
              {/* all tasks  */}
              {/* my tasks */}
              {
                role === 'member' && (
                    <select value={currentFilter} onChange={(e)=>setCurrentFilter(e.target.value)} className="">
                <option value="all">All tasks</option>
                <option value="mine">My tasks</option>
              </select>
                )
              }
              
            </div>
            {/* status */}
            <div className="relative">

              {/* trigger button */}
              <button onClick={(e)=>{setOpenDropdown(openDropdown === 'status' ? null : 'status'); e.stopPropagation()}}><CiFilter/></button>

              {/* dropdown menu */}
              {openDropdown === 'status' && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-36">
                  {['all', 'pending', 'inProgress', 'done'].map(option => (
                    <button key={option} onClick={() => {
                      setStatusFilter(option);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50
                        ${statusFilter === option ? 'text-primary font-medium' : 'text-slate-600'}`}>
                      {option === 'all' ? 'All Status' : option}
                    </button>
                  ))}
                </div>
              )}
            </div>
              {/* sort by priority */}
              <div className="relative">

              {/* trigger button */}
              <button onClick={(e)=>{setOpenDropdown(openDropdown === 'priority' ? null : 'priority'); e.stopPropagation()}}><BiSort/></button>

              {/* dropdown menu */}
              {openDropdown === 'priority' && (
                <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-36">
                  {['all', 'low', 'medium', 'high'].map(option => (
                    <button key={option} onClick={() => {
                      setPriorityFilter(option);
                      setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50
                        ${priorityFilter === option ? 'text-primary font-medium' : 'text-slate-600'}`}>
                      {option === 'all' ? 'All' : option}
                    </button>
                  ))}
                </div>
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
              task={task}
              user={user}
              role={role}
              handleStatusChange={handleStatusChange}
              priorityConfig={priorityConfig}
              statusConfig={statusConfig}
              navigate={navigate}
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

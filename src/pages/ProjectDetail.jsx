import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject, getProjectById } from "../services/ProjectService";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/AuthContext";
import { getTasks, updateTask } from "../services/taskService";
import { IoIosArrowRoundBack } from "react-icons/io";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

const ProjectDetail = () => {
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const onConfirm = async () => {
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

  console.log("project data", projectData);
  return (
    <div className="relative px-2 py-4">
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
            <CiEdit/>
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="border bg-red-200 text-red-500 rounded-md px-3 py-2 cursor-pointer"
          >
            <MdOutlineDelete/>
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

          {/* filters */}
          <div className="flex gap-2 justify-between">
            <button className="border border-slate-400 bg-slate-200 text-sm px-2 py-0.5 rounded-md">All</button>
            <button className="border border-slate-400 bg-slate-200 text-sm px-2 py-0.5 rounded-md">Pending</button>
            <button className="border border-slate-400 bg-slate-200 text-sm px-2 py-0.5 rounded-md">In Progress</button>
            <button className="border border-slate-400 bg-slate-200 text-sm px-2 py-0.5 rounded-md">Completed</button>
          </div>
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
        </div>

      {!loading && tasks.length === 0 && <p className="text-center text-slate-700 mt-4">Nothing here yet
<br />
Add a task to get this project moving.</p>}
        <div className="mt-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="relative border border-slate-300 p-2 rounded-lg"
            >
              <div className="leading-tight">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                {/* <p className="text-slate-800">{task.description}</p> */}
              </div>

              <div className="mt-2 flex items-center gap-1">
                <span
                  className={`border rounded-full px-2 py-0.5 text-xs ${priorityConfig[task.priority]?.color}`}
                >
                  {priorityConfig[task.priority]?.label}
                </span>

                {task.assigned_to === user.id ? (
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="inProgress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                ) : (
                  <span
                    className={`border rounded-full px-2 py-0.5 text-xs ${statusConfig[task.status]?.color}`}
                  >
                    {statusConfig[task.status]?.label}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center mt-2">
                <p>Due date</p>
                <p>assigned members</p>
              </div>

              <div className="absolute top-2 right-3">Edit</div>
            </div>
          ))}
        </div>
      </div>

      {/* error */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ProjectDetail;

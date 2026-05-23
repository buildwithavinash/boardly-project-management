import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteProject, getProjectById } from "../services/ProjectService";
import ConfirmModal from "../components/ConfirmModal";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../services/taskService";

const ProjectDetail = () => {
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { role } = useAuth();
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
    navigate(`/projects/${id}/edit`)
  }

  useEffect(() => {
    const getData = async (id) => {
      try {
        setLoading(true);
        const { data, error } = await getProjectById(id);
        const {data: tasks, error: taskError} = await getTasks(id)
        if (error) {
          setError(error.message);
          return;
        }
        if(taskError){
          setError(taskError.message);
          return;
        }

        setProjectData(data);
        setTasks(tasks)
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData(id);
  }, [id]);


  console.log("project data", projectData);
  return (
    <div className="relative">
      {isOpen && (
        <ConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          setIsOpen={setIsOpen}
        />
      )}
      <div>Project Details</div>

      {role === "admin" && (
        <div className="flex gap-4">
          <button onClick={onEdit} className="border border-slate-300 rounded-md px-4 py-2 cursor-pointer">
            Edit
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="border bg-red-200 text-red-500 rounded-md px-4 py-2 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}

      {role === "admin" && (
        <button onClick={() => navigate(`/projects/${id}/create-task`)}>Add Task</button>
      )}
      {loading && <p>Loading...</p>}

      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>{projectData?.name}</h1>
          <p>{projectData?.description}</p>
          <div>
            {tasks.map(task => (
              <div key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <span>{task.status}</span>
              <span>{task.priority}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;

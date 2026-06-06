import { useNavigate, useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import { getTaskById, updateTask } from "../../services/taskService";
import { getMembers } from "../../services/profileService";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useToast } from "../../context/ToastContext";
const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    due_date: "",
    assigned_to: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data, error } = await getTaskById(id);
        const { data: memberData, error: memberError } = await getMembers();
        if (error) {
          setError(error.message);
          return;
        }
        if (memberError) {
          setError(memberError.message);
          return;
        }
        if (!data) {
          setError("Task not found.");
          return;
        }
        setTaskToEdit(data);
        setMembers(memberData || []);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "pending",
          priority: data.priority || "low",
          due_date: data.due_date || "",
          assigned_to: data.assigned_to || "",
        });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim()) {
      setError("Task title is required.");
      addToast("Task title is requierd.", "error");
      return;
    }

    try {
      setLoading(true);

      const updatedTask = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        priority: formData.priority,
        due_date: formData.due_date || null,
        assigned_to: formData.assigned_to || null,
      };
      const { error } = await updateTask(id, updatedTask);
      if (error) {
        setError(error.message);
        addToast("Failed to update task.", "error");
        return;
      }
      addToast("Task updated successfully!", "success");
      navigate(`/projects/${taskToEdit.project_id}`);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }

    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      due_date: "",
      assigned_to: "",
    });
  };

  return (
    <Container>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="flex gap-0.5 items-center font-medium bg-slate-200 rounded-md px-2 py-2 cursor-pointer hover:opacity-80 transition-all duration-200"
        >
          <IoIosArrowRoundBack />
        </button>
      </div>
      <div>
        <h2 className="mt-4 text-3xl text-center font-medium text-primary">
          Edit Task
        </h2>

        <div>
          <form
            onSubmit={handleSubmit}
            className="border border-border bg-card p-4 rounded-md flex flex-col gap-2 mt-4 justify-center"
          >
            <input
              type="text"
              name="title"
              value={formData.title}
              required
              onChange={handleChange}
              placeholder="Task name"
              className="border border-slate-300 bg-background focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="border border-slate-300 bg-background focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"
            />

            <div className="flex items-center gap-2">
              <label htmlFor="status" className="font-semibold text-slate-800">
                Status:{" "}
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-slate-300 focus:border-border bg-background focus:outline-none transition-all duration-200 px-4 py-2 rounded-md flex-1"
              >
                <option value="pending">Pending</option>
                <option value="inProgress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="priority"
                className="font-semibold text-slate-800"
              >
                Priority:{" "}
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="border border-slate-300 focus:border-border bg-background focus:outline-none transition-all duration-200 px-4 py-2 rounded-md flex-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="due_date"
                className="font-semibold text-slate-800"
              >
                Due Date:{" "}
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="flex-1 bg-background flex items-center justify-center border px-4 py-2 border-border rounded-md"
              />
            </div>

            <div className="flex items-center gap-2">
              <label
                htmlFor="assigned_to"
                className="font-semibold text-slate-800"
              >
                Select member:{" "}
              </label>
              <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-1 bg-background py-2 rounded-md flex-1"
              >
                <option value="">Select member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            {error && <p>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white font-medium px-4 py-2 mt-2 rounded-md cursor-pointer hover:opacity-80 transition-all duration-200"
            >
              {loading ? <p>Updating...</p> : <p>Update Task</p>}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditTask;

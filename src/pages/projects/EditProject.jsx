import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProject } from "../../services/projectService";
import Container from "../../components/Container";
import { useToast } from "../../context/ToastContext";
import { IoIosArrowRoundBack } from "react-icons/io";

const EditProject = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    due_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const { data, error } = await getProjectById(id);

        if (error) {
          setError(error.message);
          return;
        }

        if (!data) {
          setError("Project not found.");
          return;
        }

        setFormData({
          name: data.name || "",
          description: data.description || "",
          due_date: data.due_date || "",
        });
      } catch (error) {
        setError(error.message || "Failed to load project.");
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

    if (!formData.name.trim()) {
      setError("Project name is required.");
      addToast("Project name is required.", "error");
      return;
    }

    try {
      setLoading(true);

      const updatedProject = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        due_date: formData.due_date || null,
      };

      const { error } = await updateProject(id, updatedProject);

      if (error) {
        setError(error.message);
        addToast("Failed to update project. Please try again.", "error");
        return;
      }

      addToast("Project updated successfully!", "success");
      navigate(`/projects/${id}`);
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container>
        <p>Loading project...</p>
      </Container>
    );
  }

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

      <h2 className="mt-4 text-3xl text-center font-medium text-primary">
        Edit Project
      </h2>

      <form
        onSubmit={handleSubmit}
        className="border border-border bg-card p-4 rounded-md flex flex-col gap-2 mt-8 justify-center"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project Name"
          required
          className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md bg-background"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md bg-background"
        />

        <div className="flex gap-2 items-center">
          <label htmlFor="due_date" className="text-slate-800 font-semibold">
            Due Date:
          </label>

          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            className="border border-slate-300 bg-background focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"
          />
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white font-medium px-4 py-2 rounded-md cursor-pointer hover:opacity-80 transition-all duration-200 mt-2"
        >
          {loading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </Container>
  );
};

export default EditProject;
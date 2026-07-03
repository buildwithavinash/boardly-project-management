import { useState } from "react";
import { useAuth } from "../../context/useAuth";
import { createProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useProjects } from "../../context/useProjects";
import Container from "../../components/Container";
import { useToast } from "../../context/useToast";

const CreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    due_date: "",
  });

  const { user } = useAuth();
  const { setProjects } = useProjects();
  const { addToast } = useToast();
  const navigate = useNavigate();

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
      const projectData = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        due_date: formData.due_date || null,
        created_by: user.id,
      };

      const { data, error } = await createProject(projectData);

      if (error) {
        setError(error.message);
        addToast("Failed to create project", "error");
        return;
      }

      setProjects((prev) => [...prev, data]); //for context update
      addToast("Project created!", "success");
      navigate("/projects");
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
   <div className="flex justify-between items-center pt-3 px-2 pb-2 bg-background sticky top-0 z-30 border-b border-slate-100/20 w-full shadow-xs"  >
          <button
            onClick={() => navigate("/projects")}
            className="flex gap-0.5 items-center font-medium bg-slate-200 rounded-md px-2 py-2 cursor-pointer hover:opacity-80 transition-all duration-200"
          >
            <IoIosArrowRoundBack />
          </button>
        </div>
    <Container classname="flex-1 flex items-center justify-center">
      <div className="flex justify-center items-center">
        

        <div className="w-full max-w-md">
          <div className=''>
          <h2 className="text-2xl lg:text-3xl text-center font-medium text-primary">
            Create New Project
          </h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border border-slate-200 bg-card p-4 lg:p-6 rounded-md flex flex-col gap-4 mt-4 justify-center"
          >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Project Name"
            className="border border-slate-200 focus:border-slate-200 focus:outline-none transition-all duration-200 px-4 py-2 lg:py-3 rounded-md bg-background"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Project Description"
            className="border border-slate-200 focus:border-slate-200 focus:outline-none transition-all duration-200 px-4 py-2 lg:py-3 rounded-md bg-background"
          />

          <div className="flex gap-2 items-center">
            <label htmlFor="due_date" className="text-slate-800 font-semibold">
              Due Date:{" "}
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="border border-slate-200 bg-background focus:border-slate-200 focus:outline-none transition-all duration-200 px-4 py-2 lg:py-3 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white font-medium px-4 py-2 rounded-md cursor-pointer hover:opacity-80 transition-all duration-200 mt-2"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>

          {error && <p className="mt-4">{error}</p>}
        </form>
        </div>
        
        
      </div>
    </Container>
     </div>
  );
};

export default CreateProject;

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createProject } from "../services/ProjectService";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    try {
      setLoading(true);
      const projectData = {
        ...formData,
        created_by: user.id,
      };

      const { error } = await createProject(projectData);

      if (error) {
        setError(error.message);
        return;
      }

      navigate("/projects");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div>
        <button onClick={() => navigate("/projects")}>All projects</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="border border-slate-300 px-4 py-2 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="border border-slate-300 px-4 py-2 rounded-md"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded-md self-center cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProject;

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import {  IoIosArrowRoundBack } from "react-icons/io";
import { useProjects } from "../../context/ProjectsContext";
import Container from "../../components/Container";

const CreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    due_date: ''
  });

  const { user } = useAuth();
  const {setProjects} = useProjects();
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

      const { data,error } = await createProject(projectData);

      if (error) {
        setError(error.message);
        return;
      }

      setProjects(prev => [...prev, data]) //for context update
      navigate("/projects");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>

  
    <div className="">
      <div>
        <button onClick={() => navigate("/projects")} className="flex gap-0.5 items-center font-medium bg-slate-200 rounded-md px-2 py-1 cursor-pointer hover:opacity-80 transition-all duration-200"><IoIosArrowRoundBack/> Projects</button>
      </div>
     
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4 justify-center">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Project Name"
          className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Project Description"
          className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"
        />

        <div className="flex gap-2 items-center">
        <label htmlFor="due_date">Due Date: </label>
        <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"/>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white font-medium px-4 py-2 rounded-md self-center cursor-pointer hover:opacity-80 transition-all duration-200"
        >
         {loading ? 'Creating...' : 'Create'}
        </button>

         {error && <p className="mt-4">{error}</p>}
      </form>
    </div>
      </Container>
  );
};

export default CreateProject;

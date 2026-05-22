import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getProjects } from "../services/ProjectService";
import { Link, useNavigate } from "react-router-dom";

const Projects = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error } = await getProjects();
        if (error) {
          setError(error.message);
          return;
        }
        setProjects(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  return (
    <div>
      <div>{role === "admin" && <button onClick={()=> navigate('/create')}>Create</button>}</div>
      {error && <p>{error.message}</p>}
      {loading && <p>Loading...</p>}
      {projects.length === 0 ? (
        <p>Empty, create a new project</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-8">{projects.map((proj) => (
          <Link key={proj.id} to={`/projects/${proj.id}`}>
            <div className="border border-slate-300 rounded-md p-2">
                <h1>{proj.name}</h1>
            </div>
            </Link>
        ))}</div>
      )}
    </div>
  );
};

export default Projects;

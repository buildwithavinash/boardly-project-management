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
    <div className="max-w-4xl mx-auto px-2 py-12 pb-20 md:pb-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          <h1>Projects</h1>
          <p>{projects.length} projects total</p>
        </div>

        {role === 'admin' && (
          <button onClick={()=>navigate('/create')} className="bg-primary text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200">
            + New
          </button>
        )}
      </div>

      {/* states */}
      {loading && <p>Loading...</p>}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* empty state */} 
      {!loading && projects.length === 0 && (
        <div>
          <h3>No projects yet.</h3>
          <p>Create your first project to get started</p>
          {role === 'admin' && (
             <button onClick={()=>navigate('/create')} className="bg-primary text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200">
            Create Project
          </button>
          )}
        </div>
      )}

      {/* projects list */}

      <div className="flex flex-col gap-3">
            {projects.map(proj => (
                <Link key={proj.id} to={`/projects/${proj.id}`}>
                    <div className=" border border-slate-300 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2.5 rounded-xl">
                                
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900">{proj.name}</h3>
                                <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">{proj.description}</p>
                            </div>
                            <span className="text-slate-300 text-xl">→</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>

    </div>
  );
};

export default Projects;

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProjects } from "../../services/projectService";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";

const Projects = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearhQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');

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

  const filteredProjects = projects.filter(proj => {
    return proj.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  }).sort((a, b) => {
    if(currentFilter === 'atoz'){
      return a.name.localeCompare(b.name);
    }
    if(currentFilter === 'ztoa'){
      return b.name.localeCompare(a.name);
    }
    if(currentFilter === 'date_created'){
      return new Date(b.created_at) - new Date(a.created_at)
    }

    return 0
  })
  return (
    <Container>
    <div className="">
      {/* header */}
      <div className="flex justify-between items-center">
        <div>
          {/* <h1>Projects</h1> */}
          <h3 className="text-2xl font-medium">Your Projects <span className="text-sm"> ({projects.length}) </span></h3>
        </div>

        {role === 'admin' && (
          <button onClick={()=>navigate('/create')} className="bg-primary text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200">
            + New
          </button>
        )}
      </div>

      {/* search and filters */}
      <div className="flex gap-1 mt-2">
        <input type="search" name="" value={searchQuery} onChange={(e)=>setSearhQuery(e.target.value)} placeholder="Search by name" className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-1 rounded-md flex-1 min-w-0"/>

        <select name="" value={currentFilter} onChange={(e)=>setCurrentFilter(e.target.value)} className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-2 py-1 rounded-md shrink-0">
          <option value="all">All</option>
          <option value="atoz">A-Z</option>
          <option value="ztoa">Z-A</option>
          <option value="date_created">Date created</option>
        </select>
      </div>

      {/* states */}
      {loading && <p>Loading...</p>}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* empty state */} 
      {!loading && filteredProjects.length === 0 && (
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

      <div className="flex flex-col gap-3 mt-4">
            {filteredProjects.map(proj => (
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
    </Container>
  );
};

export default Projects;

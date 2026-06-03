import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProjects } from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import ProjectFilters from "./ProjectFilters";
import ProjectsSkeleton from "../../components/loaders/ProjectsSkeleton";
import ProjectCard from "./ProjectCard";

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
          <h3 className="text-2xl font-semibold text-primary">Your Projects <span className="text-sm"> ({projects.length}) </span></h3>
        </div>

        {role === 'admin' && (
          <button onClick={()=>navigate('/create')} className="bg-primary text-white px-3 py-2 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200">
            + New
          </button>
        )}
      </div>

      {/* search and filter */}
      <ProjectFilters currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} searchQuery={searchQuery} setSearhQuery={setSearhQuery}/>

       {/* states */}
      {loading && <ProjectsSkeleton/>}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      {/* empty state */} 
      {!loading && filteredProjects.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center py-34">
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
                <ProjectCard key={proj.id} proj={proj}/>
            ))}
        </div>

    </div>
    </Container>
  );
};

export default Projects;

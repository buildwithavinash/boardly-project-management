import { createContext } from "react";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { useAuth } from "./useAuth";

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      
      return;
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await getProjects();
        if (error) {
          setError(error.message);
          return;
        }
        setProjects(data || []);
      } catch (err) {
        setError(err.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user]);


  const value = {
  projects: user ? projects : [],
  setProjects,
  loading,
  error: user ? error : null,
};
  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};


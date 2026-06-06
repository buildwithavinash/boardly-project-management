import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { getProjects } from "../services/projectService";
import { useAuth } from "./AuthContext";

export const ProjectsContext = createContext(null);

export const ProjectsProvider = ({children}) => {
    const [projects, setProjects] = useState([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(null);
      const {user} = useAuth();
    
      useEffect(() => {

          if(!user){
            setProjects([]);
            setError(null);
            setLoading(false);
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
            setError(err.message || 'Failed to load projects.');
          } finally {
            setLoading(false);
          }
        };
    
        fetchProjects();
      }, [user]);

      return (
        <ProjectsContext.Provider value={{projects, setProjects, loading, error}}>
            {children}
        </ProjectsContext.Provider>
      )
}

export const useProjects = () => useContext(ProjectsContext);
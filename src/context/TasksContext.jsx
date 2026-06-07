import { createContext, useContext, useEffect, useState } from "react";
import { getAllTasks } from "../services/taskService";
import { useAuth } from "./AuthContext";

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setError(null);
      setLoading(false);
      return;
    }

    const getData = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error } = await getAllTasks();
        if (error) {
          setError(error.message);
          return;
        }

        setTasks(data || []);
      } catch (error) {
        setError(error.message || "Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [user]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, error, loading }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);

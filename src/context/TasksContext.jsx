import { createContext, useEffect, useState } from "react";
import { getAllTasks } from "../services/taskService";
import { useAuth } from "./useAuth";

export const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) {
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

  const value = {
  tasks: user ? tasks : [],
  setTasks,
  error: user ? error : null,
  loading,
};
  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

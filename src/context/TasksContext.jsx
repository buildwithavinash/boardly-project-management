import { createContext, useContext, useEffect, useState } from "react";
import { getAllTasks } from "../services/taskService";
import { useAuth } from "./AuthContext";

export const TasksContext = createContext(null);

export const TasksProvider = ({children}) => {

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const {user} = useAuth();
    useEffect(()=> {
        if(!user) return;
        const getData = async () => {
            try{
                setLoading(true);
                const {data, error} = await getAllTasks();
                if(error){
                    setError(error.message);
                    return
                }

                setTasks(data);
            }catch(error){
                setError(error)
            }finally{
                setLoading(false);
            }
        }

        getData();
    }, [user])

    console.log("tasks: ",tasks);
    return (
        <TasksContext.Provider value={{tasks, error, loading}}>
            {children}
        </TasksContext.Provider>
    )
}

export const useTasks = () => useContext(TasksContext)
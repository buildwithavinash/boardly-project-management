import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { getProjects } from "../services/projectService";
import { getTasksByUser, toggleTaskStatus } from "../services/taskService";

const Dashboard = () => {
  const {user, role} = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=> {
    const getProjectsData = async () => {
      setLoading(true);
      try{
        const {data, error} = await getProjects();
        if(error) {
          setError(error.message);
          return;
        }
        setProjects(data);
      }catch(error){
        setError(error);
      }finally{
        setLoading(false)
      }
    }

    const getTasksData = async () => {
      setLoading(true);
      try{
        const {data, error} = await getTasksByUser(user.id);
        if(error) {
          setError(error.message);
          return;
        }
        setTasks(data);
      }catch(error){
        setError(error);
      }finally{
        setLoading(false)
      }
    }

    getProjectsData()
    getTasksData()
  }, [user])

  const handleStatusChange = async (id, status) => {
    const {error} = await toggleTaskStatus(id, status);
    if(error){
      setError(error.message)
      return;
    }

    setTasks(prev => prev.map(task => task.id === id ? {...task, status: status} : task))
  }

  return (
    <div className="bg-background min-h-screen w-full py-12">

{loading && (<p>Loading...</p>)}
{error && (<p>{error}</p>)}

{/* stats */}
{/* admin */}
    

{/* admin */}
    {
      role === 'admin' && (
        <div className="grid grid-cols-1 gap-4 p-1">
          {projects?.map(proj => (
            <div key={proj.id} className="border border-slate-300 rounded-md p-1">
              {proj.name}
            </div>
          ))}
        </div>
      )
    }

{/* member */}
    {
      role === 'member' && (
        <div className="grid grid-cols-1 gap-4 p-1">
          {tasks?.map(task => (
            <div key={task.id} className="border border-slate-300 rounded-md px-2 py-1 relative shadow-md">
              <h3 className="text-xl font-semibold text-primary">
              {task.title}
              </h3>
              <select name="status" value={task.status} onChange={(e)=>{handleStatusChange(task.id, e.target.value)}} className="border rounded-full px-4 py-1 text-xs border-slate-300 absolute right-2 top-2">
                <option value="pending">pending</option>
                <option value="inProgress">in progress</option>
                <option value="done">done</option>
              </select>
              <p className="text-slate-600">
                {task.description}
              </p>
            </div>
          ))}
        </div>
      )
    }
      
    </div>
  )
}

export default Dashboard
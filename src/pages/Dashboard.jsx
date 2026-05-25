import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { getProjects } from "../services/projectService";
import { getTasksByUser, toggleTaskStatus } from "../services/taskService";

const Dashboard = () => {
  const {user, logout, role} = useAuth();
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
    <div>
      Dashboard: {user?.email}
      Role: {role}
      <button onClick={logout} className="border p-2">Logout</button>

{loading && (<p>Loading...</p>)}
{error && (<p>{error}</p>)}
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
            <div key={task.id} className="border border-slate-300 rounded-md p-1">
              <h3>
              {task.title}
              </h3>
              <select name="status" value={task.status} onChange={(e)=>{handleStatusChange(task.id, e.target.value)}}>
                <option value="pending">pending</option>
                <option value="inProgress">in progress</option>
                <option value="done">done</option>
              </select>
              <p>
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
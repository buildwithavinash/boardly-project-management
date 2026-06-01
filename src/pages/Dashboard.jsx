import { useEffect, useState } from "react";
import { getProjects } from "../services/ProjectService";
import { getAllTasks } from "../services/taskService";
import { FaTasks } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoCheckmarkDoneCircleOutline, IoFolderOpen } from "react-icons/io5";
import { MdChevronRight, MdPendingActions } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Container from "../components/Container";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <GoProjectRoadmap/>,
    },
    {
      label: "Total Tasks",
      value: tasks.length,
      bg: "bg-violet-200",
      text: "text-violet-600",
      icon: <FaTasks/>,
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "done").length,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      icon: <IoCheckmarkDoneCircleOutline/>,
    },
    {
      label: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
      bg: "bg-amber-100",
      text: "text-amber-600",
      icon: <MdPendingActions/>,
    },
  ];

  const priorityConfig = {
    high: { color: 'bg-red-100 text-red-600', label: 'High' },
    medium: { color: 'bg-yellow-100 text-yellow-600', label: 'Medium' },
    low: { color: 'bg-green-100 text-green-600', label: 'Low' },
}

const statusConfig = {
    pending: { color: 'bg-orange-100 text-orange-600', label: 'Pending' },
    inProgress: { color: 'bg-blue-100 text-blue-600', label: 'In Progress' },
    done: { color: 'bg-green-100 text-green-600', label: 'Done' },
}

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data: projectData, error: projectError } = await getProjects();
        if (projectError) {
          setError(projectError.message);
          return;
        }
        setProjects(projectData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const { data: tasksData, error: tasksError } = await getAllTasks();
        if (tasksError) {
          setError(tasksError.message);
          return;
        }
        setTasks(tasksData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    fetchTasks();
  }, []);
  return (
    <Container>

    
    <div className="">
      {/* <div className="text-center font-semibold text-primary text-2xl">Dashboard</div> */}

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 gap-1 mt-2">
        {stats.map(stat => (
          <div key={stat.label} className={`${stat.bg} ${stat.text} rounded-2xl p-2 text-center`}>
            {/* <span className="text-2xl">{stat.icon}</span> */}
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm font-medium mt-1 opacity-80">{stat.label}</p>
        </div>
        ))}
        
      </div>

      {/* recent projects */}
      <div className="border border-slate-300 px-2 py-3 rounded-lg mt-4">
        <div className="flex justify-between">
        <h2>Recent Projects</h2>
        <Link to='/projects' className="flex justify-between items-center px-2 py-0.5 text-xs rounded-lg gap-2 border border-slate-300">See all <IoIosArrowRoundForward/></Link>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          {projects.slice(0, 3).map(proj => (
            <Link to={`/projects/${proj.id}`} key={proj.id} className="border p-1 border-slate-300 rounded-md">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <IoFolderOpen className="mt-1"/>

                <div className="leading-tight">
                <h3>{proj.name}</h3>
                <p>{proj.description}</p>
              </div>
              </div>

              <MdChevronRight className="self-center"/>
            </div>
            </Link>
          ))}
        </div>
      </div>

      {/* recent tasks */}
      <div className="border border-slate-300 px-2 py-3 rounded-lg mt-4">
          <h3>
            Recent Tasks
          </h3>
     

        <div className="flex flex-col gap-2 mt-4">
          {tasks.slice(0, 6).map(task => (
            <div key={task.id} className="border p-1 border-slate-300 rounded-md">
              <h3>{task.title}</h3>
              <div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityConfig[task.priority]?.color}`}>{priorityConfig[task.priority]?.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[task.status]?.color}`}>{statusConfig[task.status]?.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Container>
  );
};

export default Dashboard;

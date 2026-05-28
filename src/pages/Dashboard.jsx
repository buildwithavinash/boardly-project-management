import { useEffect, useState } from "react";
import { getProjects } from "../services/ProjectService";
import { getAllTasks } from "../services/taskService";
import { FaTasks } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";

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
    <div className="py-12">
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
    </div>
  );
};

export default Dashboard;

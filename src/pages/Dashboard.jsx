import { FaTasks } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdChevronRight, MdPendingActions } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Container from "../components/Container";
import { useAuth } from "../context/useAuth";
import { capitalize, isOverdue } from "../utils/formatters";
import RecentCardSkeleton from "../components/loaders/RecentCardSkeleton";
import { useProjects } from "../context/useProjects";
import { useTasks } from "../context/useTasks";
import Loader from '../components/loaders/Loader'

const Dashboard = () => {
  const {
    projects,
    loading: projectsLoading,
    error: projectsError,
  } = useProjects();
  const { tasks, loading: tasksLoading, error: tasksError } = useTasks();
  const loading = projectsLoading || tasksLoading;
  const error = projectsError || tasksError;
  const { userInfo, role } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      bg: "bg-blue-100",
      text: "text-blue-600",
      icon: <GoProjectRoadmap />,
    },
    {
      label: "Total Tasks",
      value: tasks.length,
      bg: "bg-violet-200",
      text: "text-violet-600",
      icon: <FaTasks />,
    },
    {
      label: "Completed",
      value: tasks.filter((t) => t.status === "done").length,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      icon: <IoCheckmarkDoneCircleOutline />,
    },
    {
      label: "Pending",
      value: tasks.filter((t) => t.status === "pending").length,
      bg: "bg-amber-100",
      text: "text-amber-600",
      icon: <MdPendingActions />,
    },
  ];

  const priorityConfig = {
    high: { color: "bg-red-100 text-red-600", label: "High" },
    medium: { color: "bg-yellow-100 text-yellow-600", label: "Medium" },
    low: { color: "bg-green-100 text-green-600", label: "Low" },
  };

  const statusConfig = {
    pending: { color: "bg-orange-100 text-orange-600", label: "Pending" },
    inProgress: { color: "bg-blue-100 text-blue-600", label: "In Progress" },
    done: { color: "bg-green-100 text-green-600", label: "Done" },
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

   const getStatusMessage = () => {
    const pending = tasks.filter((t) => t.status !== "done").length;
    const overdueCount = tasks.filter(
      (t) => t.status !== "done" && isOverdue(t.due_date)
    ).length;

    if (overdueCount > 0)
      return `You have ${overdueCount} overdue task${overdueCount > 1 ? "s" : ""}.`;
    if (pending === 0) return "All caught up. Nice work.";
    return `${pending} task${pending > 1 ? "s" : ""} left to wrap up.`;
  };

  if(loading){
    return (
      <div className="flex justify-center items-center min-h-screen">
      <Loader/>
      </div>
    )
  }
  return (
    <Container classname="py-3 pb-20">
      <div className="">
        <div className="text-center font-semibold text-slate-900">
          <div className="flex text-center justify-center items-baseline gap-0.5">
          <p className="text-slate-800 text-lg lg:text-xl">{getGreeting()},</p> 
          <h2 className="text-xl lg:text-3xl font-semibold text-primary">{capitalize(userInfo?.name)}</h2>
          </div>
          {!loading && (
            <p className="text-slate-800 text-sm lg:text-xl">{getStatusMessage()}</p>
          )}
        
        </div>

        <div>{error && <p>{error}</p>}</div>

        {/* stats */}
        <div className="grid  grid-cols-2 lg:grid-cols-4 gap-1 mt-2 lg:mt-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`${stat.bg} ${stat.text} rounded-2xl p-2 text-center`}
            >
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
              <p className="text-sm font-medium mt-1 opacity-80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* recent projects */}
        <div className="bg-card border border-border px-2 py-3 rounded-lg mt-4">
          <div className="flex justify-between">
            <h2 className="text-primary font-semibold">Recent Projects</h2>
            <Link
              to="/projects"
              className="flex bg-background justify-between items-center px-2 py-0.5 text-xs rounded-lg gap-2 border border-border hover:bg-slate-50 transition-all duration-150"
            >
              See all <IoIosArrowRoundForward />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4 ">
            {!loading && projects.length === 0 && (
              <div>
                <h3 className="text-slate-800 font-semibold">No projects yet.</h3>
                <p>Create your first project to get started</p>
                {role === "admin" && (
                  <button
                    onClick={() => navigate("/create")}
                    className="bg-primary text-white px-4 py-2 rounded-xl font-medium text-sm flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-200"
                  >
                    Create Project
                  </button>
                )}
              </div>
            )}

            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <RecentCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              projects.slice(0, 3).map((proj) => (
                <Link
                  to={`/projects/${proj.id}`}
                  key={proj.id}
                  className="bg-background border p-1 border-slate-300 rounded-md hover:bg-slate-50 transition-all duration-150"
                >
                  <div className="flex justify-between px-1">
                    <div className="flex gap-2 items-start">
                      
                      <div className="leading-tight">
                        <h3 className="text-primary font-semibold md:text-xl">
                          {capitalize(proj.name)}
                        </h3>
                        <p className="text-slate-700 text-xs md:text-base">
                          {capitalize(proj.description)}
                        </p>
                      </div>
                    </div>

                    <MdChevronRight className="self-center text-slate-700" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* recent tasks */}
        <div className="bg-card border border-border px-2 py-3 rounded-lg mt-4">
          <h3 className="font-semibold text-primary">Recent Tasks</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <RecentCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              tasks.slice(0, 6).map((task) => (
                <Link
                to={`/projects/${task.project_id}`}
                  key={task.id}
                  className="bg-background border px-2 py-2 border-slate-300 rounded-md hover:bg-slate-50 transition-all duration-150"
                >
                  <h3 className="text-primary md:text-xl font-semibold">
                    {capitalize(task.title)}
                  </h3>
                  <div className="flex gap-1 items-center mt-1">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityConfig[task.priority]?.color}`}
                    >
                      {priorityConfig[task.priority]?.label}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[task.status]?.color}`}
                    >
                      {statusConfig[task.status]?.label}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

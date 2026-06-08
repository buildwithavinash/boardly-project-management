import { FaTasks } from "react-icons/fa";
import { GoProjectRoadmap } from "react-icons/go";
import { IoCheckmarkDoneCircleOutline, IoFolderOpen } from "react-icons/io5";
import { MdChevronRight, MdPendingActions } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import Container from "../components/Container";
import { useAuth } from "../context/useAuth";
import { capitalize } from "../utils/formatters";
import RecentCardSkeleton from "../components/loaders/RecentCardSkeleton";
import { useProjects } from "../context/useProjects";
import { useTasks } from "../context/useTasks";

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

  return (
    <Container>
      <div className="">
        <div className="text-center font-semibold text-slate-900 text-xl">
          Welcome,{" "}
          <span className="text-2xl text-primary">
            {capitalize(userInfo?.name)}
          </span>{" "}
        </div>

        <div>{error && <p>{error}</p>}</div>

        {/* stats */}
        <div className="grid grid-cols-2 gap-1 mt-2">
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
            <h2>Recent Projects</h2>
            <Link
              to="/projects"
              className="flex bg-background justify-between items-center px-2 py-0.5 text-xs rounded-lg gap-2 border border-border"
            >
              See all <IoIosArrowRoundForward />
            </Link>
          </div>

          <div className="flex flex-col gap-2 mt-4">
            {!loading && projects.length === 0 && (
              <div>
                <h3>No projects yet.</h3>
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
                  className="bg-background border p-1 border-slate-300 rounded-md"
                >
                  <div className="flex justify-between px-1 py-1">
                    <div className="flex gap-2 items-start">
                      <IoFolderOpen className="mt-1.5 text-primary" />

                      <div className="leading-tight">
                        <h3 className="text-primary font-semibold text-lg">
                          {capitalize(proj.name)}
                        </h3>
                        <p className="text-slate-800">
                          {capitalize(proj.description)}
                        </p>
                      </div>
                    </div>

                    <MdChevronRight className="self-center" />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* recent tasks */}
        <div className="bg-card border border-border px-2 py-3 rounded-lg mt-4">
          <h3 className="">Recent Tasks</h3>

          <div className="flex flex-col gap-2 mt-4">
            {loading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <RecentCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              tasks.slice(0, 6).map((task) => (
                <div
                  key={task.id}
                  className="bg-background border px-2 py-2 border-slate-300 rounded-md"
                >
                  <h3 className="text-primary font-semibold text-lg">
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
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Dashboard;

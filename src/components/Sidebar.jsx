import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { RiAddBoxFill, RiAddBoxLine } from "react-icons/ri";
import {
  IoFolderOpen,
  IoFolderOpenOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { capitalize } from "../utils/formatters";

const Sidebar = () => {
  const { role, userInfo, user, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text font-medium transition-colors duration-150 ${
      isActive
        ? "bg-primary/10 text-primary"
        : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
    }`;
  return (
    <div className="min-h-screen w-64 bg-card hidden lg:flex flex-col fixed border-r border-slate-200">
      {/* brand name */}
      <div className="mt-6 text-center">
        <h1 className="text-primary font-bold text-3xl">Boardly</h1>
      </div>

      {/* nav links */}
      <nav className="flex flex-col gap-1 mt-4 px-2">
        <NavLink to="/dashboard" className={linkClass}>
          {({ isActive }) => (
            <>
              {isActive ? <MdDashboard /> : <MdOutlineDashboard />}
              <span className="">Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink to="/projects" className={linkClass}>
          {({ isActive }) => (
            <>
              {isActive ? <IoFolderOpen /> : <IoFolderOpenOutline />}
              <span className="">Projects</span>
            </>
          )}
        </NavLink>

        {role === "admin" && (
          <NavLink to="/create" className={linkClass}>
            {({ isActive }) => (
              <>
                {isActive ? <RiAddBoxFill /> : <RiAddBoxLine />}
                <span className="">Create</span>
              </>
            )}
          </NavLink>
        )}

        <NavLink to="/profile" className={linkClass}>
          {({ isActive }) => (
            <>
              {isActive ? <FaUserCircle /> : <FaRegUserCircle />}
              <span className="">Profile</span>
            </>
          )}
        </NavLink>
      </nav>

      {/* user info */}
      <div className="mt-auto py-4 border-t border-border flex justify-between items-center">
        <div className="flex items-center gap-2 px-2">
          <div className="size-9 shrink-0 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
            {(userInfo?.name || "U").charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">
              {capitalize(userInfo?.name || "User")}
            </p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-150 cursor-pointer"
        >
          <IoLogOutOutline />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

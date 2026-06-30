import { MdDashboard, MdOutlineDashboard } from "react-icons/md";
import { RiAddBoxFill, RiAddBoxLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { IoFolderOpen, IoFolderOpenOutline } from "react-icons/io5";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";

const BottomNav = () => {
  const { role } = useAuth();
  return (
    <div className="px-4 fixed bottom-0 left-0 right-0 h-14 bg-background/20 backdrop-blur-md border-t border-slate-300 z-100 md:hidden">
      <div className="flex justify-between text-2xl text-primary h-full w-full items-center">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col gap-0.5 justify-center items-center ${isActive ? "text-primary" : "text-slate-400"}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <MdDashboard /> : <MdOutlineDashboard />}
              <span className="text-xs">Dashboard</span>
            </>
          )}
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex flex-col gap-0.5 justify-center items-center ${isActive ? "text-primary" : "text-slate-400"}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <IoFolderOpen /> : <IoFolderOpenOutline />}
              <span className="text-xs">Projects</span>
            </>
          )}
        </NavLink>

        {role === "admin" && (
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `flex flex-col gap-0.5 justify-center items-center ${isActive ? "text-primary" : "text-slate-400"}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? <RiAddBoxFill /> : <RiAddBoxLine />}
                <span className="text-xs">Create</span>
              </>
            )}
          </NavLink>
        )}

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col gap-0.5 justify-center items-center ${isActive ? "text-primary" : "text-slate-400"}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive ? <FaUserCircle /> : <FaRegUserCircle />}
              <span className="text-xs">Profile</span>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;

import {  } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import {  PiFolderSimpleBold } from "react-icons/pi";
import { RiAddBoxLine, RiUser3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const BottomNav = () => {
    const {role} = useAuth();
  return (
    <div className="px-6 fixed bottom-0 left-0 right-0 h-12 bg-background border-t border-slate-300">
      <div className="flex justify-between text-2xl text-primary h-full w-full items-center">
        <NavLink to='/dashboard' >
          <MdOutlineDashboard />
        </NavLink>

        <NavLink to='/projects'>
          <PiFolderSimpleBold/>
        </NavLink>

    {role === 'admin' && (
        <NavLink to='/create'>
            <RiAddBoxLine/>
        </NavLink>
    )}
        

        <NavLink to='/profile'>
            <RiUser3Line/>
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNav;

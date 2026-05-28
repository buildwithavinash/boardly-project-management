import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import { IoSettingsOutline, IoSettingsSharp } from "react-icons/io5";

const Navbar = () => {
    const {user, userInfo} = useAuth()
    console.log("user", user);
  return (
    <div className="bg-blue-100/20 border border-slate-300/20 fixed top-0 left-0 right-0 flex justify-between items-center py-1 px-2 backdrop-blur-md">
        <div className="">
            <h3 className="text-2xl">Hello, {userInfo?.name}</h3>
        </div>
 
        <div>
             <NavLink to='/settings' className={({isActive})=>`flex flex-col gap-0.5 justify-center items-center ${isActive ? 'text-primary' : 'text-slate-400'}`} >
         {({isActive})=>(
          <>
            {isActive ? <IoSettingsSharp/>  : <IoSettingsOutline/>}
          </>
         )}
        </NavLink>
        </div>
    </div>
  )
}

export default Navbar
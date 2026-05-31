import Container from "../components/Container";
import { useAuth } from "../context/AuthContext"
import { useProjects } from "../context/ProjectsContext";

const Profile = () => {
    const {user, userInfo, role, logout} = useAuth();
    const {projects} = useProjects();
    console.log(projects);

  return (
    <Container>

        <div>
            <h3 className="text-center text-2xl font-medium">My Profile</h3>
        </div>
    <div className="mt-4">
        <div className="flex justify-center items-center flex-col gap-2">

        <div className="h-18 w-18 bg-slate-300 rounded-full flex justify-center items-center overflow-hidden">
            <div className="h-full w-full flex justify-center items-center">
                {userInfo?.name.at(0).toUpperCase()}
            </div>
        </div>

        </div>

        <div>
            <h3>Account</h3>
            <div className="flex flex-col">

            <div className="flex justify-between">
            <p>Name</p>
            <p className="">{userInfo?.name}</p>
            </div>

            <div className="flex justify-between">
                <p>Email</p>
            <p className="">{user.email}</p>
            </div>

            <div className="flex justify-between">
            <p>Role</p>
            <p className={`${role === "admin" ? " text-blue-500 " : " text-yellow-500"}`}>{role}</p>
            </div>

            <div className="flex justify-between">
                <p>Member since</p>
                <p>{new Date(userInfo?.created_at).toLocaleDateString()}</p>
            </div>
        </div>
        </div>

        <div>
            <h3>Overview</h3>
            <div className="flex flex-col">

            <div className="flex justify-between">
            <p>Projects</p>
            <p className="">{projects.length}</p>
            </div>

            <div className="flex justify-between">
                <p>Tasks</p>
            <p className="">{}</p>
            </div>


        </div>
        </div>
        

        <div className="text-center">
            <p className="text-sm mb-1">
                Once you logout, you'll need to login again.
            </p>
            <button onClick={logout} className="bg-red-500 w-full px-4 py-2 rounded-md text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200">Logout</button>
        </div>
    </div>
    </Container>
  )
}

export default Profile
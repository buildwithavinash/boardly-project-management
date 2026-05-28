import { useAuth } from "../context/AuthContext"

const Profile = () => {
    const {user, userInfo, role, logout} = useAuth();

  return (
    <div className="">
        <h1>Profile</h1>

        <div>
            <p>Name</p>
            <p>{userInfo?.name}</p>
        </div>
        <div>
            <p>Email</p>
            <p>{user.email}</p>
        </div>

        <div>
            <p>Role</p>
            <p>{role}</p>
        </div>

        <div>
            <button onClick={logout} className="bg-primary px-4 py-2 rounded-md text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200">Logout</button>
        </div>
    </div>
  )
}

export default Profile
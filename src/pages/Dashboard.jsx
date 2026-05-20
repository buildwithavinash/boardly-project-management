import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const {user, logout, role} = useAuth();

  return (
    <div>
      Dashboard: {user?.email}
      Role: {role}
      <button onClick={logout} className="border p-2">Logout</button>
    </div>
  )
}

export default Dashboard
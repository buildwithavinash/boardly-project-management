import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const {user, logout} = useAuth();

  return (
    <div>
      Dashboard: {user?.email}

      <button onClick={logout} className="border p-2">Logout</button>
    </div>
  )
}

export default Dashboard
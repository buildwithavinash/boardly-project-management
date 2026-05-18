import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const {user} = useAuth();

  return (
    <div>
      Dashboard: {user?.email}
    </div>
  )
}

export default Dashboard
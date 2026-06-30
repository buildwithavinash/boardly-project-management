import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import Loader from '../components/loaders/Loader'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex justify-center items-center"><Loader/></div>;

  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;

import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./pages/projects/Projects";
import CreateProject from "./pages/projects/CreateProject";
import ProjectDetail from "./pages/projects/ProjectDetail";
import EditProject from "./pages/projects/EditProject";
import CreateTask from "./pages/tasks/CreateTask";
import { useAuth } from "./context/useAuth";
import BottomNav from "./components/BottomNav";
import Profile from "./pages/Profile";
import EditTask from "./pages/tasks/EditTask";
import Toast from "./components/Toast";
import AdminRoute from "./components/AdminRoute";
import Loader from "./components/loaders/Loader";
import Sidebar from "./components/Sidebar";

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center"><Loader/></div>;
  }
  return (
    <div className="bg-background h-screen w-full">
      <Toast />
      {user && <Sidebar/>}

      <div className={user ? 'lg:pl-64' : ''}>
        <div className="">
         
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/dashboard" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/create"
          element={
            <AdminRoute>
              <CreateProject />
            </AdminRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:id/edit"
          element={
            <AdminRoute>
              <EditProject />
            </AdminRoute>
          }
        />
        <Route
          path="/projects/:id/create-task"
          element={
            <AdminRoute>
              <CreateTask />
            </AdminRoute>
          }
        />
        <Route
          path="/task/:id/edit"
          element={
            <AdminRoute>
              <EditTask />
            </AdminRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
       </div> 
      </div>
      {user && <BottomNav />}
      
    </div>
  );
};

export default App;

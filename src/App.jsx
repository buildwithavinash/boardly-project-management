import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Projects from "./pages/Projects"
import CreateProject from "./pages/CreateProject"
import ProjectDetail from "./pages/ProjectDetail"
import EditProject from "./pages/EditProject"
import CreateTask from "./pages/CreateTask"
import Navbar from "./components/Navbar"
import { useAuth } from "./context/AuthContext"

const App = () => {
  const {user, loading} = useAuth();

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className="bg-background h-screen w-full p-2">
      <Navbar/>
    <Routes>
      <Route path="/" element={
        user ? <Navigate to='/dashboard' /> : <Signup/>
        }/>
      <Route path="/signup" element={
       user ? <Navigate to='/dashboard'/> : <Signup/>
        }/>
      <Route path="/login" element={
       user ? <Navigate to='/dashboard'/> : <Login/>
        }/>
      <Route path="/create" element={<ProtectedRoute><CreateProject/></ProtectedRoute>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/projects" element={<ProtectedRoute><Projects/></ProtectedRoute>}/>
      <Route path="/projects/:id" element={<ProtectedRoute>
        <ProjectDetail/>
      </ProtectedRoute>} />
      <Route path="/projects/:id/edit" element={<ProtectedRoute>
        <EditProject/>
      </ProtectedRoute>} />
      <Route path="/projects/:id/create-task" element={<ProtectedRoute>
        <CreateTask/>
      </ProtectedRoute>} />
    </Routes>
    </div>
  )
}

export default App
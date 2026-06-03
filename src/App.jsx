import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/auth/Signup"
import Login from "./pages/auth/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Projects from "./pages/projects/Projects"
import CreateProject from "./pages/projects/CreateProject"
import ProjectDetail from "./pages/projects/ProjectDetail"
import EditProject from "./pages/projects/EditProject"
import CreateTask from "./pages/tasks/CreateTask"
import { useAuth } from "./context/AuthContext"
import BottomNav from "./components/BottomNav"
import Profile from "./pages/Profile"
import EditTask from './pages/tasks/EditTask'

const App = () => {
  const {user, loading} = useAuth();

  if(loading){
    return <p>Loading...</p>
  }
  return (
    <div className="bg-background h-screen w-full p-2">
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
      <Route path='/task/:id/edit' element={<ProtectedRoute>
        <EditTask/>
      </ProtectedRoute>}/>
      <Route path="/profile" element={<ProtectedRoute>
        <Profile/>
      </ProtectedRoute>}/>
    </Routes>
    <BottomNav/>
    </div>
  )
}

export default App
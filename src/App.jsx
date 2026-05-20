import { Routes, Route } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <div className="bg-slate-50 h-screen w-full p-2">
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
    </Routes>
    </div>
  )
}

export default App
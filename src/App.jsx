import { Routes, Route } from "react-router"
import Signup from "./pages/Signup"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<div>Login Page</div>}/>
    </Routes>
  )
}

export default App
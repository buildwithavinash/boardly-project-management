import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const {setUser} = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [laoding, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => {
    return {...prev, [name]: value}
    }
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        setLoading(true);

        const {data, error: err} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
        })

        if(err) {
    setError(err.message)
    return
}

        console.log(data);

    alert("Login successfull")
    setUser(data.user)
    navigate('/dashboard')
  }catch(err) {
    setError(err)
  }finally{
    setLoading(false)
  }

  
    }
    

  return (
    <div>

      {error && <p>Error : {error}</p>}

        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border border-slate-300 rounded-md px-4 py-2"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border border-slate-300 rounded-md px-4 py-2"/>
            <button disabled={laoding} type="submit" className="bg-black text-white px-4 py-2 rounded-md">Login</button>
        </form>

        <p>Create new account <Link to='/signup'> Signup </Link></p>
    </div>
  )
}

export default Login
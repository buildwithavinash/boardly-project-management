import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../../lib/supabase"
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";

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
    <Container>
   
    <div className="text-center h-full w-full flex justify-center items-center">

    <div>

        <h2 className="text-3xl text-slate-800 font-semibold">Login</h2>
        <form onSubmit={handleSubmit} className="border border-slate-300 flex flex-col items-center justify-center gap-4 p-8 rounded-md mt-8 bg-card shadow-2xs">
      {error && <p>Error : {error}</p>}
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border border-slate-300 px-4 py-2 rounded-md focus:border-border focus:outline-none transition-all duration-150"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border border-slate-300 px-4 py-2 rounded-md focus:border-border focus:outline-none transition-all duration-150"/>
            <button disabled={laoding} type="submit" className="bg-primary text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 px-4 py-2 rounded-md">Login</button>
        </form>

        <p className="mt-4">Don't have an account? <Link to='/signup' className="text-primary underline"> Signup </Link></p>
    </div>
        </div>

        
</Container>
  )
}

export default Login
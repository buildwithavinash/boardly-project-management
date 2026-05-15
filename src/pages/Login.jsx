import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"

const Login = () => {

  const navigate = useNavigate();

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
    setLoading(true);

    const {data, error: signInError} = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password
    })

    if(signInError){
      setError(error);
      return;
    }

    console.log(data);

    alert("Login successfull")
    navigate('/dashboard')
    setLoading(false);
    setError(null)
  }

  if(error){
    return <p>Try again!</p>
  }

  return (
    <div>

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
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // supabase auth signup

    const {data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
    })

    if(error) {
    setError(error.message)
    setLoading(false)
    return
  }

  // Insert to the profiles table
  const {error: profileError} = await supabase.from('profiles').insert({
    id: data.user.id,
    name: formData.name,
    role: formData.role
  })

  if(profileError){
    setError(profileError.message);
    setLoading(false)
    return
  }

//   reset form
setFormData({
    name:'', email: '', password: '', role: 'admin'
})

// redirect to login
navigate('/login')
alert("Signup successful! Please Login.")
  }

  return (
    <div className="p-4 text-center">
      <div>
        {error && <p>{error}</p>}
        <h2 className="text-3xl font-semibold">Signup</h2>

        <form
          onSubmit={handleSubmit}
          className="border border-slate-300 flex flex-col items-center justify-center gap-4 p-8 rounded-md mt-8 bg-white"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-slate-300 px-4 py-2 rounded-md"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="you@example.com"
            onChange={handleChange}
            className="border border-slate-300 px-4 py-2 rounded-md"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="border border-slate-300 px-4 py-2 rounded-md"
          />

          <div>
            <label htmlFor="">Signup as : </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-slate-300 rounded-md px-2 py-1"
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded-md"
          >
            Signup
          </button>
        </form>

        <p className="mt-4">Already have an account? <Link to='/login'> Login </Link></p>
      </div>
    </div>
  );
};

export default Signup;

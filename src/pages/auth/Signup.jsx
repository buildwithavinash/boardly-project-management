import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useToast } from "../../context/ToastContext";

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
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setError(null);

    if(!formData.name.trim()){
      setError('Name is required.');
      addToast('Name is required.','error');
      return;
    }

    if(!formData.email.trim() || !formData.password.trim()){
      setError('Email and password are required.');
      addToast("Email and password are required.", 'error');
      return;
    }

    if(formData.password.length < 6){
      setError('Password must be at least 6 characters.');
      addToast('Password must be at least 6 characters.', 'error');
      return;
    }
    // supabase auth signup

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
    });

    if (error) {
      addToast("Failed to create account. Email might already exist.", "error");
      setError(error.message);
      setLoading(false);
      return;
    }

    // Insert to the profiles table
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name: formData.name.trim(),
      role: formData.role,
    });

    if (profileError) {
      setError(profileError.message);
      setLoading(false);
      return;
    }

    //   reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "admin",
    });

    // redirect to login
    addToast("Account created successfully! Please log in.", "success");
    navigate("/login");
  };

  return (
    <Container>
      <div className="">
        <div className="">
          {error && <p>{error}</p>}
          <h2 className="text-3xl font-semibold text-slate-800">
            Create your account
          </h2>

          <form
            onSubmit={handleSubmit}
            className="border border-slate-300 flex flex-col items-center justify-center gap-4 p-8 rounded-md mt-8 bg-card shadow-2xs"
          >
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border border-slate-300 px-4 py-2 rounded-md focus:border-border focus:outline-none transition-all duration-150"
            />

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              className="border border-slate-300 px-4 py-2 rounded-md"
            />

            <input
              type="password"
              name="password"
              required
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
              className="bg-primary text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 px-4 py-2 rounded-md"
            >
              Signup
            </button>
          </form>

          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary underline">
              {" "}
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Signup;

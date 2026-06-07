import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import Container from "../../components/Container";
import { useToast } from "../../context/ToastContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if(!formData.email.trim() || !formData.password.trim()){
      setError('Email and password are required.');
      addToast('Email and password are required.', 'error')
    }
    try {
      setLoading(true);

      const { data, error: err } = await supabase.auth.signInWithPassword({
        email: formData.email.trim(),
        password: formData.password,
      });

      if (err) {
        setError(err.message);
        addToast("Invalid email or password.", "error");
        return;
      }
      addToast("Logged in successfully!", "success");
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="text-center h-full w-full flex justify-center items-center">
        <div>
          <h2 className="text-3xl text-slate-800 font-semibold">Login</h2>
          <form
            onSubmit={handleSubmit}
            className="border border-slate-300 flex flex-col items-center justify-center gap-4 p-8 rounded-md mt-8 bg-card shadow-2xs"
          >
            {error && <p className="text-red-500 text-sm">Error : {error}</p>}
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-slate-300 px-4 py-2 rounded-md focus:border-border focus:outline-none transition-all duration-150"
            />
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-slate-300 px-4 py-2 rounded-md focus:border-border focus:outline-none transition-all duration-150"
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 px-4 py-2 rounded-md"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary underline">
              {" "}
              Signup{" "}
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Login;

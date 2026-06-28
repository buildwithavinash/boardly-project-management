import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/useAuth";
import { useToast } from "../../context/useToast";

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

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required.");
      addToast("Email and password are required.", "error");
      return;
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl text-center font-semibold text-slate-800">
            Welcome back to{" "}
            <span className="font-bold text-primary">Boardly</span>
          </h2>
          <p className="text-slate-700 mt-2">
            Sign in to manage your projects, track progress, and collaborate
            with your team.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border border-slate-300 bg-card flex flex-col gap-4 p-8 rounded-md mt-4 shadow-xs"
        >
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
          />
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
          />
          {error && (
            <p className="text-xs text-red-500 text-center">
              Some error occured
            </p>
          )}
          <button
            disabled={loading}
            type="submit"
            className="bg-primary text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 px-4 py-2 rounded-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-slate-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            {" "}
            Sign up{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

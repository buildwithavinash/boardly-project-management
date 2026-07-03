import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useToast } from "../../context/useToast";

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

    if (!formData.name.trim()) {
      setError("Name is required.");
      addToast("Name is required.", "error");
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required.");
      addToast("Email and password are required.", "error");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      addToast("Password must be at least 6 characters.", "error");
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h2 className="text-3xl text-center font-semibold text-slate-800">
            Welcome to <span className="text-primary font-bold">Boardly</span>
          </h2>
          <p className="text-slate-700 mt-2">
            Join Boardly and turn your ideas into organized, actionable
            projects.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-slate-200 bg-card flex flex-col gap-4 p-8 rounded-md mt-4 shadow-xs"
        >
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
          />

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
          />

          <input
            type="password"
            name="password"
            required
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
          />

          <div className="flex items-center gap-2 flex-nowrap">
            <label htmlFor="" className="flex-1 text-nowrap">
              Role :{" "}
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition"
            >
              <option value="admin">Admin</option>
              <option value="member">Member</option>
            </select>
          </div>

          {error && (
            <p className="text-xs text-red-500 text-center">
              Some error occured
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white font-semibold cursor-pointer hover:opacity-80 transition-all duration-200 px-4 py-2 rounded-md"
          >
            Signup
          </button>
        </form>

        <p className="mt-4 text-center text-slate-700">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-semibold">
            {" "}
            Log in{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

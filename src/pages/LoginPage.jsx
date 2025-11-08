import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post("http://localhost:8000/api/auth/login", formData)
      .then((res) => {
          const token = res.data.access_token;
      console.log("Access Token:", token);

      // Save before navigating
      localStorage.setItem("access_token", token);

        navigate('/');
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
    // Later: integrate with FastAPI backend login endpoint
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6 relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay for calm blur effect */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🌿 Welcome Back</h2>
        <p className="text-gray-600 mb-6">
          We're glad to see you again. Log in to continue your wellness journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow transition-all duration-200"
          >
            🔑 Log In
          </button>
        </form>

        <p className="text-gray-700 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-purple-600 hover:underline font-medium"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

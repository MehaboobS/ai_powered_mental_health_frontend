import React, { useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";
import axios from "axios";  
const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axios.post("http://localhost:8000/api/auth/signup", formData)
      .then((res) => {
        console.log("Signup successful:", res.data);  
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
    // Later: integrate with FastAPI backend signup endpoint
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-6 relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay for calm effect */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

      {/* Signup Card */}
      <div className="relative z-10 bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          🌸 Create Your Account
        </h2>
        <p className="text-gray-600 mb-6">
          Begin your journey toward better mental wellness with your AI
          companion.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70"
              required
            />
          </div>

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

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white/70"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow transition-all duration-200"
          >
            🌼 Sign Up
          </button>
        </form>

        <p className="text-gray-700 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;

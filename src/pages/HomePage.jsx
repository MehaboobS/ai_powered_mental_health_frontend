import React from "react";
import heroBg from "../assets/hero-bg.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* 🔹 Top Navigation (Login + Signup Buttons) */}
      <div className="absolute top-6 right-6 flex gap-4">
        <Link
          to="/login"
          className="bg-white/80 backdrop-blur-md text-gray-800 font-medium py-2 px-5 rounded-full shadow hover:bg-white transition-all duration-200"
        >
           Login
        </Link>
        <Link
          to="/signup"
          className="bg-purple-600 text-white font-medium py-2 px-5 rounded-full shadow hover:bg-purple-700 transition-all duration-200"
        >
           Signup
        </Link>
      </div>

      {/* Top Badge */}
      <div className="mb-4 mt-16">
        <div className="inline-block bg-white/70 backdrop-blur-sm text-gray-700 text-sm font-medium py-2 px-4 rounded-full shadow">
          <span className="mr-1">🛡️</span>
          Confidential • Empathetic • Culturally Sensitive
        </div>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900">
        Your Safe Space for{" "}
        <span className="text-purple-600">Mental Wellness</span>
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-gray-700 text-lg max-w-2xl">
        A judgment-free AI companion designed specifically for Indian youth. We
        understand the pressures you face and we're here to support you,
        confidentially.
      </p>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link
          to="/chat"
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition-all duration-200"
        >
          💬 Start a Conversation
        </Link>
        <Link
          to="/learn-more"
          className="bg-white/70 backdrop-blur-md hover:bg-white text-gray-900 font-medium py-3 px-6 rounded-full shadow-md transition-all duration-200"
        >
          🤍 Learn More
        </Link>
      </div>

      {/* Info Cards */}
      <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {/* Card 1 */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow text-gray-800">
          <div className="text-purple-600 text-2xl mb-3">🛡️</div>
          <h3 className="font-semibold text-lg mb-2">100% Confidential</h3>
          <p className="text-sm text-gray-600">
            Your conversations are private and secure. No data sharing, ever.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow text-gray-800">
          <div className="text-pink-500 text-2xl mb-3">❤️</div>
          <h3 className="font-semibold text-lg mb-2">Culturally Aware</h3>
          <p className="text-sm text-gray-600">
            Designed with Indian cultural context and sensitivities in mind.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow text-gray-800">
          <div className="text-green-500 text-2xl mb-3">💬</div>
          <h3 className="font-semibold text-lg mb-2">Always Available</h3>
          <p className="text-sm text-gray-600">
            24/7 support whenever you need someone to talk to.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

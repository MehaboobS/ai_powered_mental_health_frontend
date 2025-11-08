import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { LoginPage, SignupPage, ChatUI, HomePage } from "./pages/index.js";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("User not authenticated:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) return <div className="text-center mt-10">Checking authentication...</div>;

  if (!isAuthenticated) {
    alert("Please log in to access the chat.");
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Protected Chat UI */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatUI />
            </ProtectedRoute>
          }
        />

        {/* Signup */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;

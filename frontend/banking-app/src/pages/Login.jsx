import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // Save user info to localStorage for Dashboard & other components
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userProfile", res.data.user.profile || "");

      alert(res.data.msg);
      navigate("/dashboard"); // Redirect to dashboard after login
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl flex flex-col gap-6 text-white animate-fadeIn"
      >
        <h2 className="text-4xl font-extrabold text-center mb-6 tracking-wider">
          Welcome Back
        </h2>

        {/* Inputs */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 transition"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 transition"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 shadow-lg shadow-purple-500/50 hover:shadow-purple-600/70 transition-all p-3 rounded-xl font-bold text-lg tracking-wide"
        >
          Login
        </button>

        {/* Footer */}
        <p className="text-center text-purple-200 text-sm">
          Don't have an account?{" "}
          <span
            className="text-white font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

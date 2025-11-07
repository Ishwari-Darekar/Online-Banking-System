import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      if (profile) formData.append("profile", profile);

      // Signup request
      const signupRes = await axios.post("http://localhost:5000/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Save user info to localStorage
      const user = signupRes.data.user;
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("userProfile", user.profile || "");

      alert("Signup successful! Default Salary Credit added.");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.msg || "Error signing up");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-md shadow-xl flex flex-col gap-6 text-white animate-fadeIn"
      >
        <h2 className="text-4xl font-extrabold text-center mb-6 tracking-wider">
          Create Account
        </h2>

        {/* Profile Upload */}
        <div className="flex flex-col items-center gap-4">
          {profile ? (
            <img
              src={URL.createObjectURL(profile)}
              alt="Profile Preview"
              className="w-28 h-28 rounded-full object-cover border-4 border-purple-400 shadow-lg hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-purple-600/30 flex items-center justify-center text-purple-200 text-xl font-bold">
              +
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfile(e.target.files[0])}
            className="text-white text-sm"
          />
        </div>

        {/* Inputs */}
        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 rounded-xl bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-1 transition"
        />
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
          Sign Up
        </button>

        {/* Footer */}
        <p className="text-center text-purple-200 text-sm">
          Already have an account?{" "}
          <span
            className="text-white font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;

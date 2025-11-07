import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();
  const [showEmpInput, setShowEmpInput] = useState(false);
  const [empId, setEmpId] = useState("");
  const [empError, setEmpError] = useState("");

  // Regex: EMP followed by 5 digits and ending with BB
  const EMP_REGEX = /^EMP\d{5}BB$/;

  const handleEmployeeLoginClick = () => {
    setShowEmpInput(true); // Show input when button is clicked
  };

  const handleEmpSubmit = () => {
    if (!EMP_REGEX.test(empId)) {
      setEmpError("Invalid Employee ID format. Example: EMP12345BB");
      return;
    }
    setEmpError("");
    navigate("/emp"); // Navigate to employee panel
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between min-h-screen w-full bg-gradient-to-br from-[#1a0a3a] via-[#3a0a5a] to-[#5a0a7a] px-8 md:px-16 overflow-hidden text-white">
      
      {/* Left side: Text + Buttons */}
      <div className="flex-1 flex flex-col justify-center mb-10 md:mb-0 z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Pay bills, get <br /> paid & manage cash flow
        </h1>
        <p className="text-gray-300 mb-6">
          For those who want more from their money — there’s savvy. Sign up for free, in a tap.
        </p>

        <div className="flex gap-4 mb-4 flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-purple-500 to-pink-500 py-2 px-6 rounded-lg font-semibold hover:scale-105 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 py-2 px-6 rounded-lg font-semibold hover:scale-105 transition"
          >
            Sign Up
          </button>
          <button
            onClick={handleEmployeeLoginClick}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 py-2 px-6 rounded-lg font-semibold hover:scale-105 transition"
          >
            Employee Login
          </button>
        </div>

        {/* Step 2: Employee ID input */}
        {showEmpInput && (
          <div className="flex gap-3 items-center mt-2">
            <input
              type="text"
              placeholder="Enter Employee ID"
              value={empId}
              onChange={(e) => setEmpId(e.target.value.toUpperCase())} // auto-uppercase
              className="px-4 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handleEmpSubmit}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 py-2 px-6 rounded-lg font-semibold hover:scale-105 transition"
            >
              Submit
            </button>
          </div>
        )}
        {empError && <p className="text-red-400 mt-2">{empError}</p>}

        <p className="text-gray-300 mt-6">"Join a community that banks smarter."</p>
      </div>

      {/* Right side: Floating Cards (unchanged) */}
      <div className="flex-1 relative w-full md:h-screen flex items-center justify-center z-10">
        {/* Purple Card */}
        <motion.div
          animate={{ y: [0, -15, 0], rotateZ: [0, 2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
          className="absolute top-24 md:top-32 left-10 md:left-20 w-72 h-44 rounded-xl shadow-2xl p-6 text-white 
                     bg-gradient-to-r from-purple-500 to-purple-400 
                     border border-white/20 
                     [box-shadow:0_0_20px_rgba(168,85,247,0.7)]"
        >
          <p className="text-lg font-bold tracking-wide">5235 420@ 2432 222</p>
          <p className="mt-10 text-sm">12/24</p>
        </motion.div>

        {/* Orange Card */}
        <motion.div
          animate={{ y: [0, 20, 0], rotateZ: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotateY: -15, rotateX: 10, scale: 1.05 }}
          className="absolute top-40 md:top-48 left-0 md:left-10 w-72 h-44 rounded-xl shadow-2xl p-6 text-white 
                     bg-gradient-to-r from-orange-400 to-pink-500 
                     border border-white/20 
                     [box-shadow:0_0_20px_rgba(249,115,22,0.7)]"
        >
          <p className="text-lg font-bold">$savvy</p>
          <p className="mt-10 text-sm">Valid Thru: 10/24</p>
        </motion.div>

        {/* Green Card */}
        <motion.div
          animate={{ y: [0, -10, 0], rotateZ: [0, 1, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05 }}
          className="absolute top-56 md:top-60 left-20 md:left-40 w-72 h-44 rounded-xl shadow-2xl p-6 text-white 
                     bg-gradient-to-r from-green-500 to-emerald-500 
                     border border-white/20 
                     [box-shadow:0_0_20px_rgba(34,197,94,0.7)]"
        >
          <p className="text-lg font-bold">9876 5432 1098 7654</p>
          <p className="mt-10 text-sm">11/25</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

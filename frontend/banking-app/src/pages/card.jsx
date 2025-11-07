import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRupeeSign, FaToggleOn, FaToggleOff, FaMicrochip } from "react-icons/fa";

// Utility to generate random 16-digit card number in XXXX XXXX XXXX XXXX format
const generateRandomCardNumber = () => {
  let number = "";
  for (let i = 0; i < 16; i++) {
    number += Math.floor(Math.random() * 10);
    if ((i + 1) % 4 === 0 && i !== 15) number += " ";
  }
  return number;
};

const Card = () => {
  const [user, setUser] = useState({ name: "John Doe", cardNumber: "" });

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "John Doe";
    setUser((prev) => ({ ...prev, name: storedName }));

    // Check if card number exists for this user in localStorage
    const storedCardNumber = localStorage.getItem(`cardNumber_${storedName}`);
    if (storedCardNumber) {
      setUser((prev) => ({ ...prev, cardNumber: storedCardNumber }));
    } else {
      // Generate new card number and save to localStorage
      const newCardNumber = generateRandomCardNumber();
      localStorage.setItem(`cardNumber_${storedName}`, newCardNumber);
      setUser((prev) => ({ ...prev, cardNumber: newCardNumber }));
    }
  }, []);

  const [card, setCard] = useState({
    valid: "12/28",
    dailyLimit: 50000,
    domesticLimit: 30000,
    internationalLimit: 20000,
    colorFrom: "#8b5cf6",
    colorTo: "#c084fc",
    onlineUsage: true,
    atmUsage: true,
    contactless: true,
    freeze: false,
    notifications: true,
  });

  const toggle = (key) => setCard({ ...card, [key]: !card[key] });
  const changeValue = (key, value) => setCard({ ...card, [key]: Number(value) });
  const handleSubmit = () => alert("Card settings saved successfully!");

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#1a0a3a] via-[#3a0a5a] to-[#5a0a7a] p-8 flex justify-center items-center gap-12 overflow-hidden">

      {/* Card Display */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="w-96 h-56 rounded-2xl p-6 text-white shadow-2xl border border-white/20"
        style={{
          background: `linear-gradient(135deg, ${card.colorFrom}, ${card.colorTo})`,
          boxShadow: `0 0 30px rgba(255,255,255,0.3)`,
          position: "relative",
        }}
      >
        <FaMicrochip className="absolute top-6 left-6 text-yellow-300 text-3xl" />
        <p className="absolute top-20 left-6 text-lg font-bold tracking-widest">{user.cardNumber}</p>
        <p className="absolute bottom-14 left-6 uppercase text-sm tracking-wide">{user.name}</p>
        <p className="absolute bottom-6 left-6 text-xs">Valid Thru: {card.valid}</p>
      </motion.div>

      {/* Settings Panel */}
      <div className="w-96 p-6 rounded-2xl flex flex-col gap-4
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-neon-glow overflow-y-auto max-h-[80vh]">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Card Settings</h1>

        {/* Toggles */}
        {[ 
          { label: "Online Usage", key: "onlineUsage" },
          { label: "ATM Usage", key: "atmUsage" },
          { label: "Contactless Payments", key: "contactless" },
          { label: "Freeze Card Temporarily", key: "freeze" },
          { label: "Transaction Notifications", key: "notifications" }
        ].map((item) => (
          <div key={item.key} className="flex justify-between items-center text-white">
            <span className="font-semibold">{item.label}:</span>
            <button onClick={() => toggle(item.key)} className="text-2xl">
              {card[item.key] ? <FaToggleOn className="text-green-400" /> : <FaToggleOff className="text-gray-400" />}
            </button>
          </div>
        ))}

        {/* Numeric Limits */}
        {[ 
          { label: "Daily Limit", key: "dailyLimit" },
          { label: "Domestic Limit", key: "domesticLimit" },
          { label: "International Limit", key: "internationalLimit" }
        ].map((item) => (
          <div key={item.key} className="flex flex-col gap-1 text-white">
            <label className="font-semibold">{item.label}:</label>
            <div className="flex items-center gap-2">
              <FaRupeeSign className="text-yellow-300" />
              <input
                type="number"
                value={card[item.key]}
                onChange={(e) => changeValue(item.key, e.target.value)}
                className="w-full rounded-lg px-2 py-1 bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg font-semibold text-white
                     bg-gradient-to-r from-purple-500 to-pink-500
                     hover:scale-105 transition shadow-neon-glow mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Card;

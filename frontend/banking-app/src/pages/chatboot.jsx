import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaComments } from "react-icons/fa";

const Chatboot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Coins configuration - generated only once
  const coins = useMemo(() => 
    Array.from({ length: 40 }).map(() => ({
      size: 40 + Math.random() * 30,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4
    }))
  , []); // empty dependency array ensures it's generated only once


  // Cards configuration
const cards = useMemo(() => [
  { colorFrom: "#7F00FF", colorTo: "#E100FF", position: "top-5 left-5" },
  { colorFrom: "#FF8C00", colorTo: "#FF0080", position: "top-5 right-5" },
  { colorFrom: "#00C853", colorTo: "#B2FF59", position: "bottom-5 left-5" },
  { colorFrom: "#0091EA", colorTo: "#00E5FF", position: "bottom-5 right-5" }
], []);

const handleSend = async () => {
  if (!input) return;
  setMessages([...messages, { type: "user", text: input }]);
  setInput("");

  try {
    const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input })
    });


    const data = await res.json();

    setMessages(prev => [...prev, { type: "bot", text: data.answer }]);
  } catch (error) {
    setMessages(prev => [...prev, { type: "bot", text: "Sorry, I couldn't connect right now." }]);
  }
};


  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#1a0a3a] via-[#3a0a5a] to-[#5a0a7a] overflow-hidden">

      {/* Floating Coins */}
      {coins.map((coin, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: coin.duration, repeat: Infinity, ease: "easeInOut", delay: coin.delay }}
          className="absolute flex items-center justify-center text-yellow-400 font-bold rounded-full border-2 border-yellow-500 bg-yellow-300/40 shadow-[0_0_20px_rgba(255,223,0,0.7)]"
          style={{
            width: coin.size,
            height: coin.size,
            top: coin.top,
            left: coin.left,
            fontSize: coin.size / 3
          }}
        >
          ₹
        </motion.div>
      ))}

      {/* Floating Cards */}
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          animate={{ y: [0, -15 + idx * 5, 0], rotateZ: [0, idx % 2 === 0 ? 2 : -2, 0] }}
          transition={{ duration: 4 + idx, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ rotateY: 15, rotateX: 10, scale: 1.05 }}
          className={`absolute w-72 h-44 rounded-xl shadow-2xl p-6 text-white border border-white/20 ${card.position}`}
          style={{
            background: `linear-gradient(to right, ${card.colorFrom}, ${card.colorTo})`,
          }}
        >
          <p className="text-lg font-bold">
            {idx === 0 ? "5235 420@ 2432 222" : idx === 1 ? "$savvy" : idx === 2 ? "9876 5432 1098 7654" : "1111 2222 3333 4444"}
          </p>
          <p className="mt-10 text-sm">
            {idx === 0 ? "12/24" : idx === 1 ? "Valid Thru: 10/24" : idx === 2 ? "11/25" : "01/27"}
          </p>
        </motion.div>
      ))}

      {/* Chat Box */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/5 h-4/5 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl flex flex-col gap-4 max-h-[85vh] overflow-hidden border border-white/20">
        
        <div className="flex items-center gap-3 mb-2 text-white font-bold text-2xl">
          <FaComments className="text-blue-400" />
          <span>ChatBoot</span>
        </div>

        <div className="flex flex-col gap-3 flex-1 overflow-y-auto px-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`px-4 py-2 rounded-lg max-w-xs ${
                msg.type === "user" ? "bg-blue-500 self-end text-white" : "bg-purple-600 self-start text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex mt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 rounded-l-2xl outline-none border-none bg-white/20 text-white placeholder-white text-lg"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 px-5 rounded-r-2xl flex items-center justify-center hover:bg-blue-600 transition text-xl"
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatboot;

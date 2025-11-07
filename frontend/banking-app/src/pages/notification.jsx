// Notification.jsx
import React from "react";
import { FaBell, FaInfoCircle, FaGift, FaExclamationTriangle } from "react-icons/fa";

const notifications = [
  { id: 1, type: "info", message: "Your monthly statement is ready.", time: "Today, 10:30 AM" },
  { id: 2, type: "success", message: "Payment of ₹5,000 received.", time: "Today, 09:15 AM" },
  { id: 3, type: "warning", message: "Your account balance is low.", time: "Yesterday" },
  { id: 4, type: "offer", message: "Special offer: Get 5% cashback on groceries.", time: "2 days ago" },
  { id: 5, type: "info", message: "New feature: You can now schedule payments.", time: "3 days ago" },
];

const Notification = () => {
  const getColor = (type) => {
    switch (type) {
      case "success": return "border-green-400 text-green-200 shadow-green-500/50";
      case "warning": return "border-yellow-400 text-yellow-200 shadow-yellow-500/50";
      case "offer": return "border-pink-400 text-pink-200 shadow-pink-500/50";
      case "info":
      default: return "border-blue-400 text-blue-200 shadow-blue-500/50";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "success": return <FaGift className="text-green-400" />;
      case "warning": return <FaExclamationTriangle className="text-yellow-400" />;
      case "offer": return <FaGift className="text-pink-400" />;
      case "info":
      default: return <FaInfoCircle className="text-blue-400" />;
    }
  };

  return (
    <div className="relative flex-1 flex justify-center items-start min-h-screen bg-gradient-to-br from-[#1a0a3a] via-[#3a0a5a] to-[#5a0a7a] p-8 overflow-hidden">
      
      {/* Floating background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-700 rounded-full opacity-20 blur-3xl -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl translate-x-32 translate-y-32"></div>

      {/* Notification Card Container */}
      <div className="relative z-10 w-full flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
          <FaBell /> Notifications
        </h2>

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh]">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`flex items-center justify-between border-l-4 p-4 rounded-xl backdrop-blur-lg bg-white/10 hover:bg-white/20 transition-shadow duration-300 shadow-lg hover:shadow-[0_0_25px] ${getColor(note.type)}`}
            >
              <div className="flex items-center gap-3">
                {getIcon(note.type)}
                <p className="text-white">{note.message}</p>
              </div>
              <span className="text-gray-300 text-sm">{note.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;

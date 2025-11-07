import React, { useState } from "react";
import { FaArrowRight, FaUserCircle, FaMoneyBillWave, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";

const SendMoney = () => {
  const [recipient,setRecipient]=useState("");
  const [amount,setAmount]=useState("");
  const [message,setMessage]=useState("");
  const [status,setStatus]=useState("");
  const [sending,setSending]=useState(false);
  const userId = localStorage.getItem("userId");

  const handleSend = async () => {
    if(!recipient || !amount){ setStatus("Please enter recipient and amount"); return;}
    setSending(true);
    try{
      await axios.post("http://localhost:5000/api/transactions",{
        userId,
        date: new Date().toISOString().slice(0,10),
        description: `Sent to ${recipient}`,
        type:"Debit",
        amount: parseFloat(amount)
      });
      setStatus("Transaction Successful ✅");
      setRecipient(""); setAmount(""); setMessage("");
    } catch(err){
      console.error(err);
      setStatus("Transaction Failed ❌");
    }
    setTimeout(()=>setSending(false),2200);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center relative bg-gradient-to-b from-[#1e0a3a] to-[#3a0a5a] overflow-hidden">
      {/* Background animation omitted for brevity */}
      <motion.div className="w-11/12 max-w-3xl p-10 rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white relative z-10" initial={{opacity:0, scale:0.95, y:-20}} animate={{opacity:1, scale:1, y:0}} transition={{duration:0.5}}>
        <motion.h2 className="text-4xl font-bold mb-8 text-center">Send Money</motion.h2>
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-white">Recipient Name</label>
          <div className="flex items-center bg-white/10 rounded-lg text-gray-900 px-3">
            <FaUserCircle className="text-gray-400 mr-2 text-xl"/>
            <input type="text" value={recipient} onChange={(e)=>setRecipient(e.target.value)} placeholder="Enter recipient name" className="w-full py-3 bg-transparent outline-none placeholder:text-white/50 text-white"/>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-white">Amount (₹)</label>
          <div className="flex items-center bg-white/10 rounded-lg text-gray-900 px-3">
            <FaMoneyBillWave className="text-gray-400 mr-2 text-xl"/>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount" className="w-full py-3 bg-transparent outline-none placeholder:text-white/50 text-white"/>
          </div>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-white">Message (optional)</label>
          <div className="flex items-center bg-white/10 rounded-lg text-gray-900 px-3">
            <FaEnvelope className="text-gray-400 mr-2 text-xl"/>
            <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Add a note" className="w-full py-3 bg-transparent outline-none placeholder:text-white/50 text-white"/>
          </div>
        </div>

        {status && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mb-6 text-center font-medium text-white">{status}</motion.p>}

        <motion.button whileHover={{scale:1.05, rotate:[0,2,-2,0]}} whileTap={{scale:0.95}} onClick={handleSend} className="w-full py-4 bg-green-500 hover:bg-green-600 rounded-xl font-bold flex justify-center items-center gap-4 transition text-lg">
          {sending ? "Sending..." : "Send"} <FaArrowRight/>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SendMoney;

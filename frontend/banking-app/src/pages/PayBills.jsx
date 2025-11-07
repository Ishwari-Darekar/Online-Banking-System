import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const billTypes = ["Electricity Bill","Water Bill","Mobile Recharge","DTH Recharge","Property Tax","Internet Bill","Gas Bill"];

const PayBills = () => {
  const [amounts, setAmounts] = useState({});
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
      const transactions = res.data;
      const totalIncome = transactions.filter(t=>t.type==="Credit").reduce((s,t)=>s+parseFloat(t.amount||0),0);
      const totalExpenses = transactions.filter(t=>t.type==="Debit").reduce((s,t)=>s+parseFloat(t.amount||0),0);
      setBalance(totalIncome - totalExpenses);
    } catch(err) { console.error(err); }
  };

  useEffect(()=>{ fetchBalance(); }, []);

  const handlePayBill = async (bill) => {
    const amount = parseFloat(amounts[bill]);
    if(!amount || amount <=0){ setStatus(`Enter valid amount for ${bill}`); return;}
    if(amount > balance){ setStatus("Insufficient balance!"); return; }

    try {
      await axios.post("http://localhost:5000/api/transactions",{
        userId,
        date: new Date().toISOString().slice(0,10),
        description: `Paid ${bill}`,
        type: "Debit",
        amount
      });
      setStatus(`${bill} Paid Successfully ✅`);
      setAmounts({...amounts,[bill]:""});
      fetchBalance();
    } catch(err){
      console.error(err);
      setStatus(`Payment Failed for ${bill} ❌`);
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-b from-[#1e0a3a] to-[#3a0a5a] text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pay Bills</h1>
        <button onClick={()=>navigate("/dashboard")} className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition">Back to Dashboard</button>
      </div>

      <p className="text-gray-200 text-lg mb-4">Current Balance: <span className="font-bold">₹{balance.toFixed(0)}</span></p>
      {status && <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}} className="mb-4 text-center font-medium text-green-400">{status}</motion.p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {billTypes.map(bill=>(
          <motion.div key={bill} className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex flex-col gap-3" whileHover={{scale:1.05}}>
            <h3 className="text-xl font-semibold">{bill}</h3>
            <input type="number" value={amounts[bill]||""} onChange={(e)=>setAmounts({...amounts,[bill]:e.target.value})} placeholder="Enter Amount" className="p-2 rounded-lg bg-white/20 placeholder:text-white/50 text-white outline-none"/>
            <button onClick={()=>handlePayBill(bill)} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg font-bold transition">Pay</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PayBills;

import React, { useState } from "react";
import axios from "axios";
import { FaSearch, FaArrowUp, FaArrowDown } from "react-icons/fa";

const Customer = () => {  // component name changed to Customer
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSearch = async () => {
    if (!search) return setMessage("Please enter User ID or Name");

    try {
      const res = await axios.get(`http://localhost:5000/api/emp/user/${search}`);
      console.log("Backend response:", res.data);
      if (res.data?.user) {
        setUser(res.data.user);
        setTransactions(res.data.transactions || []);
        setMessage("");
      } else {
        setUser(null);
        setTransactions([]);
        setMessage(res.data?.error || "No user found");
      }
    } catch (err) {
      console.error("Error fetching user:", err.response?.data || err.message);
      setUser(null);
      setTransactions([]);
      setMessage(err.response?.data?.error || "Error fetching user data");
    }
  };

  const handleTransaction = async (type) => {
    if (!amount || amount <= 0) return setMessage("Enter a valid amount");
    if (!user) return setMessage("Search a user first");

    try {
      const res = await axios.post("http://localhost:5000/api/emp/transaction", {
        userId: user.id,
        amount: parseFloat(amount),
        type,
      });
      setMessage(res.data?.message || `${type} successful`);
      setAmount("");
      handleSearch(); // Refresh transactions
    } catch (err) {
      console.error("Transaction error:", err.response?.data || err.message);
      setMessage(err.response?.data?.error || "Transaction failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white p-8">
      <div className="max-w-5xl mx-auto bg-white/10 p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Employee – Customer Service</h2>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter User ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 px-4 py-2 rounded-lg hover:scale-105 transition flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </div>

        {message && <p className="text-yellow-300 mb-4 text-center">{message}</p>}

        {user && (
          <div className="bg-white/10 p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Customer Details</h3>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>

            {/* Deposit / Withdraw */}
            <div className="mt-4 flex gap-4 items-center">
              <input
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={() => handleTransaction("Credit")}
                className="bg-green-500 px-4 py-2 rounded-lg hover:scale-105 transition flex items-center gap-2"
              >
                <FaArrowDown /> Deposit
              </button>
              <button
                onClick={() => handleTransaction("Debit")}
                className="bg-red-500 px-4 py-2 rounded-lg hover:scale-105 transition flex items-center gap-2"
              >
                <FaArrowUp /> Withdraw
              </button>
            </div>

            {/* Transactions */}
            <h3 className="text-xl font-bold mt-6 mb-2">Recent Transactions</h3>
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/30">
                  <th className="p-2">Date</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((t) => (
                    <tr key={t.id} className="border-b border-white/20">
                      <td className="p-2">{t.date}</td>
                      <td className="p-2">{t.description}</td>
                      <td className="p-2">{t.type}</td>
                      <td className="p-2">₹{t.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-2 text-center text-gray-300">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customer; // export as Customer

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaWallet, FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AddFunds from "./AddFunds"; // import the new component

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false); // modal state
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const fetchTransactions = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/transactions/${userId}`);
      setTransactions(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
    const interval = setInterval(fetchTransactions, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  const totalIncome = transactions
    .filter((t) => t.type === "Credit")
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "Debit")
    .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

  const balance = totalIncome - totalExpenses;

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      const tableColumn = ["Date", "Description", "Type", "Amount"];
      const tableRows = transactions.map((tx) => [
        tx.date,
        tx.description || "N/A",
        tx.type || "N/A",
        tx.amount || 0,
      ]);

      doc.setFontSize(18);
      doc.text("Account Statement", 14, 22);
      doc.setFontSize(12);

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 30,
      });

      doc.save("Account_Statement.pdf");
      setMessage("PDF downloaded successfully ✅");
    } catch (err) {
      console.error("PDF Download Error:", err);
      setMessage("Failed to download PDF ❌: " + err.message);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-gradient-to-b from-[#1e0a3a] to-[#3a0a5a] text-white overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAddFunds(true)} // open modal
            className="bg-purple-700 px-4 py-2 rounded-lg hover:bg-purple-800 transition"
          >
            Add Funds
          </button>
          <button
            onClick={() => navigate("/SendMoney")}
            className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Send Money
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-400 p-6 rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-4">
            <FaWallet className="text-4xl" />
            <div>
              <p className="text-gray-200">Balance</p>
              <p className="text-2xl font-bold">₹{!loading ? balance.toFixed(0) : "0"}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-green-400 to-green-500 p-6 rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-4">
            <FaArrowCircleUp className="text-4xl" />
            <div>
              <p className="text-gray-200">Income</p>
              <p className="text-2xl font-bold">₹{!loading ? totalIncome.toFixed(0) : "0"}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-r from-red-400 to-red-500 p-6 rounded-2xl shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-4">
            <FaArrowCircleDown className="text-4xl" />
            <div>
              <p className="text-gray-200">Expenses</p>
              <p className="text-2xl font-bold">₹{!loading ? totalExpenses.toFixed(0) : "0"}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/PayBills")}
            className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Pay Bills
          </button>
          <button
            onClick={() => navigate("/SendMoney")}
            className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Transfer
          </button>
          <button className="bg-pink-500 px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Request Money
          </button>
          <button
            onClick={downloadPDF}
            className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition"
          >
            Statements
          </button>
        </div>
        {message && <p className="mt-2 text-green-400 font-medium">{message}</p>}
      </div>

      {/* Recent Transactions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {!loading && transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-700 hover:bg-gray-800 transition"
                  >
                    <td className="px-4 py-2">{tx.date}</td>
                    <td className="px-4 py-2">{tx.description || "N/A"}</td>
                    <td
                      className={`px-4 py-2 font-semibold ${
                        tx.type === "Credit" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {tx.type || "N/A"}
                    </td>
                    <td className="px-4 py-2">₹{tx.amount || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-400 italic">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <AddFunds
          onClose={() => setShowAddFunds(false)}
          onTransactionAdded={fetchTransactions} // refresh after adding
        />
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import axios from "axios";

const AddFunds = ({ onClose, onTransactionAdded }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("Added Funds");
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/transactions", {
        userId,
        amount: parseFloat(amount),
        description,
        type: "Credit",
      });

      alert("Funds added successfully!");
      setAmount("");
      setDescription("Added Funds");

      if (onTransactionAdded) onTransactionAdded(); // refresh transactions in dashboard
      onClose(); // close modal
    } catch (err) {
      console.error("Error adding funds:", err);
      alert("Failed to add funds. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-purple-900 p-6 rounded-2xl w-96 shadow-lg relative">
        <h2 className="text-2xl font-bold mb-4 text-white">Add Funds</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-3 rounded-xl focus:outline-none text-black"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 rounded-xl focus:outline-none text-black"
          />

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded-xl hover:bg-gray-700 transition text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 px-4 py-2 rounded-xl hover:bg-green-600 transition text-white"
            >
              {loading ? "Adding..." : "Add Funds"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFunds;

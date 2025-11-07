const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET transactions for a specific user
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const sql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC";
  db.query(sql, [userId], (err, data) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(data);
  });
});

// POST new transaction for a specific user
router.post("/", (req, res) => {
  const { userId, date, description, type, amount } = req.body;

  if (!userId) return res.status(400).json({ error: "userId is required" });

  const transactionDate = date || new Date().toISOString().slice(0, 10);
  const transactionDescription = description || "N/A";
  const transactionType = type || "Credit";
  const transactionAmount = parseFloat(amount) || 0;

  const sql =
    "INSERT INTO transactions (user_id, date, description, type, amount) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [userId, transactionDate, transactionDescription, transactionType, transactionAmount],
    (err, result) => {
      if (err) {
        console.error("Error adding transaction:", err);
        return res.status(500).json({ error: "Failed to add transaction" });
      }
      res.json({ message: "Transaction added successfully", id: result.insertId });
    }
  );
});

module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../config/db"); // make sure this path is correct

//  Fetch user by ID, Name, or Email
router.get("/user/:search", (req, res) => {
  const search = req.params.search;
  console.log("Search param received:", search);  // <--- add this

  const query = `
  SELECT * FROM users 
  WHERE id = ? 
     OR LOWER(TRIM(name)) = LOWER(TRIM(?)) 
     OR LOWER(TRIM(email)) = LOWER(TRIM(?))
`;


  db.query(query, [search, search, search], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({
        error: "Database error",
        code: err.code,
        message: err.sqlMessage || err.message
      });
    }

    if (result.length === 0) return res.json({ user: null, transactions: [] });

    const user = result[0];

    db.query(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 5",
      [user.id],
      (err, transactions) => {
        if (err) {
          console.error("Transaction fetch error:", err);
          return res.status(500).json({
            error: "Transaction fetch error",
            code: err.code,
            message: err.sqlMessage || err.message
          });
        }
        res.json({ user, transactions });
      }
    );
  });
});

//  Perform deposit or withdraw
router.post("/transaction", (req, res) => {
  const { userId, amount, type } = req.body;

  if (!userId || !amount || !type)
    return res.status(400).json({
      success: false,
      error: "Missing fields",
      message: "userId, amount and type are required"
    });

  const desc = type === "Credit" ? "Manual Deposit" : "Manual Withdrawal";

  db.query(
    "INSERT INTO transactions (user_id, date, description, type, amount) VALUES (?, CURDATE(), ?, ?, ?)",
    [userId, desc, type, amount],
    (err) => {
      if (err) {
        console.error("Insert transaction error:", err);
        return res.status(500).json({
          success: false,
          error: "Insert transaction error",
          code: err.code,
          message: err.sqlMessage || err.message
        });
      }
      res.json({ success: true, message: `${type} successful` });
    }
  );
});

module.exports = router;

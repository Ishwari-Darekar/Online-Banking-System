const db = require("../config/db");
const bcrypt = require("bcrypt");

// Signup logic
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const profile = req.file ? req.file.filename : null; // profile image filename

  if (!profile || !name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into DB
    db.query(
      "INSERT INTO users (profile, name, email, password) VALUES (?, ?, ?, ?)",
      [profile, name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ msg: "DB error or user exists" });

        const userId = result.insertId;

        // Insert default Salary Credit transaction
        const sqlTransaction =
          "INSERT INTO transactions (user_id, date, description, type, amount) VALUES (?, ?, ?, ?, ?)";
        db.query(
          sqlTransaction,
          [userId, new Date().toISOString().slice(0, 10), "Salary Credit", "Credit", 5000],
          (err2) => {
            if (err2) console.error("Error adding default transaction:", err2);

            // Return user info after signup
            res.status(201).json({
              msg: "Signup successful",
              user: { id: userId, name, email, profile },
            });
          }
        );
      }
    );
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login logic
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ msg: "All fields are required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: "DB error" });
    if (results.length === 0) return res.status(400).json({ msg: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Incorrect password" });

    res.json({ msg: "Login successful", user: { id: user.id, name: user.name, email: user.email, profile: user.profile } });
  });
};

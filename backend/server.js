const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const empRoutes = require("./routes/empRoutes");


const path = require("path");
require("dotenv").config(); // load .env file
const apiKey = process.env.OPENAI_API_KEY;
const OpenAI = require("openai");





const app = express();



// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
 // frontend URL
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/emp", empRoutes); // <--- this was missing


//  Chatbot Route for Banking Queries
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  const { query } = req.body;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // lightweight + cost-efficient
      messages: [
        {
          role: "system",
          content: "You are a helpful banking assistant for India. \
Answer queries about Indian banking services, UPI, NEFT, RTGS, IMPS, IFSC, RBI guidelines, loan basics, and digital banking. \
Do not ask for account numbers, PINs, or personal data. Always remind users to contact their bank for confidential or account-specific issues."
        },
        { role: "user", content: query }
      ],
      max_tokens: 300,
      temperature: 0.4
    });

    res.json({ answer: completion.choices[0].message.content });
  } catch (error) {
    console.error("Chat API Error:", error);
    res.status(500).json({ answer: "Sorry, I couldn’t process that request right now." });
  }
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Test route
app.get("/test", (req, res) => {
  res.send("Server working");
});

// ✅ Analyze route (ONLY THIS LOGIC)
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  let mood = "Neutral";
  const lower = text.toLowerCase();

  if (lower.includes("happy") || lower.includes("good") || lower.includes("great"))
    mood = "Happy";
  else if (lower.includes("sad") || lower.includes("depressed") || lower.includes("down"))
    mood = "Sad";
  else if (lower.includes("stress") || lower.includes("tension") || lower.includes("anxious"))
    mood = "Stressed";
  else if (lower.includes("angry") || lower.includes("mad"))
    mood = "Angry";

  res.json({ mood });
});
// ✅ Server start
app.listen(7000, () => {
  console.log("Server running on port 7000");
});
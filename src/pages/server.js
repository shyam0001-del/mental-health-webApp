import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  // 🔥 simple dummy response (no AI yet)
  res.json({
    reply: "I hear you. Tell me more 🌿",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
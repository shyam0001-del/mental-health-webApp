import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Journal.css";

export default function Journal() {
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const handleSave = async () => {
  if (!content.trim()) {
    alert("Please write something");
    return;
  }

  try {
  const res = await fetch("http://localhost:7000/analyze", {
    
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ text: content }),
});
console.log("RESPONSE STATUS:", res.status);

    const data = await res.json();

console.log("FRONTEND DATA:", data);

const mood = data?.mood || "Unknown";

    const newEntry = {
      id: Date.now(),
      content,
      mood,
      date: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("journals")) || [];
    existing.push(newEntry);

    localStorage.setItem("journals", JSON.stringify(existing));

    alert(`Mood detected: ${mood}`);

    setContent("");

  } catch (err) {
    alert("AI failed, saving without mood");
  }
};

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">🧠 Daily Journal</h1>

        <p className="subtitle">
          Write what you feel… no one is judging you.
        </p>

        <textarea
          placeholder="Start writing your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea"
        />

       <button className="button" onClick={handleSave}>
  Save Entry
</button>
<button
  className="button"
  onClick={() => navigate("/history")}
  style={{ marginTop: "10px", background: "#10b981" }}
>
  View History
</button>
      </div>
    </div>
  );
}
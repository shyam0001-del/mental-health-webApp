import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function JournalHistory() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("journals")) || [];
    setJournals(data.reverse());
  }, []);
  const handleDelete = (id) => {
  const updated = journals.filter((j) => j.id !== id);
  setJournals(updated);
  localStorage.setItem("journals", JSON.stringify(updated));
};

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Journal History</h1>

      {journals.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        journals.map((entry) => (
    <div
    key={entry.id}
    onClick={() => navigate(`/journal/${entry.id}`)}
    style={{
      cursor: "pointer",
      background: "white",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      position: "relative"
    }}
  >
            <p><strong>{entry.date}</strong></p>
            <p>{entry.content.substring(0, 80)}...</p>
            <button
  onClick={(e) => {
    e.stopPropagation();   // VERY IMPORTANT
    handleDelete(entry.id);
  }}
  style={{
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 8px",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  Delete
</button>
          </div>
        ))
      )}
    </div>
  );
}
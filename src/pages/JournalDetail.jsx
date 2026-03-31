import { useParams } from "react-router-dom";

export default function JournalDetail() {
  const { id } = useParams();

  const journals = JSON.parse(localStorage.getItem("journals")) || [];
  const entry = journals.find((j) => j.id.toString() === id);

  if (!entry) return <p>Journal not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Journal Detail</h1>
      <p><strong>{entry.date}</strong></p>

      <div
        style={{
          marginTop: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <p>{entry.content}</p>
      </div>
    </div>
  );
}
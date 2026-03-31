import { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botReply = { role: "bot", text: data.reply };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Something went wrong 😔" },
      ]);
    }

    setInput("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={
              msg.role === "user" ? styles.userMsg : styles.botMsg
            }
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Say something..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#eef2ff",
  },

  chatBox: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  },

  userMsg: {
    alignSelf: "flex-end",
    background: "#667eea",
    color: "white",
    padding: "10px",
    borderRadius: "12px",
    margin: "6px",
    maxWidth: "60%",
  },

  botMsg: {
    alignSelf: "flex-start",
    background: "#ddd",
    padding: "10px",
    borderRadius: "12px",
    margin: "6px",
    maxWidth: "60%",
  },

  inputArea: {
    display: "flex",
    padding: "10px",
    background: "white",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    marginLeft: "10px",
    padding: "10px 16px",
    background: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
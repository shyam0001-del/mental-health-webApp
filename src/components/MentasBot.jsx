import { useState, useRef, useEffect } from "react";

export default function MentasBot() {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const chatRef = useRef(null);

  const [messages, setMessages] = useState([
    { text: "Hi, I'm MentAs 🤖\nHow are you feeling today?", bot: true }
  ]);

  const [input, setInput] = useState("");

  // 🔥 CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, bot: false };
    const botReply = getBotReply(input);

    setMessages([...messages, userMsg, botReply]);
    setInput("");
  };

  const getBotReply = (msg) => {
    const text = msg.toLowerCase();

    if (text.includes("sad") || text.includes("low"))
      return { text: "I'm here for you 💛 Try breathing exercise.", bot: true };

    if (text.includes("stress"))
      return { text: "Relax 🌿 Try a calming game.", bot: true };

    if (text.includes("happy"))
      return { text: "That’s wonderful! ✨ Keep smiling.", bot: true };

    return { text: "I'm listening… tell me more 💬", bot: true };
  };

  return (
    <>
      {/* 🔥 BUTTON */}
      <div
        style={{
          ...styles.button,
          transform: hover ? "scale(1.1)" : "scale(1)",
          boxShadow: hover
            ? "0 15px 40px rgba(255,165,0,0.6)"
            : "0 10px 25px rgba(255,165,0,0.4)",
        }}
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        💬

        {/* TOOLTIP */}
        {hover && !open && (
          <div style={styles.tooltip}>
            Hi, I’m your AI assistant 🤖
          </div>
        )}
      </div>

      {/* 🔥 CHAT BOX */}
      <div
        ref={chatRef}
        style={{
          ...styles.chatBox,
          transform: open ? "scale(1)" : "scale(0)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div style={styles.header}>MentAs 🤖</div>

        <div style={styles.messages}>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...(m.bot ? styles.msgBot : styles.msgUser),
                alignSelf: m.bot ? "flex-start" : "flex-end",
              }}
            >
              {m.text}
            </div>
          ))}
        </div>

        <div style={styles.inputRow}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your thoughts..."
            style={styles.input}
          />
          <button onClick={handleSend} style={styles.send}>
            ➤
          </button>
        </div>
      </div>
    </>
  );
}

const styles = {
  // 🔥 BUTTON
  button: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #facc15, #f97316)",
    color: "#333",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    cursor: "pointer",
    zIndex: 999,
    transition: "all 0.3s ease",
  },

  tooltip: {
  position: "absolute",
  right: "75px",
  bottom: "10px",

  background: "linear-gradient(135deg, #facc15, #f97316)",
  color: "#1f2937",

  padding: "10px 14px",
  borderRadius: "12px",

  fontSize: "13px",
  fontWeight: "500",
  lineHeight: "1.4",

  width: "180px",   // 🔥 makes it look like sentence box
  whiteSpace: "normal", // 🔥 allows wrapping

  boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
},

  // 🔥 CHAT BOX
  chatBox: {
    position: "fixed",
    bottom: "90px",
    right: "20px",
    width: "320px",
    height: "420px",
    background: "#ffffff",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    zIndex: 999,
    transformOrigin: "bottom right",
    transition: "all 0.3s ease",
  },

  header: {
    padding: "12px",
    background: "linear-gradient(135deg, #facc15, #f97316)",
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },

  messages: {
    flex: 1,
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    background: "#fff7ed",
  },

  msgBot: {
    padding: "10px",
    borderRadius: "12px",
    background: "#fff3cd",
    color: "#92400e",
    fontSize: "13px",
  },

  msgUser: {
    padding: "10px",
    borderRadius: "12px",
    background: "#f97316",
    color: "#fff",
    fontSize: "13px",
  },

  inputRow: {
    display: "flex",
    borderTop: "1px solid #fcd34d",
  },

  input: {
  flex: 1,
  border: "none",
  padding: "12px",
  outline: "none",

  fontSize: "14px",
  color: "#1f2937",        // 🔥 text color (dark professional)
  background: "transparent",

  caretColor: "#f97316",   // 🔥 cursor color (orange theme)
},

  send: {
    background: "#f97316",
    color: "white",
    border: "none",
    padding: "10px",
    cursor: "pointer",
  },
};
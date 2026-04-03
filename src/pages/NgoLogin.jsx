import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UserLogin() {
  const navigate = useNavigate();
  const [hoverImage, setHoverImage] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LEFT SIDE */}
        <div style={styles.left}>

          {/* 🔥 BACK BUTTON */}
          <button
            style={styles.backBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ffd580";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(0,0,0,0.08)";
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => navigate(-1)}
          >
            &lt;
          </button>

          <h1 style={styles.brand}>MindMitra</h1>

          <h2 style={styles.heading}>NGO Login</h2>
          <p style={styles.sub}>
            Securely access your dashboard and manage your impact
          </p>

          <input
            placeholder="Email address"
            style={styles.input}
            onFocus={(e) => (e.target.style.border = "1px solid #ffb347")}
            onBlur={(e) => (e.target.style.border = "1px solid rgba(0,0,0,0.08)")}
          />

          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            onFocus={(e) => (e.target.style.border = "1px solid #ffb347")}
            onBlur={(e) => (e.target.style.border = "1px solid rgba(0,0,0,0.08)")}
          />

          {/* 🔥 FIXED NAVIGATION */}
          <button
            style={{
              ...styles.button,
              transform: hoverBtn ? "scale(1.05)" : "scale(1)",
              boxShadow: hoverBtn
                ? "0 10px 25px rgba(244,201,93,0.5)"
                : "none",
            }}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            onClick={() => navigate("/ngo-dashboard")}  // ✅ FIXED HERE
          >
            Login →
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={styles.right}
          onMouseEnter={() => setHoverImage(true)}
          onMouseLeave={() => setHoverImage(false)}
        >
          <img
            src="/login-s.jpeg"
            alt="normal"
            style={{
              ...styles.image,
              opacity: hoverImage ? 0 : 1,
            }}
          />

          <img
            src="/login-h.png"
            alt="hover"
            style={{
              ...styles.image,
              position: "absolute",
              top: 0,
              left: 0,
              opacity: hoverImage ? 1 : 0,
            }}
          />
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  card: {
    display: "flex",
    width: "1000px",
    height: "600px",
    borderRadius: "25px",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
  },

  left: {
    flex: 1,
    padding: "55px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background:
      "linear-gradient(to bottom right, #fdf3c7, #f6c97a)",
  },

  backBtn: {
    alignSelf: "flex-start",
    marginBottom: "20px",
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.08)",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },

  right: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.4s ease",
  },

  brand: {
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#2c2c2c",
    marginBottom: "15px",
  },

  heading: {
    fontSize: "26px",
    fontWeight: "600",
    color: "#1f1f1f",
    marginBottom: "5px",
  },

  sub: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "25px",
    lineHeight: "1.5",
  },

  input: {
    padding: "14px",
    marginBottom: "12px",
    borderRadius: "25px",
    border: "1px solid rgba(0,0,0,0.08)",
    background: "#f9f9f9",
    outline: "none",
    fontSize: "14px",
    transition: "0.2s",
  },

  button: {
    marginTop: "10px",
    padding: "14px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #ffd580, #ffb347)",
    color: "#333",
    fontWeight: "600",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
import { useState, useEffect } from "react";

export default function ColorRelax() {
  const [bg, setBg] = useState("linear-gradient(135deg, #667eea, #764ba2)");
  const [ripples, setRipples] = useState([]);

  // 🔥 SAFE KEYFRAME INSERTION
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes rippleAnim {
        to {
          transform: translate(-50%, -50%) scale(15);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const colors = [
    "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    "linear-gradient(135deg, #fddb92, #d1fdff)",
    "linear-gradient(135deg, #89f7fe, #66a6ff)",
    "linear-gradient(135deg, #ffecd2, #fcb69f)",
    "linear-gradient(135deg, #cfd9df, #e2ebf0)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb)",
  ];

  const handleClick = (e) => {
    const random = colors[Math.floor(Math.random() * colors.length)];
    setBg(random);

    const newRipple = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  return (
    <div style={{ ...styles.page, background: bg }} onClick={handleClick}>
      
      {/* RIPPLE */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            ...styles.ripple,
            left: ripple.x,
            top: ripple.y,
          }}
        />
      ))}

      <div style={styles.card}>
        <h1 style={styles.title}>🎨 Color Relax</h1>

        <p style={styles.subtitle}>
          Tap anywhere to gently shift your mood
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background 1s ease",
    overflow: "hidden",
    position: "relative",
  },

  // 🔥 IMPROVED CARD
  card: {
    background: "rgba(255,255,255,0.92)",
    padding: "55px",
    borderRadius: "26px",
    textAlign: "center",
    width: "420px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
    zIndex: 2,
  },

  // 🔥 PROFESSIONAL TITLE
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#1e293b", // deep slate
    marginBottom: "10px",
    letterSpacing: "0.5px",
  },

  // 🔥 CALM SUBTEXT
  subtitle: {
    fontSize: "14px",
    color: "#64748b", // muted blue-gray
    lineHeight: "1.6",
  },

  ripple: {
    position: "absolute",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.6)",
    transform: "translate(-50%, -50%) scale(0)",
    animation: "rippleAnim 0.8s ease-out",
    pointerEvents: "none",
  },
};
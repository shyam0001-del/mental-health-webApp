import { useState, useEffect, useRef } from "react";

export default function WaterRipple() {
  const [ripples, setRipples] = useState([]);
  const soundRef = useRef(new Audio("/water.mp3"));

  // 🔥 KEYFRAMES (RIPPLE + WATER FLOW)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes ripple {
        0% {
          transform: translate(-50%, -50%) scale(0.3);
          opacity: 0.9;
        }
        100% {
          transform: translate(-50%, -50%) scale(12);
          opacity: 0;
        }
      }

      @keyframes waterFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const ripple1 = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now(),
      delay: "0s",
    };

    const ripple2 = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      id: Date.now() + 1,
      delay: "0.2s",
    };

    setRipples((prev) => [...prev, ripple1, ripple2]);

    // 🔊 sound
    try {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    } catch {}

    setTimeout(() => {
      setRipples((prev) =>
        prev.filter((r) => r.id !== ripple1.id && r.id !== ripple2.id)
      );
    }, 1400);
  };

  return (
    <div style={styles.page} onClick={handleClick}>
      
      {/* 🌊 Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            ...styles.ripple,
            left: ripple.x,
            top: ripple.y,
            animationDelay: ripple.delay,
          }}
        />
      ))}

      {/* 💬 UI */}
      <div style={styles.card}>
        <h1>🌊 Water Ripple</h1>
        <p>Tap anywhere and relax</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",

    // 🔥 MOVING WATER EFFECT
    background: "linear-gradient(270deg, #4facfe, #00f2fe, #43e97b, #38f9d7)",
    backgroundSize: "800% 800%",
    animation: "waterFlow 12s ease infinite",

    // OPTIONAL real image on top
    backgroundImage: "url('/water.jpg')",
    backgroundBlendMode: "overlay",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },

  card: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(255,255,255,0.2)",
    padding: "20px 30px",
    borderRadius: "20px",
    backdropFilter: "blur(10px)",
    color: "white",
    textAlign: "center",
  },

  ripple: {
    position: "absolute",
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.8)",
    boxShadow: "0 0 20px rgba(255,255,255,0.6)",
    transform: "translate(-50%, -50%) scale(0)",
    animation: "ripple 1.2s ease-out",
    pointerEvents: "none",
  },
};
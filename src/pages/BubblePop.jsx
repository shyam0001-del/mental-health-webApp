import { useState, useEffect, useRef } from "react";

export default function BubblePop() {
  const [bubbles, setBubbles] = useState([]);
  const [particles, setParticles] = useState([]);
  const [score, setScore] = useState(0);
  const soundRef = useRef(new Audio("/pop.mp3"));

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes floatUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-120vh); opacity: 0; }
      }

      @keyframes particleBurst {
        to {
          transform: translate(var(--x), var(--y));
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBubble = {
        id: Date.now(),
        left: Math.random() * 90,
        size: 40 + Math.random() * 50,
        duration: 6 + Math.random() * 4,
      };

      setBubbles((prev) => [...prev, newBubble]);

      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== newBubble.id));
      }, newBubble.duration * 1000);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  const popBubble = (bubble, e) => {
    setScore((prev) => prev + 1);

    try {
      soundRef.current.currentTime = 0;
      soundRef.current.play();
    } catch {}

    const burst = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: e.clientX,
      y: e.clientY,
      dx: `${Math.random() * 100 - 50}px`,
      dy: `${Math.random() * -100}px`,
    }));

    setParticles((prev) => [...prev, ...burst]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !burst.some((b) => b.id === p.id))
      );
    }, 600);

    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
  };

  return (
    <div style={styles.page}>

      {/* BUBBLES */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          style={{
            ...styles.bubble,
            left: `${bubble.left}%`,
            width: bubble.size,
            height: bubble.size,
            animationDuration: `${bubble.duration}s`,
          }}
          onClick={(e) => popBubble(bubble, e)}
        />
      ))}

      {/* PARTICLES */}
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            ...styles.particle,
            left: p.x,
            top: p.y,
            "--x": p.dx,
            "--y": p.dy,
          }}
        />
      ))}

      {/* UI CARD */}
      <div style={styles.card}>
        <h1 style={styles.title}>🫧 Bubble Pop</h1>

        <p style={styles.subtitle}>
          Tap bubbles and relax your mind
        </p>

        <div style={styles.scoreBox}>
          <span style={styles.scoreLabel}>Score</span>
          <span style={styles.score}>{score}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    position: "relative",
    background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
  },

  card: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(255,255,255,0.92)",
    padding: "22px 35px",
    borderRadius: "22px",
    backdropFilter: "blur(15px)",
    textAlign: "center",
    boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
  },

  // 🔥 FIXED TEXT COLORS
  title: {
    fontSize: "26px",
    fontWeight: "700",
    marginBottom: "6px",
    color: "#1e293b", // dark slate (professional)
  },

  subtitle: {
    fontSize: "13px",
    color: "#64748b", // soft grey-blue
    marginBottom: "15px",
  },

  scoreBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },

  scoreLabel: {
    fontSize: "14px",
    color: "#475569", // muted dark
  },

  score: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2563eb", // blue accent 🔥
  },

  bubble: {
    position: "absolute",
    bottom: "-100px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.35)",
    backdropFilter: "blur(10px)",
    boxShadow: "inset 0 0 12px rgba(255,255,255,0.9)",
    cursor: "pointer",
    animation: "floatUp linear forwards",
  },

  particle: {
    position: "absolute",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#ffffff",
    animation: "particleBurst 0.6s ease-out forwards",
    pointerEvents: "none",
  },
};
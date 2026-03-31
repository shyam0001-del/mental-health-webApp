import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MoreGames() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const games = [
    { title: "Zen Tap", emoji: "🌿", path: "/zen" },
    { title: "Memory Match", emoji: "🧠", path: null },
    { title: "Bubble Pop", emoji: "🫧", path: null },
    { title: "Gradient Flow", emoji: "🌈", path: null },
    { title: "Sound Relax", emoji: "🎧", path: null },
    { title: "Focus Timer", emoji: "⏳", path: null },
    { title: "Pattern Trace", emoji: "🧩", path: null },
    { title: "Target Calm", emoji: "🎯", path: null },
    { title: "Breathing Advanced", emoji: "🧘", path: null },
    { title: "Rhythm Tap", emoji: "🎵", path: null },
    { title: "Star Drift", emoji: "🌌", path: null },
    { title: "Particles Flow", emoji: "🍃", path: null },
  ];

  return (
    <div style={styles.page}>
      
      {/* BACKGROUND */}
      <div style={styles.bg}></div>

      {/* OVERLAY */}
      <div style={styles.overlay}></div>

      <div style={styles.container}>
        <h1 style={styles.title}>🎮 More Games</h1>
        <p style={styles.subtitle}>Explore more relaxing experiences</p>

        <div style={styles.grid}>
          {games.map((game, index) => {
            const isHovered = hovered === index;

            return (
              <div
                key={index}
                style={{
                  ...styles.card,
                  transform: `
                    ${show ? "translateY(0)" : "translateY(50px)"}
                    scale(${isHovered ? 1.08 : 1})
                  `,
                  opacity: show ? 1 : 0,
                  transition: `
                    transform 0.3s ease,
                    opacity 0.5s ease ${index * 0.08}s
                  `,
                }}
                onClick={() => game.path && navigate(game.path)}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={styles.emoji}>{game.emoji}</div>
                <h3>{game.title}</h3>

                {!game.path && (
                  <p style={styles.coming}>Coming Soon</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  bg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundImage: "url('/color.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },

  container: {
    textAlign: "center",
    width: "1000px",
    position: "relative",
    zIndex: 2,
  },

  title: {
    fontSize: "36px",
    color: "white",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#ddd",
    marginBottom: "30px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px",
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "18px",
    cursor: "pointer",
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
    color: "white",

    // 🔥 PERFORMANCE BOOST
    willChange: "transform",
  },

  emoji: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  coming: {
    fontSize: "12px",
    color: "#ccc",
    marginTop: "5px",
  },
};
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Games() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [opening, setOpening] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false); // 🔥 NEW

  // FLOAT ANIMATION
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleOpenLogin = () => {
    setOpening(true);
    setTimeout(() => navigate("/login"), 600);
  };

  const games = [
    { label: "🧘", path: "/game" },
    { label: "💥", path: "/click" },
    { label: "🎨", path: "/color" },
    { label: "🎵", path: null },
    { label: "🌿", path: null },
    { label: "✨", path: null },
    { label: "🌊", path: null },
    { label: "🌌", path: null },
    { label: "🎯", path: "/more" },
    { label: "🌊", path: "/ripple" },
    { label: "🫧", path: "/bubble" },
  ];

  return (
    <div
      style={{
        ...styles.page,
        transform: opening ? "scale(1.05)" : "scale(1)",
        filter: opening ? "blur(4px)" : "blur(0px)",
        transition: "all 0.6s ease",
      }}
    >
      <div style={styles.overlay}></div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.textSection}>
          <h1 style={styles.title}>
            Your Calm Starts Here <br />
            <span style={styles.highlight}>
              Relax • Reflect • Recharge
            </span>
          </h1>

          <p style={styles.subtitle}>
            Breathe. Play. Calm your thoughts with mindful activities.
          </p>

          {/* 🔥 PREMIUM BUTTON */}
          <button
            style={{
              ...styles.startBtn,
              transform: hoverBtn
                ? "translateY(-4px) scale(1.06)"
                : "translateY(0px)",
              boxShadow: hoverBtn
                ? "0 18px 40px rgba(255, 180, 80, 0.6)"
                : "0 6px 18px rgba(0,0,0,0.2)",
              background: hoverBtn
                ? "linear-gradient(135deg, #ffe09a, #ffc76b)"
                : "linear-gradient(135deg, #ffd580, #ffb347)",
              letterSpacing: hoverBtn ? "0.6px" : "0px",
            }}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
            onClick={() => navigate("/relax")}
          >
            Start Relaxing →
          </button>
        </div>

        {/* FLOAT IMAGE */}
        <img
          src="/Meditation.png"
          alt="meditation"
          style={{
            ...styles.image,
            transform: opening
              ? "scale(1.2) translateY(-15px)"
              : "scale(1)",
            transition: "transform 0.6s ease",
          }}
          onClick={handleOpenLogin}
        />
      </div>

      {/* ARC */}
      <div
        style={{
          ...styles.arcContainer,
          transform: `translateX(-50%) rotate(${rotation}deg)`,
        }}
      >
        {games.map((game, index) => {
          const total = games.length;
          const startAngle = -130;
          const endAngle = 40;

          const angle =
            startAngle + (index * (endAngle - startAngle)) / (total - 1);

          const isHovered = hovered === index;

          return (
            <div
              key={index}
              style={{
                ...styles.arcItem,
                transform: `
                  rotate(${angle}deg)
                  translate(170px)
                  rotate(${-angle}deg)
                  scale(${isHovered ? 1.4 : 1})
                `,
                zIndex: isHovered ? 10 : 1,
              }}
              onMouseEnter={() => {
                setHovered(index);
                setRotation(-index * 5);
              }}
              onMouseLeave={() => setHovered(null)}
              onClick={() => game.path && navigate(game.path)}
            >
              <div style={styles.icon}>{game.label}</div>
            </div>
          );
        })}
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
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "80px",
    color: "white",
    position: "relative",
    zIndex: 2,
  },

  textSection: {
    maxWidth: "500px",
  },

  // 🔥 PROFESSIONAL TITLE
  title: {
    fontSize: "52px",
    fontWeight: "700",
    lineHeight: "1.2",
    letterSpacing: "1px",
    textShadow: "0 5px 25px rgba(0,0,0,0.6)",
  },

  highlight: {
    background: "linear-gradient(90deg, #ffd580, #ffb347)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "800",
  },

  subtitle: {
    marginTop: "20px",
    color: "rgba(255,255,255,0.9)",
  },

  // 🔥 BUTTON STYLE
  startBtn: {
    marginTop: "30px",
    padding: "15px 30px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #ffd580, #ffb347)",
    color: "#333",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  image: {
    width: "350px",
    animation: "float 6s ease-in-out infinite",
    cursor: "pointer",
  },

  arcContainer: {
    position: "absolute",
    bottom: "-100px",
    left: "50%",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    transition: "transform 0.4s ease",
    zIndex: 2,
  },

  arcItem: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transformOrigin: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },

  icon: {
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "22px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
  },
};
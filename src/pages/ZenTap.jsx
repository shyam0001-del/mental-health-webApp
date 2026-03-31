import { useState, useEffect } from "react";

export default function ZenTap() {
  const [leaves, setLeaves] = useState([]);
  const [score, setScore] = useState(0);

  // generate leaves
  useEffect(() => {
    const interval = setInterval(() => {
      const newLeaf = {
        id: Date.now(),
        left: Math.random() * 100,
        size: 30 + Math.random() * 20,
      };

      setLeaves((prev) => [...prev, newLeaf]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // remove leaves automatically after falling
  useEffect(() => {
    const cleanup = setInterval(() => {
      setLeaves((prev) => prev.slice(-10)); // keep max 10 leaves
    }, 3000);

    return () => clearInterval(cleanup);
  }, []);

  const handleTap = (id) => {
    setLeaves((prev) => prev.filter((leaf) => leaf.id !== id));
    setScore((prev) => prev + 1);
  };

  return (
    <div style={styles.page}>
      <div style={styles.score}>🌿 Score: {score}</div>

      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          onClick={() => handleTap(leaf.id)}
          style={{
            ...styles.leaf,
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #a8edea, #fed6e3)",
    overflow: "hidden",
    position: "relative",
  },

  score: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "20px",
    fontWeight: "bold",
    zIndex: 2,
  },

  leaf: {
    position: "absolute",
    top: "-50px",
    borderRadius: "50%",
    background: "radial-gradient(circle, #4caf50, #2e7d32)",
    cursor: "pointer",
    animationName: "fall",
    animationTimingFunction: "linear",
  },
};

// 🌿 FALL ANIMATION
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes fall {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(110vh);
  }
}`, styleSheet.cssRules.length);
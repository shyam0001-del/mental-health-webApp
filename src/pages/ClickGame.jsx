import { useState, useEffect, useRef } from "react";

export default function ClickGame() {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState(false);

  const clickSound = useRef(new Audio("/fahh.mp3"));

  useEffect(() => {
    const saved = localStorage.getItem("highScore");
    if (saved) setHighScore(Number(saved));
  }, []);

  useEffect(() => {
    if (!running || timeLeft === 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, running]);

  useEffect(() => {
    if (timeLeft === 0 && running) {
      setRunning(false);

      if (count > highScore) {
        setHighScore(count);
        localStorage.setItem("highScore", count);
      }
    }
  }, [timeLeft, running]);

  const startGame = () => {
    setCount(0);
    setTimeLeft(30);
    setRunning(true);
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h1 style={styles.title}>💥 Stress Click Game</h1>

        <p style={styles.highScore}>
          🏆 High Score: <span style={styles.highlight}>{highScore}</span>
        </p>

        <p style={styles.timer}>⏱ {timeLeft}s</p>

        {!running && timeLeft > 0 && (
          <button style={styles.startBtn} onClick={startGame}>
            Start Game
          </button>
        )}

        {running && (
          <>
            <h2 style={styles.score}>{count}</h2>

            <button
              style={{
                ...styles.clickBtn,
                transform: clicked ? "scale(0.92)" : "scale(1)",
              }}
              onClick={() => {
                setCount(count + 1);
                setClicked(true);

                clickSound.current.currentTime = 0;
                clickSound.current.play();

                setTimeout(() => setClicked(false), 100);
              }}
            >
              Tap Fast!
            </button>
          </>
        )}

        {!running && timeLeft === 0 && (
          <>
            <p style={styles.result}>
              🎉 You clicked <span style={styles.highlight}>{count}</span> times!
            </p>

            <button style={styles.startBtn} onClick={startGame}>
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  // 🔥 BACKGROUND FIX
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundImage: "url('/click.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.55)", // 🔥 contrast fix
  },

  card: {
    position: "relative",
    zIndex: 2,
    background: "rgba(0,0,0,0.35)", // 🔥 dark glass
    backdropFilter: "blur(15px)",
    padding: "50px",
    borderRadius: "24px",
    textAlign: "center",
    width: "400px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },

  // 🔥 TEXT (VISIBLE NOW)
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "8px",
  },

  highScore: {
    fontSize: "14px",
    color: "#e2e8f0",
    marginBottom: "10px",
  },

  timer: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#f1f5f9",
    marginBottom: "20px",
  },

  score: {
    fontSize: "44px",
    fontWeight: "700",
    color: "#ffd580",
    marginBottom: "20px",
  },

  result: {
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#f1f5f9",
  },

  highlight: {
    color: "#ffd580",
    fontWeight: "700",
  },

  startBtn: {
    padding: "12px 22px",
    borderRadius: "25px",
    border: "none",
    background: "linear-gradient(135deg, #ff6a6a, #ff4d4d)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
  },

  clickBtn: {
    padding: "20px",
    fontSize: "18px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #ff4d4d, #ff2e2e)",
    color: "white",
    cursor: "pointer",
  },
};
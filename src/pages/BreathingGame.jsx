import { useState, useEffect } from "react";

export default function BreathingGame() {
  const [phase, setPhase] = useState("Inhale");
  const [timeLeft, setTimeLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setPhase((prev) =>
        prev === "Inhale" ? "Hold" : prev === "Hold" ? "Exhale" : "Inhale"
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (!running) return;

    const speak = (text) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    };

    if (phase === "Inhale") speak("Inhale slowly");
    else if (phase === "Hold") speak("Hold your breath");
    else if (phase === "Exhale") speak("Exhale gently");
  }, [phase, running]);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, running]);

  useEffect(() => {
    if (timeLeft === 0 && running) {
      setRunning(false);
      setPhase("Done ✅");
      speechSynthesis.cancel();
    }
  }, [timeLeft, running]);

  const startSession = (seconds) => {
    setTimeLeft(seconds);
    setTotalTime(seconds);
    setRunning(true);
    setPhase("Inhale");
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = totalTime ? timeLeft / totalTime : 0;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>🧘 Breathing Exercise</h1>

          {running && (
            <div style={styles.timerBadge}>
              ⏱ {timeLeft}s
            </div>
          )}
        </div>

        <hr style={styles.divider} />

        {!running && (
          <p style={styles.subtitle}>
            Slow down, breathe deeply, and bring your mind to calm.
          </p>
        )}

        {!running && (
          <div style={styles.buttonGroup}>
            <button style={styles.timeBtn} onClick={() => startSession(60)}>
              1 min
            </button>
            <button style={styles.timeBtn} onClick={() => startSession(180)}>
              3 min
            </button>
            <button style={styles.timeBtn} onClick={() => startSession(300)}>
              5 min
            </button>
          </div>
        )}

        <div style={styles.circleWrapper}>
          <svg width="200" height="200">
            <circle cx="100" cy="100" r={radius} stroke="#eee" strokeWidth="10" fill="none" />

            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#6a5acd"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>

          <div
            style={{
              ...styles.circle,
              transform: `
                translate(-50%, -50%)
                ${
                  phase === "Inhale"
                    ? "scale(1.2)"
                    : phase === "Exhale"
                    ? "scale(1)"
                    : "scale(1.1)"
                }
              `,
            }}
          >
            {phase}
          </div>
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
    backgroundImage: "url('/breathing.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.45)",
  },

  card: {
    position: "relative",
    zIndex: 2,
    background: "rgba(255,255,255,0.96)",
    padding: "45px 55px",
    borderRadius: "26px",
    textAlign: "center",
    width: "460px",
    boxShadow: "0 25px 70px rgba(0,0,0,0.3)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#222",
    letterSpacing: "0.5px",
  },

  timerBadge: {
    background: "linear-gradient(135deg, #6a5acd, #836fff)",
    color: "white",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },

  divider: {
    border: "none",
    height: "1px",
    background: "#eee",
    margin: "15px 0 20px",
  },

  subtitle: {
    color: "#666",
    marginBottom: "30px",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "30px",
  },

  timeBtn: {
    padding: "12px 20px",
    borderRadius: "30px",
    border: "none",
    background: "linear-gradient(135deg, #6a5acd, #836fff)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  circleWrapper: {
    position: "relative",
    width: "200px",
    height: "200px",
    margin: "auto",
  },

  circle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6a5acd, #836fff)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    fontWeight: "600",
    transition: "all 4s ease-in-out",
    boxShadow: "0 0 25px rgba(106,90,205,0.4)",
  },
};
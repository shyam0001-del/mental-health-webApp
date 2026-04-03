import { users } from "../data/mockData";
import { useState } from "react";

export default function NgoDashboard() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const highRisk = users.filter(
    (u) => u.mood === "sad" || u.mood === "stress"
  );

  const moodCount = {
    happy: users.filter((u) => u.mood === "happy").length,
    calm: users.filter((u) => u.mood === "calm").length,
    sad: users.filter((u) => u.mood === "sad").length,
    stress: users.filter((u) => u.mood === "stress").length,
  };

  const max = Math.max(...Object.values(moodCount));

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>NGO Dashboard</h1>
        <p style={styles.sub}>Monitor user wellbeing and take action</p>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Users</p>
          <h2 style={styles.statValue}>{users.length}</h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>High Risk</p>
          <h2 style={{ ...styles.statValue, color: "#dc2626" }}>
            {highRisk.length}
          </h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Active Now</p>
          <h2 style={styles.statValue}>12</h2>
        </div>
      </div>

      {/* ANALYTICS */}
      <div style={styles.analyticsCard}>
        <h2 style={styles.sectionTitle}>Mood Insights</h2>

        {Object.entries(moodCount).map(([key, value]) => (
          <div key={key} style={styles.barRow}>
            <span style={styles.barLabel}>{key}</span>

            <div style={styles.barTrack}>
              <div
                style={{
                  ...styles.barFill,
                  width: `${(value / max) * 100}%`,
                  background:
                    key === "happy"
                      ? "#22c55e"
                      : key === "calm"
                      ? "#38bdf8"
                      : "#f97316",
                }}
              />
            </div>

            <span style={styles.barValue}>{value}</span>
          </div>
        ))}
      </div>

      {/* USER LIST */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>User Activity</h2>

        {users.map((u, i) => {
          const isRisk = u.mood === "sad" || u.mood === "stress";

          return (
            <div
              key={i}
              style={{
                ...styles.userCard,
                transform: activeIndex === i ? "scale(1.03)" : "scale(1)",
                boxShadow:
                  activeIndex === i
                    ? "0 15px 40px rgba(249,115,22,0.35)"
                    : "0 6px 20px rgba(0,0,0,0.08)",
                border:
                  activeIndex === i
                    ? "1px solid #f97316"
                    : "1px solid rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => {
                if (activeIndex !== i)
                  e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                if (activeIndex !== i)
                  e.currentTarget.style.transform = "translateY(0px)";
              }}
              onClick={() => {
                setSelectedUser(u);
                setActiveIndex(i);
              }}
            >
              <div>
                <h3 style={styles.userName}>{u.name}</h3>
                <p style={styles.userTime}>{u.last}</p>
              </div>

              <div style={styles.rightSection}>
                <span style={styles.mood}>{u.mood}</span>
                {isRisk && <span style={styles.alert}>⚠</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP */}
      {selectedUser && (
        <div style={styles.overlay} onClick={() => setSelectedUser(null)}>
          <div style={styles.popup} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.popupTitle}>{selectedUser.name}</h2>

            <p style={styles.popupText}>
              <strong>Mood:</strong> {selectedUser.mood}
            </p>

            <p style={styles.popupText}>
              <strong>Risk:</strong>{" "}
              <span style={styles.riskText}>{selectedUser.risk}</span>
            </p>

            <div style={styles.journalBox}>
              <strong style={styles.journalHeading}>Journal Entry</strong>

              <p style={styles.journalText}>
                {selectedUser.journal || "No journal entry available"}
              </p>
            </div>

            <button
              style={styles.closeBtn}
              onClick={() => setSelectedUser(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
    color: "#1f2937", // 🔥 global text fix
    fontFamily: "Inter, sans-serif",
  },

  header: { marginBottom: "30px" },

  title: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#7c2d12",
  },

  sub: {
    color: "#6b7280",
    fontSize: "14px",
  },

  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    flex: 1,
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  statLabel: {
    fontSize: "13px",
    color: "#6b7280",
  },

  statValue: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1f2937",
  },

  analyticsCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "30px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  barRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
  },

  barLabel: {
    width: "70px",
    textTransform: "capitalize",
    color: "#374151",
  },

  barTrack: {
    flex: 1,
    height: "10px",
    background: "#eee",
    borderRadius: "10px",
    margin: "0 10px",
  },

  barFill: {
    height: "100%",
    borderRadius: "10px",
    transition: "0.4s",
  },

  barValue: {
    width: "30px",
    fontWeight: "600",
    color: "#374151",
  },

  section: { marginTop: "20px" },

  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    color: "#7c2d12",
    fontWeight: "600",
  },

  userCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    padding: "15px 20px",
    borderRadius: "14px",
    marginBottom: "10px",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },

  userName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },

  userTime: {
    fontSize: "12px",
    color: "#9ca3af",
  },

  rightSection: { display: "flex", gap: "10px" },

  mood: {
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    background: "#fde68a",
    color: "#92400e",
    fontWeight: "600",
  },

  alert: {
    color: "#dc2626",
    fontWeight: "bold",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },

  popup: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "16px",
    width: "350px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
  },

  popupTitle: {
    marginBottom: "10px",
    color: "#7c2d12",
  },

  popupText: {
    fontSize: "14px",
    color: "#374151",
  },

  riskText: {
    fontWeight: "600",
    color: "#f97316",
  },

  journalBox: {
    background: "#fff7ed",
    padding: "14px",
    borderRadius: "10px",
    marginTop: "12px",
  },

  journalHeading: {
    color: "#9a3412",
    fontSize: "13px",
  },

  journalText: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#1f2937",
    lineHeight: "1.6",
  },

  closeBtn: {
    marginTop: "15px",
    padding: "10px",
    borderRadius: "10px",
    background: "#ffd580",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    color: "#1f2937",
  },
};
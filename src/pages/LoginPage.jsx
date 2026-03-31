import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [hoverImage, setHoverImage] = useState(false);

  const roles = [
    {
      title: "User",
      desc1: "Track your mental wellness",
      desc2: "Play calming activities & journal",
      icon: "🧘",
      path: "/user-login",
    },
    {
      title: "NGO",
      desc1: "Support people in need",
      desc2: "Manage programs & outreach",
      icon: "🤝",
      path: "/ngo-login",
    },
    {
      title: "Specialist",
      desc1: "Provide professional help",
      desc2: "Guide users & analyze insights",
      icon: "🧠",
      path: "/specialist-login",
    },
    {
      title: "Home",
      desc1: "Go back to main page",
      desc2: "Explore relaxing activities",
      icon: "🏠",
      path: "/games",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* LEFT */}
        <div style={styles.left}>

          {/* 🔥 MODERN BACK BUTTON */}
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

          <h2 style={styles.heading}>Choose Your Role</h2>

          <p style={styles.sub}>
            Select how you want to continue your journey
          </p>

          {/* GRID */}
          <div style={styles.grid}>
            {roles.map((role, i) => (
              <div
                key={i}
                style={styles.roleCard}
                onClick={() => navigate(role.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-4px) scale(1.04)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 35px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.15)";
                }}
              >
                <div style={styles.icon}>{role.icon}</div>
                <h3 style={styles.roleTitle}>{role.title}</h3>
                <p style={styles.desc}>{role.desc1}</p>
                <p style={styles.desc}>{role.desc2}</p>
              </div>
            ))}
          </div>

          {/* FOOTER */}
          <div style={styles.centerBlock}>
            <p style={styles.footer}>
              Already have an account?{" "}
              <span
                style={styles.link}
                onClick={() => navigate("/signin")}
              >
                Sign in
              </span>
            </p>

            <p style={styles.terms}>
              By continuing, you agree to our Terms & Conditions
            </p>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div
          style={styles.right}
          onMouseEnter={() => setHoverImage(true)}
          onMouseLeave={() => setHoverImage(false)}
        >
          <img
            src="/login-side.jpg"
            alt="team"
            style={{
              ...styles.image,
              opacity: hoverImage ? 0 : 1,
            }}
          />

          <img
            src="/login-hover.jpg"
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
    boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
    background: "#ffffff",
  },

  left: {
    flex: 1,
    padding: "45px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background:
      "linear-gradient(to bottom right, #fdf2c4, #f5c16c)",
  },

  // 🔥 UPDATED BACK BUTTON STYLE
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

  brand: {
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1px",
    color: "#2c2c2c",
    marginBottom: "12px",
  },

  heading: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#222",
  },

  sub: {
    fontSize: "14px",
    marginBottom: "25px",
    color: "#555",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  roleCard: {
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.9)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  icon: {
    fontSize: "28px",
    marginBottom: "10px",
  },

  roleTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#222",
  },

  desc: {
    fontSize: "12px",
    color: "#555",
  },

  right: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 0.4s ease",
  },

  centerBlock: {
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
  },

  footer: {
    fontSize: "13px",
    color: "#333",
  },

  link: {
    color: "#d97706",
    cursor: "pointer",
    fontWeight: "600",
  },

  terms: {
    marginTop: "8px",
    fontSize: "12px",
    color: "#777",
  },
};
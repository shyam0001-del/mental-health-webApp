import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function RelaxVideo() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const startSound = () => {
    const video = videoRef.current;
    video.muted = false;
    video.play();
  };

  const handleEnd = () => {
    navigate("/games"); // 🔥 go back after video ends
  };

  return (
    <div style={styles.page} onClick={startSound}>
      <video
        ref={videoRef}
        src="/relax.mp4"
        autoPlay
        muted
        onEnded={handleEnd}  // 🔥 THIS IS KEY
        style={styles.video}
      />

      <div style={styles.overlay}>
        <h1 style={styles.text}>
        </h1>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    position: "relative",
    cursor: "pointer",
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(0,0,0,0.3)",
  },

  text: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "600",
  },
};
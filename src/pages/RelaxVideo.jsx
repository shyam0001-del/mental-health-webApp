import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function RelaxVideo() {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    // when video ends → go back
    video.onended = () => {
      navigate("/games");
    };
  }, []);

  return (
    <div style={styles.page}>
      <video
        ref={videoRef}
        src="/relax.mp4"   // 👉 put file in public folder
        autoPlay
        muted
        style={styles.video}
      />
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "black",
  },

  video: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};
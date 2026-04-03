import MoreGames from "./pages/MoreGames";
import ColorRelax from "./pages/ColorRelax";
import ClickGame from "./pages/ClickGame";
import Games from "./pages/Games";
import BreathingGame from "./pages/BreathingGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Journal from "./pages/Journal";
import JournalHistory from "./pages/JournalHistory";
import JournalDetail from "./pages/JournalDetail";
import ZenTap from "./pages/ZenTap";
import BubblePop from "./pages/BubblePop";
import RelaxVideo from "./pages/RelaxVideo";
import ChatBot from "./pages/ChatBot";
import LoginPage from "./pages/LoginPage";
import WaterRipple from "./pages/WaterRipple";
import NgoLogin from "./pages/NgoLogin";
import UserLogin from "./pages/UserLogin";
import SpecialistLogin from "./pages/SpecialistLogin";
import SignInPage from "./pages/SignInPage";
import NgoDashboard from "./pages/NgoDashboard";

// 🔥 AI BOT
import MentasBot from "./components/MentasBot";

function App() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Games />} />
<Route path="/journal" element={<Journal />} />
          <Route path="/chat" element={<ChatBot />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/history" element={<JournalHistory />} />
          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          <Route path="/ngo-login" element={<NgoLogin />} />
          <Route path="/journal/:id" element={<JournalDetail />} />
          <Route path="/specialist-login" element={<SpecialistLogin />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/relax" element={<RelaxVideo />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/game" element={<BreathingGame />} />
          <Route path="/games" element={<Games />} />
          <Route path="/click" element={<ClickGame />} />
          <Route path="/more" element={<MoreGames />} />
          <Route path="/zen" element={<ZenTap />} />
          <Route path="/color" element={<ColorRelax />} />
          <Route path="/bubble" element={<BubblePop />} />
          <Route path="/ripple" element={<WaterRipple />} />
        </Routes>

        {/* 🔥 GLOBAL AI ASSISTANT */}
        <MentasBot />
      </>
    </BrowserRouter>
  );
}

export default App;
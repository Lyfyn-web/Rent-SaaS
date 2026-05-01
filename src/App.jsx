import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthPopup from "./components/AuthPopup";
import Home from "./pages/Home";
import MasterPage from "./pages/MasterPage";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return null;
}

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuthPopup = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  // Listen for global requests to open the auth popup (e.g. from Sidebar)
  useEffect(() => {
    const handler = (e) => {
      const mode = e?.detail?.mode || "login";
      openAuthPopup(mode);
    };

    window.addEventListener("open-auth", handler);
    return () => window.removeEventListener("open-auth", handler);
  }, []);

  return (
    <>
      <ScrollToHash />
      <AuthPopup
        key={authMode}
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/*" element={<MasterPage />} />
      </Routes>
    </>
  );
}

export default App;

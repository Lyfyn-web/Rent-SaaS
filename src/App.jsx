import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AuthPopup from "./components/AuthPopup";
import Home from "./pages/Home";

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

  return (
    <>
      <ScrollToHash />
      <Navbar
        onSignIn={() => openAuthPopup("login")}
        onSignUp={() => openAuthPopup("register")}
      />
      <AuthPopup
        key={authMode}
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
      />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;

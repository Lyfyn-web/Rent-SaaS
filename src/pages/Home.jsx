import React, { useState } from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Footer from "../components/Footer";
import Services from "../sections/Services";
import Navbar from "../components/Navbar";

function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuthPopup = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <Navbar
        onSignIn={() => openAuthPopup("login")}
        onSignUp={() => openAuthPopup("register")}
      />
      <div className="bg-white min-h-screen">
        <section id="home" className="scroll-mt-8">
          <Hero />
        </section>
        <section id="about" className="scroll-mt-8">
          <About />
        </section>
        <section id="services" className="scroll-mt-8">
          <Services />
        </section>
        <section id="contact" className="scroll-mt-8">
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Home;

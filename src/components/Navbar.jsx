import React from "react";

function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2 rounded-lg border border-cyan-700/60 bg-cyan-900/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-white text-xl font-bold sm:text-2xl">Rent SaaS</h1>
        <nav className="flex items-center gap-4 sm:gap-6">
          <>
            <div className="flex items-center justify-between gap-4">
              <nav className="flex items-center gap-4 sm:gap-6">
                <a
                  href="/"
                  className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
                >
                  About
                </a>
                <a
                  href="/services"
                  className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
                >
                  Services
                </a>
                <a
                  href="/contact"
                  className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
                >
                  Contact
                </a>
              </nav>
            </div>
          </>
        </nav>
        <button className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-400 sm:px-5 sm:text-base">
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Navbar;

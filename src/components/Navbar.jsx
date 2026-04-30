import React from "react";
import PropTypes from "prop-types";
import { UserButton } from "@clerk/clerk-react";
import { useAuth } from "../contexts/authContext";

function Navbar({ onSignIn, onSignUp }) {
  const { isLoggedIn, user, logout } = useAuth();
  const username = typeof user === "object" && user?.name ? user.name : "User";
  const avatarSeed = encodeURIComponent(
    user?.email || user?.id || user?.name || "guest-user",
  );
  const avatarSrc =
    user?.authProvider === "clerk" && user?.avatarUrl
      ? user.avatarUrl
      : `https://picsum.photos/seed/${avatarSeed}/72/72`;

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[92%] max-w-6xl -translate-x-1/2 rounded-lg border border-cyan-700/60 bg-cyan-900/90 px-4 py-3 shadow-xl backdrop-blur-sm sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-white text-xl font-bold sm:text-2xl">
          HOME MANAGEMENT SERVICES
        </h1>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-4 sm:flex sm:gap-6">
            <a
              href="/"
              className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
            >
              Home
            </a>
            <a
              href="/#about"
              className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
            >
              About
            </a>
            <a
              href="/#services"
              className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
            >
              Services
            </a>
            <a
              href="/gallery"
              className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
            >
              Gallery
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium text-white transition-colors hover:text-cyan-200 sm:text-base"
            >
              Contact
            </a>
          </nav>
          {isLoggedIn ? (
            <div className="flex items-center gap-2 sm:gap-3">
              {user?.authProvider === "clerk" ? (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox:
                        "h-9 w-9 rounded-full border border-white/30 overflow-hidden",
                    },
                  }}
                />
              ) : (
                <img
                  src={avatarSrc}
                  alt={`${username} avatar`}
                  className="h-9 w-9 rounded-full border border-white/30 object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="rounded-lg border border-emerald-300/40 bg-emerald-400/20 px-2 py-1 text-xs font-semibold text-emerald-100 sm:px-3 sm:text-sm">
                Logged in: {username}
              </div>
              {user?.authProvider !== "clerk" && (
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/10 sm:px-4 sm:text-sm"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={onSignIn}
                className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-4"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={onSignUp}
                className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-400 sm:px-5"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
};

export default Navbar;

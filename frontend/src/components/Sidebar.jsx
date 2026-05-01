import PropTypes from "prop-types";
import React from "react";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useAuth } from "../contexts/authContext";

export default function Sidebar({
  navItems,
  activeSection,
  setActiveSection,
  sidebarExpanded,
  setSidebarExpanded,
  user,
  isLoggedIn,
  handleLogout,
}) {
  const { userName, isLoggedIn: ctxLoggedIn, logout } = useAuth();
  const displayName =
    userName || (typeof user === "object" && user?.name ? user.name : "User");
  const effectiveLoggedIn =
    typeof ctxLoggedIn === "boolean" ? ctxLoggedIn : isLoggedIn;
  const effectiveLogout = handleLogout || logout;
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 hidden border-r border-cyan-100 bg-white/85 shadow-[10px_0_40px_-24px_rgba(8,145,178,0.45)] backdrop-blur-xl transition-all duration-300 lg:flex ${
        sidebarExpanded ? "w-72" : "w-24"
      }`}
    >
      <div className="flex h-full w-full flex-col px-4 py-5">
        <div className="flex items-center justify-between gap-3 px-1 pb-6">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-700">
              Rent SaaS
            </div>
            {sidebarExpanded ? (
              <div className="mt-1 text-lg font-bold text-slate-900">
                Management suite
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setSidebarExpanded((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700 transition-colors hover:bg-cyan-100"
            aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarExpanded ? (
              <PanelLeftClose className="h-5 w-5" />
            ) : (
              <PanelLeftOpen className="h-5 w-5" />
            )}
          </button>
        </div>

        <div
          className="mb-10 rounded-3xl border border-cyan-100 px-4 py-4 shadow-sm"
          style={{
            background: "linear-gradient(90deg, rgba(236,254,255,0.9), #fff)",
          }}
        >
          <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
            Signed in
          </div>
          <div className="mt-2 text-sm font-semibold text-slate-900">
            {displayName}
          </div>
          {sidebarExpanded ? (
            <div className="mt-1 text-sm text-slate-500">
              {navItems.find((i) => i.id === activeSection)?.label} workspace
            </div>
          ) : null}
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSection;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`group flex w-full items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-all duration-200 ${
                  isActive
                    ? "border-cyan-200 bg-cyan-50 text-cyan-800 shadow-sm"
                    : "border-transparent text-slate-600 hover:border-cyan-100 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors ${isActive ? "bg-cyan-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-cyan-100 group-hover:text-cyan-700"}`}
                >
                  <Icon className="h-5 w-5" />
                </span>

                {sidebarExpanded ? (
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {item.label}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {item.description}
                    </span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-cyan-100 pt-10">
          {effectiveLoggedIn ? (
            <button
              type="button"
              onClick={effectiveLogout}
              className="flex w-full items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50 px-3 py-3 text-left text-rose-700 transition-colors hover:bg-rose-100"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
                <LogOut className="h-5 w-5" />
              </span>
              {sidebarExpanded ? (
                <span>
                  <span className="block text-sm font-semibold">Logout</span>
                  <span className="block text-xs text-rose-600/80">
                    End the current session
                  </span>
                </span>
              ) : null}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-auth", {
                      detail: { mode: "login", skipRedirect: true },
                    }),
                  )
                }
                className="rounded-md px-3 py-2 text-sm font-medium text-cyan-700 border border-cyan-100 bg-cyan-50 hover:bg-cyan-100"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-auth", {
                      detail: { mode: "register", skipRedirect: true },
                    }),
                  )
                }
                className="rounded-md px-3 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  navItems: PropTypes.array.isRequired,
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  sidebarExpanded: PropTypes.bool.isRequired,
  setSidebarExpanded: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  isLoggedIn: PropTypes.bool,
  handleLogout: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  user: "",
  isLoggedIn: false,
};

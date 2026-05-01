import React from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";

export default function MasterNavbar({ title, user, onLogout }) {
  const username = typeof user === "object" && user?.name ? user.name : "User";

  return (
    <header className="sticky top-4 z-30 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-white/60 bg-white/80 px-4 py-3 shadow backdrop-blur-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
              {title}
            </div>
            <div className="mt-1 text-lg font-bold text-slate-900">
              {username}
            </div>
          </div>

          {/* navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to={"/"}
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Home
            </Link>
            <a
              href="#settings"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Settings
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                placeholder="Search"
                className="w-48 bg-transparent outline-none"
              />
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="rounded-lg border border-white/20 bg-transparent px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

MasterNavbar.propTypes = {
  title: PropTypes.string,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onLogout: PropTypes.func,
};

MasterNavbar.defaultProps = {
  title: "Workspace",
  user: "",
  onLogout: () => {},
};

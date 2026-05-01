import React, { useMemo, useState } from "react";
import Dashboard from "./Dashboard";
import Properties from "./Properties";
import Tenants from "./Tenants";
import Subscription from "./Subscription";
import Settings from "./Settings";
import { useAuth } from "../contexts/authContext";
import { useClerk } from "@clerk/clerk-react";
import Sidebar from "../components/Sidebar";
import MasterNavbar from "../components/MasterNavbar";
import {
  Building2,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
  Users,
} from "lucide-react";

const MasterPage = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const { isLoggedIn, user, logout } = useAuth();
  const { signOut } = useClerk();

  const navItems = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Overview and updates",
        icon: LayoutDashboard,
      },
      {
        id: "properties",
        label: "Properties",
        description: "Listings and maintenance",
        icon: Building2,
      },
      {
        id: "tenants",
        label: "Tenants",
        description: "Residents and leases",
        icon: Users,
      },
      {
        id: "subscription",
        label: "Subscription",
        description: "Billing and plan details",
        icon: CreditCard,
      },
      {
        id: "settings",
        label: "Settings",
        description: "Account and security",
        icon: Settings2,
      },
    ],
    [],
  );

  const activeSectionMeta =
    navItems.find((item) => item.id === activeSection) || navItems[0];

  const handleLogout = async () => {
    if (user?.authProvider === "clerk") {
      try {
        await signOut();
      } catch (error) {
        console.error("Clerk sign out failed:", error);
      }
    }

    logout();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "properties":
        return <Properties />;
      case "tenants":
        return <Tenants />;
      case "subscription":
        return <Subscription />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-cyan-50 text-slate-900 transition-all duration-500">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-28 top-16 h-80 w-80 rounded-full bg-cyan-100/60 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <Sidebar
        navItems={navItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarExpanded={sidebarExpanded}
        setSidebarExpanded={setSidebarExpanded}
        user={user}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />

      <main
        className={`relative min-h-screen transition-[padding] duration-300 ${
          sidebarExpanded ? "lg:pl-72" : "lg:pl-24"
        }`}
      >
        <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
          <MasterNavbar
            title={activeSectionMeta.label}
            user={user}
            onLogout={handleLogout}
          />
          <div className="mb-6 rounded-4xl border border-white/70 bg-white/80 px-5 py-4 shadow-[0_20px_60px_-35px_rgba(8,145,178,0.45)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">
                  {activeSectionMeta.label}
                </div>
                <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
                  {activeSectionMeta.description}
                </h2>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-700">
                Workspace ready
              </div>
            </div>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default MasterPage;

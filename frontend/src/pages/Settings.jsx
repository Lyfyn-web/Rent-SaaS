import React from "react";
import PageFrame from "../components/PageFrame";

function Settings() {
  return (
    <PageFrame
      eyebrow="Account Settings"
      title="Preferences and security"
      accent="Tune the workspace to your workflow"
      description="Update account details, notification behavior, and security preferences without leaving the same polished shell."
      metrics={[
        {
          label: "Profile",
          value: "Complete",
          detail: "Name, email, and avatar synced",
        },
        {
          label: "Notifications",
          value: "Email + in-app",
          detail: "Critical alerts stay enabled",
        },
        {
          label: "Security",
          value: "2FA ready",
          detail: "Review sign-in methods regularly",
        },
        {
          label: "Workspace theme",
          value: "Cyan",
          detail: "Matches the rest of the app UI",
        },
      ]}
      highlights={[
        {
          title: "Account preferences",
          description:
            "Keep defaults, notifications, and display options aligned with your daily routine.",
        },
        {
          title: "Security checks",
          description:
            "Review access, sessions, and recovery settings before they become a support issue.",
        },
      ]}
      actionLabel="Update account and security settings"
    />
  );
}

export default Settings;

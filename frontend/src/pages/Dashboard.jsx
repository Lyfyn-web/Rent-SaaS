import React from "react";
import PageFrame from "../components/PageFrame";

function Dashboard() {
  return (
    <PageFrame
      eyebrow="Dashboard Overview"
      title="Welcome back"
      accent="Your rental workspace is ready"
      description="Track the health of your portfolio, catch maintenance issues early, and keep leases, tenants, and billing in one place."
      metrics={[
        {
          label: "Properties",
          value: "24",
          detail: "6 active listings ready to review",
        },
        {
          label: "Tenants",
          value: "18",
          detail: "4 new messages waiting",
        },
        {
          label: "Occupancy",
          value: "92%",
          detail: "Strong across your portfolio",
        },
        {
          label: "Monthly revenue",
          value: "$48.2k",
          detail: "Up 8.4% versus last month",
        },
      ]}
      highlights={[
        {
          title: "Upcoming renewals",
          description:
            "Three leases are expiring in the next 30 days. Review renewal offers and tenant notes now.",
        },
        {
          title: "Maintenance queue",
          description:
            "Two requests are marked urgent and should be assigned before the weekend.",
        },
      ]}
      actionLabel="Continue monitoring portfolio performance"
    />
  );
}

export default Dashboard;

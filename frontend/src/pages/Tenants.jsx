import React from "react";
import PageFrame from "../components/PageFrame";

function Tenants() {
  return (
    <PageFrame
      eyebrow="Tenant Center"
      title="Tenant relationships"
      accent="Keep communication clear and quick"
      description="See leases, payments, and support requests together so you can resolve issues before they become overdue work."
      metrics={[
        {
          label: "Active tenants",
          value: "18",
          detail: "14 in good standing",
        },
        {
          label: "Open requests",
          value: "5",
          detail: "3 awaiting vendor assignment",
        },
        {
          label: "Late payments",
          value: "2",
          detail: "Follow-up reminders sent",
        },
        {
          label: "Lease renewals",
          value: "6",
          detail: "Due within the next 45 days",
        },
      ]}
      highlights={[
        {
          title: "Resident messages",
          description:
            "Group chats by property so you can respond without switching context.",
        },
        {
          title: "Lease status",
          description:
            "Spot renewal opportunities early and keep move-outs predictable.",
        },
      ]}
      actionLabel="Open tenant communication queue"
    />
  );
}

export default Tenants;

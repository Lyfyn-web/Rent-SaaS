import React from "react";
import PageFrame from "../components/PageFrame";

function Subscription() {
  return (
    <PageFrame
      eyebrow="Billing & Plan"
      title="Subscription status"
      accent="Keep billing visible and predictable"
      description="Manage your current plan, invoice history, and renewal dates with the same clean layout as the rest of the workspace."
      metrics={[
        {
          label: "Current plan",
          value: "Growth",
          detail: "Renewing in 18 days",
        },
        {
          label: "Next invoice",
          value: "$149",
          detail: "Includes 12 active properties",
        },
        {
          label: "Saved this year",
          value: "$1.2k",
          detail: "From efficient occupancy",
        },
        {
          label: "Payment method",
          value: "Visa",
          detail: "Ending in 2048",
        },
      ]}
      highlights={[
        {
          title: "Plan usage",
          description:
            "Watch limits and usage at a glance so you can upgrade before you hit a bottleneck.",
        },
        {
          title: "Invoice history",
          description:
            "Keep monthly billing notes and receipts in one predictable location.",
        },
      ]}
      actionLabel="Review billing and renewal details"
    />
  );
}

export default Subscription;

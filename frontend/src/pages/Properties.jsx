import React from "react";
import PageFrame from "../components/PageFrame";

function Properties() {
  return (
    <PageFrame
      eyebrow="Properties Management"
      title="Property portfolio"
      accent="Manage listings with less friction"
      description="Keep every unit organized with clear status flags, maintenance visibility, and a faster path from vacancy to occupancy."
      metrics={[
        {
          label: "Active listings",
          value: "24",
          detail: "3 ready for publication",
        },
        {
          label: "Vacant units",
          value: "4",
          detail: "Two are already scheduled for viewing",
        },
        {
          label: "Maintenance tickets",
          value: "7",
          detail: "2 urgent, 5 routine",
        },
        {
          label: "Average rent",
          value: "$2,480",
          detail: "Healthy across the portfolio",
        },
      ]}
      highlights={[
        {
          title: "Turnover pipeline",
          description:
            "Prepare clean-up, photos, and pricing updates for the next two move-outs.",
        },
        {
          title: "Listing quality",
          description:
            "Review photos, descriptions, and amenities so each property presents consistently.",
        },
      ]}
      actionLabel="Review units ready for listing"
    />
  );
}

export default Properties;

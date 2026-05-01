import React, { useState } from "react";
import PageFrame from "../components/PageFrame";
import { useAuth } from "../contexts/authContext";
import { Trash2, Edit2, Save } from "lucide-react";

function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: typeof user === "object" && user?.name ? user.name : "",
    email: typeof user === "object" && user?.email ? user.email : "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // TODO: Implement save logic with API call
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // TODO: Implement account deletion with confirmation
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      console.log("Deleting account");
    }
  };

  return (
    <PageFrame
      eyebrow="Account Profile"
      title="Your profile"
      accent="Manage your account information"
      description="Update your profile details, change your password, or take actions on your account. All changes are saved securely."
      metrics={[
        {
          label: "Account status",
          value: "Active",
          detail: "Your account is in good standing",
        },
        {
          label: "Member since",
          value: "2026",
          detail: "Account created this year",
        },
        {
          label: "Email verified",
          value: "Yes",
          detail: "Your email is confirmed",
        },
        {
          label: "Auth provider",
          value: user?.authProvider === "clerk" ? "Clerk" : "Custom",
          detail: "Secure authentication enabled",
        },
      ]}
      highlights={[]}
    >
      <div className="mt-8 space-y-6">
        {/* Profile Edit Section */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Profile Information
            </h3>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : null}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="Your name"
                />
              ) : (
                <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-slate-900">
                  {formData.name || "Not set"}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-900 placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="your.email@example.com"
                />
              ) : (
                <div className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-slate-900">
                  {formData.email || "Not set"}
                </div>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          ) : null}
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
          <h3 className="text-lg font-semibold text-rose-900 mb-2">
            Danger Zone
          </h3>
          <p className="text-sm text-rose-700 mb-6">
            Once you delete your account, there is no going back. Please be
            certain. This action will permanently remove all your data.
          </p>
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </PageFrame>
  );
}

export default Profile;

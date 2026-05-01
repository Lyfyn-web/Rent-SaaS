import React, { useState, useEffect } from "react";
import PageFrame from "../components/PageFrame";
import { useAuth } from "../contexts/authContext";
import {
  Trash2,
  Edit2,
  Save,
  AlertCircle,
  CheckCircle,
  Loader,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

function Profile() {
  const {
    user,
    api,
    logout,
    userName,
    userEmail,
    userAvatar,
    userId,
    userAuthProvider,
  } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: userName || (typeof user === "object" && user?.name ? user.name : ""),
    email:
      userEmail || (typeof user === "object" && user?.email ? user.email : ""),
  });

  console.log("User Profile: ", user);

  // Fetch current user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/users/profile");
        console.log("Profile API response:", response.data);
        setFormData({
          name: response.data?.name || "",
          email: response.data?.email || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Use context data as fallback
        if (typeof user === "object" && user?.name) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user && typeof user === "object" && api) {
      fetchUserProfile();
    }
  }, [api, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a name");
      return;
    }

    setIsSaving(true);
    try {
      const response = await api.patch("/api/users/profile", {
        name: formData.name,
        email: formData.email,
      });
      toast.success("Profile updated successfully");
      setFormData({
        name: response.data.name || formData.name,
        email: response.data.email || formData.email,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await api.delete("/api/users/profile");
      toast.success("Account deleted successfully");
      logout();
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error?.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
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
          label: "User ID",
          value: userId ? userId.slice(0, 8) + "..." : "N/A",
          detail: "Unique account identifier",
        },
        {
          label: "Email verified",
          value: "Yes",
          detail: "Your email is confirmed",
        },
        {
          label: "Auth provider",
          value: userAuthProvider === "clerk" ? "Clerk" : "Custom",
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
            {!isEditing && !isLoading && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-100"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            )}
          </div>

          {isLoading && !formData.name ? (
            <div className="space-y-4">
              <div className="h-24 w-24 bg-slate-200 rounded-full animate-pulse"></div>
              <div className="h-12 bg-slate-200 rounded-lg animate-pulse"></div>
              <div className="h-12 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-end gap-6">
                <div className="shrink-0">
                  <img
                    src={
                      userAvatar ||
                      `https://picsum.photos/seed/${encodeURIComponent(
                        userId ||
                          user?.id ||
                          userEmail ||
                          userName ||
                          "default",
                      )}/200/200`
                    }
                    alt={formData.name || userName || "User"}
                    className="h-24 w-24 rounded-full border-4 border-cyan-100 object-cover shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Profile Picture
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Automatically generated from your account
                  </p>
                </div>
              </div>

              {/* Form Fields */}
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
            </div>
          )}

          {isEditing && (
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}
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
            disabled={isDeleting}
            className="flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </PageFrame>
  );
}

export default Profile;

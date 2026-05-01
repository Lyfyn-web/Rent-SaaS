import React, { useState, useEffect, useMemo, useRef } from "react";
import { useAuth } from "../contexts/authContext";
import { Trash2, Edit2, Save, Loader } from "lucide-react";
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const apiRef = useRef(api);
  const resolvedUserId = useMemo(
    () => userId || (typeof user === "object" ? user?.id : null),
    [userId, user],
  );
  const avatarSrc = useMemo(
    () =>
      userAvatar ||
      `https://picsum.photos/seed/${encodeURIComponent(
        resolvedUserId || userEmail || userName || "default",
      )}/200/200`,
    [userAvatar, resolvedUserId, userEmail, userName],
  );
  const [formData, setFormData] = useState({
    name: userName || (typeof user === "object" && user?.name ? user.name : ""),
    email:
      userEmail || (typeof user === "object" && user?.email ? user.email : ""),
  });

  // Keep latest API instance without coupling profile fetch effect to API object identity
  useEffect(() => {
    apiRef.current = api;
  }, [api]);

  // Fetch current user profile from API
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await apiRef.current.get("/api/users/profile");
        setFormData({
          name: response.data?.name || "",
          email: response.data?.email || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Use context data as fallback
        if (userName || userEmail) {
          setFormData({
            name: userName || "",
            email: userEmail || "",
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (resolvedUserId && apiRef.current) {
      fetchUserProfile();
    }
  }, [resolvedUserId, userName, userEmail]);

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

  const handleDeleteRequest = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
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
      setShowDeleteConfirm(false);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-8rem)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-12 right-10 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-8 left-8 h-52 w-52 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-cyan-100 bg-white/90 p-6 shadow-sm backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Account Profile
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Your Profile
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Manage your account details, identity image, and security actions.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Account status
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">Active</p>
            <p className="mt-1 text-sm text-slate-500">
              Your account is in good standing
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
              User ID
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {userId ? `${userId.slice(0, 6)}...${userId.slice(-6)}` : "N/A"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Unique account identifier
            </p>
          </div>

          <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Auth provider
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900">
              {userAuthProvider === "clerk" ? "Clerk" : "Email/Password"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Secure authentication enabled
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
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
                <div className="h-24 w-24 rounded-full bg-slate-200 animate-pulse" />
                <div className="h-12 rounded-lg bg-slate-200 animate-pulse" />
                <div className="h-12 rounded-lg bg-slate-200 animate-pulse" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-end gap-6">
                  <div className="shrink-0">
                    <img
                      src={avatarSrc}
                      alt={formData.name || userName || "User"}
                      className="h-24 w-24 rounded-full border-4 border-cyan-100 object-cover shadow-md"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Profile Picture
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Automatically generated from your account
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
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
                    <label className="mb-1 block text-sm font-medium text-slate-700">
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
                  className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
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

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
              <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
                Quick Snapshot
              </h4>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {formData.name || "Not set"}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {formData.email || "Not set"}
                </p>
                <p>
                  <span className="font-semibold">Verification:</span> Yes
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-rose-100 bg-rose-50 p-6">
              <h3 className="mb-2 text-lg font-semibold text-rose-900">
                Danger Zone
              </h3>
              <p className="mb-6 text-sm text-rose-700">
                Once you delete your account, there is no going back. This
                action will permanently remove all your data.
              </p>
              <button
                type="button"
                onClick={handleDeleteRequest}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {isDeleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {showDeleteConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 px-4">
          <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-6 shadow-2xl">
            <h4 className="text-lg font-bold text-slate-900">
              Delete Account?
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              This action cannot be undone. All your account data will be
              permanently removed.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Profile;

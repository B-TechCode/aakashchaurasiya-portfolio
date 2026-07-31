import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCamera } from "react-icons/fi";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getProfile,
  updateProfile,
  uploadProfileImage,
  updateAccount,
  getAccount,
} from "../../api/profileApi";

const initialProfile = {
  fullName: "",
  headline: "",
  email: "",
  phone: "",
  location: "",
  aboutMe: "",
  profileImageUrl: "",
};

const initialAccount = {
  username: "",
  email: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [account, setAccount] = useState(initialAccount);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingAccount, setSavingAccount] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    loadProfile();
  }, []);

  // =====================================================
  // LOAD PROFILE + ACCOUNT
  // =====================================================

  const loadProfile = async () => {
    try {
      setLoading(true);

      const [profileResponse, accountResponse] = await Promise.all([
        getProfile(),
        getAccount(),
      ]);

      const profileData = profileResponse?.data?.data || {};
      const accountData = accountResponse?.data?.data || {};

      setProfile({
        fullName: profileData.fullName || "",
        headline: profileData.headline || "",
        email: profileData.email || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        aboutMe: profileData.aboutMe || "",
        profileImageUrl: profileData.profileImageUrl || "",
      });

      setAccount({
        username: accountData.username || "",
        email: accountData.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Failed to load profile:", error);

      toast.error(
        error?.response?.data?.message || "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PROFILE CHANGE
  // =====================================================

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = async () => {
    if (!profile.fullName.trim()) {
      toast.error("Full name is required.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...profile,
        fullName: profile.fullName.trim(),
        headline: profile.headline.trim(),
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        location: profile.location.trim(),
        aboutMe: profile.aboutMe.trim(),
      };

      const response = await updateProfile(payload);

      // Use backend data when the API returns the updated profile.
      if (response?.data?.data) {
        setProfile((prev) => ({
          ...prev,
          ...response.data.data,
        }));
      } else {
        setProfile(payload);
      }

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // PROFILE IMAGE UPLOAD
  // =====================================================

  const handleImageUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");

      event.target.value = "";
      return;
    }

    try {
      setUploadingImage(true);

      const response = await uploadProfileImage(file);

      if (response?.data?.data) {
        setProfile((prev) => ({
          ...prev,
          ...response.data.data,
        }));
      }

      toast.success("Profile image updated.");
    } catch (error) {
      console.error("Image upload failed:", error);

      toast.error(
        error?.response?.data?.message || "Image upload failed."
      );
    } finally {
      setUploadingImage(false);

      // Allows selecting the same file again if necessary.
      event.target.value = "";
    }
  };

  // =====================================================
  // ACCOUNT CHANGE
  // =====================================================

  const handleAccountChange = (field, value) => {
    setAccount((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // SAVE ACCOUNT
  // =====================================================

  const handleAccountSave = async () => {
    const username = account.username.trim();
    const email = account.email.trim();

    if (!username) {
      toast.error("Username is required.");
      return;
    }

    if (!email) {
      toast.error("Login email is required.");
      return;
    }

    const wantsPasswordChange =
      account.currentPassword ||
      account.newPassword ||
      account.confirmPassword;

    if (wantsPasswordChange) {
      if (!account.currentPassword) {
        toast.error("Current password is required.");
        return;
      }

      if (!account.newPassword) {
        toast.error("New password is required.");
        return;
      }

      if (!account.confirmPassword) {
        toast.error("Please confirm your new password.");
        return;
      }

      if (account.newPassword !== account.confirmPassword) {
        toast.error("New password and confirm password do not match.");
        return;
      }
    }

    try {
      setSavingAccount(true);

      const payload = {
        ...account,
        username,
        email,
      };

      await updateAccount(payload);

      setAccount((prev) => ({
        ...prev,
        username,
        email,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      toast.success("Account updated successfully.");
    } catch (error) {
      console.error("Failed to update account:", error);

      toast.error(
        error?.response?.data?.message || "Failed to update account."
      );
    } finally {
      setSavingAccount(false);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-500" />

            <p className="text-base text-slate-300 sm:text-lg">
              Loading Profile...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-5xl">

        {/* =====================================================
            PAGE HEADING
        ===================================================== */}

        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Profile
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
            Manage your portfolio profile information.
          </p>
        </div>

        {/* =====================================================
            PROFILE SETTINGS
        ===================================================== */}

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6 lg:p-10">

          {/* Profile Image */}

          <div className="mb-8 flex flex-col items-center sm:mb-10">
            <div className="relative">
              <img
                src={
                  profile.profileImageUrl ||
                  "https://avatars.githubusercontent.com/u/9919?v=4"
                }
                alt="Profile"
                className="h-28 w-28 rounded-full border-4 border-slate-700 object-cover sm:h-36 sm:w-36 lg:h-40 lg:w-40"
              />

              <button
                type="button"
                disabled={uploadingImage}
                onClick={() => fileInputRef.current?.click()}
                aria-label="Upload profile image"
                title="Upload profile image"
                className={`absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg transition sm:bottom-1 sm:right-1 sm:h-11 sm:w-11 ${
                  uploadingImage
                    ? "cursor-not-allowed bg-slate-600 opacity-70"
                    : "bg-cyan-500 hover:bg-cyan-600"
                }`}
              >
                {uploadingImage ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <FiCamera className="text-lg" />
                )}
              </button>

              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="hidden"
              />
            </div>

            {uploadingImage && (
              <p className="mt-3 text-sm text-slate-400">
                Uploading image...
              </p>
            )}
          </div>

          {/* Profile Form */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

            {/* Full Name */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Full Name
              </label>

              <input
                type="text"
                value={profile.fullName}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
                placeholder="Full Name"
                autoComplete="name"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            {/* Headline */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Headline
              </label>

              <input
                type="text"
                value={profile.headline}
                onChange={(e) =>
                  handleProfileChange("headline", e.target.value)
                }
                placeholder="Headline"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Email
              </label>

              <input
                type="email"
                value={profile.email}
                onChange={(e) =>
                  handleProfileChange("email", e.target.value)
                }
                placeholder="Email"
                autoComplete="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            {/* Phone */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Phone
              </label>

              <input
                type="tel"
                value={profile.phone}
                onChange={(e) =>
                  handleProfileChange("phone", e.target.value)
                }
                placeholder="Phone"
                autoComplete="tel"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            {/* Location */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Location
              </label>

              <input
                type="text"
                value={profile.location}
                onChange={(e) =>
                  handleProfileChange("location", e.target.value)
                }
                placeholder="Location"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>

            {/* About Me */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                About Me
              </label>

              <textarea
                rows={6}
                value={profile.aboutMe}
                onChange={(e) =>
                  handleProfileChange("aboutMe", e.target.value)
                }
                placeholder="Write something about yourself..."
                className="w-full resize-y rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Save Profile */}

          <div className="mt-6 flex sm:mt-8 sm:justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-600 sm:w-auto sm:px-8"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* =====================================================
            ACCOUNT SETTINGS
        ===================================================== */}

        <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:mt-8 sm:p-6 lg:mt-10 lg:p-10">

          {/* Account Header */}

          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Account Settings
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
              Update your login credentials.
            </p>
          </div>

          {/* Account Form */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

            {/* Username */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Username
              </label>

              <input
                type="text"
                value={account.username}
                onChange={(e) =>
                  handleAccountChange("username", e.target.value)
                }
                placeholder="Username"
                autoComplete="username"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>

            {/* Login Email */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Login Email
              </label>

              <input
                type="email"
                value={account.email}
                onChange={(e) =>
                  handleAccountChange("email", e.target.value)
                }
                placeholder="Email"
                autoComplete="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>

            {/* Current Password */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Current Password
              </label>

              <input
                type="password"
                value={account.currentPassword}
                onChange={(e) =>
                  handleAccountChange(
                    "currentPassword",
                    e.target.value
                  )
                }
                placeholder="Current Password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>

            {/* New Password */}

            <div>
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                New Password
              </label>

              <input
                type="password"
                value={account.newPassword}
                onChange={(e) =>
                  handleAccountChange("newPassword", e.target.value)
                }
                placeholder="New Password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
              />
            </div>

            {/* Confirm Password */}

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm text-slate-300 sm:text-base">
                Confirm Password
              </label>

              <input
                type="password"
                value={account.confirmPassword}
                onChange={(e) =>
                  handleAccountChange(
                    "confirmPassword",
                    e.target.value
                  )
                }
                placeholder="Confirm Password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500 md:max-w-[calc(50%-0.75rem)]"
              />
            </div>
          </div>

          {/* Save Account */}

          <div className="mt-6 flex sm:mt-8 sm:justify-end">
            <button
              type="button"
              onClick={handleAccountSave}
              disabled={savingAccount}
              className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-600 sm:w-auto sm:px-8"
            >
              {savingAccount ? "Updating..." : "Update Account"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

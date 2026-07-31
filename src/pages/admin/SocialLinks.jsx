import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import SocialLinkTable from "../../components/admin/sociallinks/SocialLinkTable";
import SocialLinkFormModal from "../../components/admin/sociallinks/SocialLinkFormModal";

import {
  getAllSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../../api/socialLinkApi";

export default function SocialLinks() {
  const [links, setLinks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingLink, setEditingLink] = useState(null);

  // ===============================
  // Load Social Links
  // ===============================

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      setLoading(true);

      const response = await getAllSocialLinks();

      setLinks(response.data.data || []);
    } catch (error) {
      console.error("Failed to load social links:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load social links."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Create
  // ===============================

  const handleCreate = () => {
    setEditingLink(null);
    setShowModal(true);
  };

  // ===============================
  // Edit
  // ===============================

  const handleEdit = (link) => {
    setEditingLink(link);
    setShowModal(true);
  };

  // ===============================
  // Close Modal
  // ===============================

  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingLink(null);
  };

  // ===============================
  // Create / Update
  // ===============================

  const handleSubmit = async (form) => {
    const platform = form.platform.trim();
    const url = form.url.trim();

    if (!platform) {
      return toast.error("Platform is required.");
    }

    if (!url) {
      return toast.error("URL is required.");
    }

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {
      return toast.error(
        "URL must start with http:// or https://"
      );
    }

    const payload = {
      ...form,
      platform,
      url,
    };

    try {
      setSaving(true);

      if (editingLink) {
        await updateSocialLink(
          editingLink.id,
          payload
        );
      } else {
        await createSocialLink(payload);
      }

      await loadLinks();

      toast.success(
        editingLink
          ? "Social link updated successfully."
          : "Social link created successfully."
      );

      setShowModal(false);
      setEditingLink(null);
    } catch (error) {
      console.error("Failed to save social link:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save social link."
      );
    } finally {
      setSaving(false);
    }
  };

  // ===============================
  // Delete
  // ===============================

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this social link?")) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteSocialLink(id);

      await loadLinks();

      toast.success(
        "Social link deleted successfully."
      );
    } catch (error) {
      console.error("Failed to delete social link:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete social link."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full min-w-0">

        {/* ================= Header ================= */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Social Links
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage your social media links.
            </p>

          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="w-full shrink-0 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto sm:px-6"
          >
            + Add Social Link
          </button>

        </div>

        {/* ================= Links ================= */}

        <SocialLinkTable
          links={links}
          loading={loading}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* ================= Form Modal ================= */}

        <SocialLinkFormModal
          open={showModal}
          initialData={editingLink}
          loading={saving}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />

      </div>
    </AdminLayout>
  );
}
s
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

 const [showModal, setShowModal] = useState(false);

const [editingLink, setEditingLink] = useState(null);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {

      const response = await getAllSocialLinks();

      setLinks(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  const handleCreate = () => {
  setEditingLink(null);
  setShowModal(true);
};

const handleEdit = (link) => {
  setEditingLink(link);
  setShowModal(true);
};

  

const handleSubmit = async (form) => {

  if (!form.platform.trim()) {
    return toast.error("Platform is required.");
  }

  if (!form.url.trim()) {
    return toast.error("URL is required.");
  }

  if (
    !form.url.startsWith("http://") &&
    !form.url.startsWith("https://")
  ) {
    return toast.error(
      "URL must start with http:// or https://"
    );
  }

  try {

    setSaving(true);

    if (editingLink) {

      await updateSocialLink(
        editingLink.id,
        form
      );

    } else {

      await createSocialLink(form);

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

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Operation failed."
    );

  } finally {

    setSaving(false);

  }

};

 

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this social link?")) return;

    try {

  await deleteSocialLink(id);

await loadLinks();

toast.success(
  "Social link deleted successfully."
);

    } catch (error) {

     console.error(error);

toast.error(
    error.response?.data?.message ||
    "Failed to delete social link."
);

    }

  };

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

  <div>

    <h1 className="text-4xl font-bold text-white">
      Social Links
    </h1>

    <p className="text-slate-400 mt-2">
      Manage your social media links.
    </p>

  </div>

  <button
    onClick={handleCreate}
    className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
  >
    + Add Social Link
  </button>

</div>

<SocialLinkTable
  links={links}
  loading={loading}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

<SocialLinkFormModal
  open={showModal}
  initialData={editingLink}
  loading={saving}
  onClose={() => {
    setShowModal(false);
    setEditingLink(null);
  }}
  onSubmit={handleSubmit}
/>

    </AdminLayout>

  );


}


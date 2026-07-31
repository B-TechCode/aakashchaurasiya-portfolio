import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import ExperienceTable from "../../components/admin/experience/ExperienceTable";
import ExperienceFormModal from "../../components/admin/experience/ExperienceFormModal";
import DeleteExperienceModal from "../../components/admin/experience/DeleteExperienceModal";

import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../api/experienceApi";

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingExperience, setDeletingExperience] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);

      const response = await getAllExperiences();

      setExperiences(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load experiences.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingExperience(null);
    setShowModal(true);
  };

  const handleEdit = (experience) => {
    setEditingExperience(experience);
    setShowModal(true);
  };

  const handleCloseFormModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingExperience(null);
  };

  const handleDeleteClick = (experience) => {
    setDeletingExperience(experience);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setDeletingExperience(null);
  };

  const handleDelete = async () => {
    if (!deletingExperience) return;

    try {
      setDeleting(true);

      await deleteExperience(deletingExperience.id);

      await loadExperiences();

      toast.success("Experience deleted successfully.");

      setShowDeleteModal(false);
      setDeletingExperience(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete experience."
      );
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (experience) => {
    if (!experience.title.trim()) {
      return toast.error("Title is required.");
    }

    if (!experience.organization.trim()) {
      return toast.error("Organization is required.");
    }

    try {
      setSaving(true);

      if (editingExperience) {
        await updateExperience(
          editingExperience.id,
          experience
        );
      } else {
        await createExperience(experience);
      }

      await loadExperiences();

      toast.success(
        editingExperience
          ? "Experience updated successfully."
          : "Experience created successfully."
      );

      setShowModal(false);
      setEditingExperience(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save experience."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full min-w-0">

        {/* ================= Header ================= */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Experience
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage your work experience.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="w-full shrink-0 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto sm:px-6"
          >
            + Add Experience
          </button>
        </div>

        {/* ================= Experience List ================= */}

        <ExperienceTable
          experiences={experiences}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* ================= Create / Edit Modal ================= */}

        <ExperienceFormModal
          open={showModal}
          initialData={editingExperience}
          loading={saving}
          onClose={handleCloseFormModal}
          onSubmit={handleSubmit}
        />

        {/* ================= Delete Modal ================= */}

        <DeleteExperienceModal
          open={showDeleteModal}
          loading={deleting}
          experienceTitle={deletingExperience?.title}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDelete}
        />

      </div>
    </AdminLayout>
  );
}

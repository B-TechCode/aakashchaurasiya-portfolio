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
      const response = await getAllExperiences();

      setExperiences(response.data.data);
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

  const handleDeleteClick = (experience) => {
    setDeletingExperience(experience);

    setShowDeleteModal(true);
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Experience
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your work experience.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl text-white font-semibold"
        >
          + Add Experience
        </button>
      </div>

      <ExperienceTable
        experiences={experiences}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ExperienceFormModal
        open={showModal}
        initialData={editingExperience}
        loading={saving}
        onClose={() => {
          setShowModal(false);

          setEditingExperience(null);
        }}
        onSubmit={handleSubmit}
      />

      <DeleteExperienceModal
        open={showDeleteModal}
        loading={deleting}
        experienceTitle={deletingExperience?.title}
        onClose={() => {
          setShowDeleteModal(false);

          setDeletingExperience(null);
        }}
        onConfirm={handleDelete}
      />
    </AdminLayout>
  );
}
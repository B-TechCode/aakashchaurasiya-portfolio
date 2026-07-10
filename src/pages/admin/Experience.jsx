import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import ExperienceTable from "../../components/admin/experience/ExperienceTable";
import ExperienceFormModal from "../../components/admin/experience/ExperienceFormModal";

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

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const response = await getAllExperiences();

      setExperiences(response.data.data);
    } catch (error) {
      console.error(error);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;

    try {
      await deleteExperience(id);

      loadExperiences();
    } catch (error) {
      console.error(error);

      alert("Delete failed.");
    }
  };

  const handleSubmit = async (experience) => {
    try {
      setSaving(true);

      if (editingExperience) {
        await updateExperience(editingExperience.id, experience);
      } else {
        await createExperience(experience);
      }

      await loadExperiences();

      setShowModal(false);
      setEditingExperience(null);

    } catch (error) {
      console.error(error);

      alert("Failed to save experience.");
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
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Experience
        </button>

      </div>

      {loading ? (
        <div className="text-white text-xl">
          Loading...
        </div>
      ) : (
        <ExperienceTable
          experiences={experiences}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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

    </AdminLayout>
  );
}


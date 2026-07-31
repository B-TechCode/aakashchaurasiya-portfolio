import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

import SkillTable from "../../components/admin/skills/SkillTable";
import SkillFormModal from "../../components/admin/skills/SkillFormModal";

import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../api/skillApi";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const response = await getAllSkills();
      setSkills(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSkill(null);
    setShowModal(true);
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;

    try {
      await deleteSkill(id);
      await loadSkills();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete skill.");
    }
  };

  const handleSubmit = async (skill) => {
    try {
      setSaving(true);

      if (editingSkill) {
        await updateSkill(editingSkill.id, skill);
      } else {
        await createSkill(skill);
      }

      await loadSkills();

      setShowModal(false);
      setEditingSkill(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save skill.");
    } finally {
      setSaving(false);
    }
  };

  const handleCloseModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingSkill(null);
  };

  return (
    <AdminLayout>
      <div className="w-full min-w-0">
        {/* ================= Header ================= */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Skills
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage your technical skills.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="w-full rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto sm:px-6"
          >
            + Add Skill
          </button>
        </div>

        {/* ================= Content ================= */}

        {loading ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">
            <div className="text-lg font-semibold text-white sm:text-xl">
              Loading skills...
            </div>

            <p className="mt-2 text-sm text-slate-400">
              Please wait...
            </p>
          </div>
        ) : (
          <SkillTable
            skills={skills}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* ================= Modal ================= */}

        <SkillFormModal
          open={showModal}
          initialData={editingSkill}
          loading={saving}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
}
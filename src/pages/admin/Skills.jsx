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

      loadSkills();
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

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Skills
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your technical skills.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-xl text-white font-semibold"
        >
          + Add Skill
        </button>
      </div>

      {loading ? (
        <div className="text-white text-xl">
          Loading...
        </div>
      ) : (
        <SkillTable
          skills={skills}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <SkillFormModal
        open={showModal}
        initialData={editingSkill}
        loading={saving}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
}
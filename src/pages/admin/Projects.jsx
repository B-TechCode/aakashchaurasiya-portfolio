import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import ProjectTable from "../../components/admin/projects/ProjectTable";
import ProjectFormModal from "../../components/admin/projects/ProjectFormModal";

import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projectApi";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {

    loadProjects();

  }, []);

  const loadProjects = async () => {

    try {

     const response = await getAllProjects();

console.log("FULL RESPONSE:", response);
console.log("RESPONSE.DATA:", response.data);

setProjects(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleCreate = () => {

    setEditingProject(null);

    setShowModal(true);

  };

  const handleEdit = (project) => {

    setEditingProject(project);

    setShowModal(true);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this project?")) return;

    try {

      await deleteProject(id);

      loadProjects();

    } catch (error) {

      console.error(error);

      alert("Failed to delete project.");

    }

  };

  const handleSubmit = async (project) => {
  try {
    setSaving(true);

    if (editingProject) {
      await updateProject(editingProject.id, project);
    } else {
      await createProject(project);
    }

    await loadProjects();
    setShowModal(false);
    setEditingProject(null);

  } catch (error) {
    console.error(error);
    alert("Failed to save project.");
  } finally {
    setSaving(false);
  }
};

  return (

    <AdminLayout>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your portfolio projects.
          </p>

        </div>

        <button
          onClick={handleCreate}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Project
        </button>

      </div>

      {loading ? (

        <div className="text-white text-xl">
          Loading...
        </div>

      ) : (

        <ProjectTable
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onUploadImage={(project) => {
            console.log(project);
          }}
        />

      )}

      {showModal && (

       <ProjectFormModal
  open={showModal}
  initialData={editingProject}
  loading={saving}
  onClose={() => setShowModal(false)}
  onSubmit={handleSubmit}
/>

      )}

    </AdminLayout>

  );

}
 import { useEffect, useState } from "react";
import toast from "react-hot-toast";
 import AdminLayout from "../../layouts/AdminLayout";
 import ProjectTable from "../../components/admin/projects/ProjectTable";
 import ProjectFormModal from "../../components/admin/projects/ProjectFormModal";
 import ImageUploadModal from "../../components/admin/projects/ImageUploadModal";
import DeleteProjectModal from "../../components/admin/projects/DeleteProjectModal";

  import {
    getAllProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
  } from "../../api/projectApi";

export default function Projects() {
 const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [showModal, setShowModal] = useState(false);
const [showImageModal, setShowImageModal] = useState(false);
const [selectedProject, setSelectedProject] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletingProject, setDeletingProject] = useState(null);
const [deleting, setDeleting] = useState(false);
const [uploadingImage, setUploadingImage] = useState(false);
const [editingProject, setEditingProject] = useState(null);

      useEffect(() => {

        loadProjects();

      }, []);

      const loadProjects = async () => {

        try {

    const response = await getAllProjects();
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

const handleDeleteClick = (project) => {

  setDeletingProject(project);

  setShowDeleteModal(true);

};

const handleDelete = async () => {

  if (!deletingProject) return;

  try {

    setDeleting(true);

    await deleteProject(deletingProject.id);

    await loadProjects();

    toast.success("Project deleted successfully.");

    setShowDeleteModal(false);

    setDeletingProject(null);

  } catch (error) {

    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to delete project."
    );

  } finally {

    setDeleting(false);

  }

};

 const handleUploadImageClick = (project) => {

    setSelectedProject(project);

    setShowImageModal(true);

  };

  const handleImageUpload = async (image, meta) => {

    try {

      setUploadingImage(true);

     await uploadProjectImage(
    selectedProject.id,
    image,
    meta
);

await loadProjects();

toast.success(
    "Project image uploaded successfully."
);

setShowImageModal(false);

setSelectedProject(null);

    } catch (error) {

      console.error(error);

     toast.error(
    error.response?.data?.message ||
    "Image upload failed."
);

    } finally {

      setUploadingImage(false);

    }

  };

      const handleSubmit = async (project) => {

        if (!project.title.trim()) {
    return toast.error("Project title is required.");
}

if (!project.slug.trim()) {
    return toast.error("Project slug is required.");
}

if (!project.summary.trim()) {
    return toast.error("Project summary is required.");
}
      try {
        setSaving(true);

        if (editingProject) { 
          await updateProject(editingProject.id, project);
        } else {
          await createProject(project);
        }

        await loadProjects();

        toast.success(
    editingProject
        ? "Project updated successfully."
        : "Project created successfully."
);

        setShowModal(false);
        setEditingProject(null);

      } catch (error) {
        console.error(error);

       toast.error(
    error.response?.data?.message ||
    "Failed to save project."
);

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

             Loading projects...

            </div>

          ) : (

          <ProjectTable
    projects={projects}
    loading={loading}
    onEdit={handleEdit}
  onDelete={handleDeleteClick}
    onUploadImage={handleUploadImageClick}
/>

          )}

          {showModal && (
    <ProjectFormModal
      open={showModal}
      initialData={editingProject}
      loading={saving}

     onClose={() => {

    setShowModal(false);

    setEditingProject(null);

}}


      onSubmit={handleSubmit}
    />
  )}

  <ImageUploadModal
    open={showImageModal}
    project={selectedProject}
    loading={uploadingImage}
    onClose={() => {
      setShowImageModal(false);
      setSelectedProject(null);
    }}
    onUpload={handleImageUpload}
  />

  <DeleteProjectModal
  open={showDeleteModal}
  loading={deleting}
  projectTitle={deletingProject?.title}
  onClose={() => {
    setShowDeleteModal(false);
    setDeletingProject(null);
  }}
  onConfirm={handleDelete}
/>

  </AdminLayout>

  );

    }
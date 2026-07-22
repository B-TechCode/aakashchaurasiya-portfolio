import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

import ResumeTable from "../../components/admin/resume/ResumeTable";
import ResumeUploadModal from "../../components/admin/resume/ResumeUploadModal";
import DeleteResumeModal from "../../components/admin/resume/DeleteResumeModal";
import {
  getAllResumes,
  uploadResume,
  deleteResume,
} from "../../api/resumeApi";

export default function Resume() {

  const [resumes, setResumes] = useState([]);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);

const [showDeleteModal, setShowDeleteModal] = useState(false);

const [selectedResume, setSelectedResume] = useState(null);

const [deleting, setDeleting] = useState(false);


  useEffect(() => {

    loadResumes();

  }, []);

  const loadResumes = async () => {

    try {

      const response = await getAllResumes();

      setResumes(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleUpload = async (file) => {

    try {

      setUploading(true);
      await uploadResume(file);

toast.success("Resume uploaded successfully.");

await loadResumes();

setShowUploadModal(false);



    } catch (error) {

      console.error(error);

     toast.error("Failed to upload resume.");

    } finally {

      setUploading(false);

    }

  };

 const handleDelete = (resume) => {
  setSelectedResume(resume);
  setShowDeleteModal(true);
};

const confirmDelete = async () => {
  try {
    setDeleting(true);

    await deleteResume(selectedResume.id);

toast.success("Resume deleted successfully.");

setShowDeleteModal(false);
setSelectedResume(null);

await loadResumes();
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete resume.");
  } finally {
    setDeleting(false);
    setSelectedResume(null);
}
};

  return (

    <AdminLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Resume
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your portfolio resume.
          </p>

        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Upload Resume
        </button>

      </div>

      {loading ? (

        <div className="text-white text-xl">
          Loading...
        </div>

      ) : (

        <ResumeTable
          resumes={resumes}
          onDelete={handleDelete}
        />

      )}

      <ResumeUploadModal
        open={showUploadModal}
        loading={uploading}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />

      <DeleteResumeModal
  open={showDeleteModal}
  loading={deleting}
  resumeName={selectedResume?.fileName}
  onClose={() => {
    setShowDeleteModal(false);
    setSelectedResume(null);
  }}
  onConfirm={confirmDelete}
/>

    </AdminLayout>

  );

}
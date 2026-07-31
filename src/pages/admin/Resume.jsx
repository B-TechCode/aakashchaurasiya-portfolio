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
  const [deleting, setDeleting] = useState(false);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedResume, setSelectedResume] = useState(null);

  // ===============================
  // Load Resumes
  // ===============================

  useEffect(() => {
    loadResumes();
  }, []);

  const loadResumes = async () => {
    try {
      setLoading(true);

      const response = await getAllResumes();

      setResumes(response.data.data || []);
    } catch (error) {
      console.error("Failed to load resumes:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load resumes."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Open Upload Modal
  // ===============================

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    if (uploading) return;

    setShowUploadModal(false);
  };

  // ===============================
  // Upload Resume
  // ===============================

  const handleUpload = async (file) => {
    if (!file) {
      toast.error("Please choose a PDF file.");
      return;
    }

    try {
      setUploading(true);

      await uploadResume(file);

      toast.success("Resume uploaded successfully.");

      await loadResumes();

      setShowUploadModal(false);
    } catch (error) {
      console.error("Failed to upload resume:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to upload resume."
      );
    } finally {
      setUploading(false);
    }
  };

  // ===============================
  // Open Delete Modal
  // ===============================

  const handleDelete = (resume) => {
    setSelectedResume(resume);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setSelectedResume(null);
  };

  // ===============================
  // Confirm Delete
  // ===============================

  const confirmDelete = async () => {
    if (!selectedResume) return;

    try {
      setDeleting(true);

      await deleteResume(selectedResume.id);

      toast.success("Resume deleted successfully.");

      await loadResumes();

      setShowDeleteModal(false);
      setSelectedResume(null);
    } catch (error) {
      console.error("Failed to delete resume:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete resume."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full min-w-0">

        {/* ================= Header ================= */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0">

            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Resume
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage your portfolio resume.
            </p>

          </div>

          <button
            type="button"
            onClick={handleOpenUploadModal}
            className="w-full shrink-0 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto sm:px-6"
          >
            + Upload Resume
          </button>

        </div>

        {/* ================= Resume List ================= */}

        <ResumeTable
          resumes={resumes}
          loading={loading}
          onDelete={handleDelete}
        />

        {/* ================= Upload Modal ================= */}

        <ResumeUploadModal
          open={showUploadModal}
          loading={uploading}
          onClose={handleCloseUploadModal}
          onUpload={handleUpload}
        />

        {/* ================= Delete Modal ================= */}

        <DeleteResumeModal
          open={showDeleteModal}
          loading={deleting}
          resumeName={selectedResume?.fileName}
          onClose={handleCloseDeleteModal}
          onConfirm={confirmDelete}
        />

      </div>
    </AdminLayout>
  );
}

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import CertificateTable from "../../components/admin/certificates/CertificateTable";
import CertificateFormModal from "../../components/admin/certificates/CertificateFormModal";
import DeleteCertificateModal from "../../components/admin/certificates/DeleteCertificateModal";

import {
  getAllCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
} from "../../api/certificateApi";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingCertificate, setDeletingCertificate] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      setLoading(true);

      const response = await getAllCertificates();

      setCertificates(response.data.data || []);
    } catch (error) {
      console.error("Failed to load certificates:", error);

      toast.error("Failed to load certificates.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCertificate(null);
    setShowModal(true);
  };

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate);
    setShowModal(true);
  };

  const handleCloseFormModal = () => {
    if (saving) return;

    setShowModal(false);
    setEditingCertificate(null);
  };

  // ===============================
  // Delete Certificate
  // ===============================

  const handleDeleteClick = (certificate) => {
    setDeletingCertificate(certificate);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    if (deleting) return;

    setShowDeleteModal(false);
    setDeletingCertificate(null);
  };

  const handleDelete = async () => {
    if (!deletingCertificate) return;

    try {
      setDeleting(true);

      await deleteCertificate(deletingCertificate.id);

      await loadCertificates();

      toast.success("Certificate deleted successfully.");

      setShowDeleteModal(false);
      setDeletingCertificate(null);
    } catch (error) {
      console.error("Failed to delete certificate:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete certificate."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ===============================
  // Create / Update Certificate
  // ===============================

  const handleSubmit = async (certificate) => {
    if (!certificate.title.trim()) {
      return toast.error("Certificate title is required.");
    }

    if (!certificate.issuer.trim()) {
      return toast.error("Issuer is required.");
    }

    try {
      setSaving(true);

      if (editingCertificate) {
        await updateCertificate(
          editingCertificate.id,
          certificate
        );

        toast.success("Certificate updated successfully.");
      } else {
        await createCertificate(certificate);

        toast.success("Certificate created successfully.");
      }

      await loadCertificates();

      setShowModal(false);
      setEditingCertificate(null);
    } catch (error) {
      console.error("Failed to save certificate:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save certificate."
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
              Certificates
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage your certificates.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="w-full shrink-0 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto sm:px-6"
          >
            + Add Certificate
          </button>

        </div>

        {/* ================= Certificate List ================= */}

        <CertificateTable
          certificates={certificates}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {/* ================= Create / Edit Modal ================= */}

        <CertificateFormModal
          open={showModal}
          initialData={editingCertificate}
          loading={saving}
          onClose={handleCloseFormModal}
          onSubmit={handleSubmit}
        />

        {/* ================= Delete Modal ================= */}

        <DeleteCertificateModal
          open={showDeleteModal}
          loading={deleting}
          certificateTitle={deletingCertificate?.title}
          onClose={handleCloseDeleteModal}
          onConfirm={handleDelete}
        />

      </div>
    </AdminLayout>
  );
}

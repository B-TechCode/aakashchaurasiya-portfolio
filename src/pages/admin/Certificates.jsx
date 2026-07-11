import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import CertificateTable from "../../components/admin/certificates/CertificateTable";
import CertificateFormModal from "../../components/admin/certificates/CertificateFormModal";

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

  useEffect(() => {
    loadCertificates();
  }, []);

  const loadCertificates = async () => {
    try {
      const response = await getAllCertificates();

      setCertificates(response.data.data);
    } catch (error) {
      console.error(error);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;

    try {
      await deleteCertificate(id);
      loadCertificates();
    } catch (error) {
      console.error(error);
      alert("Failed to delete certificate.");
    }
  };

  const handleSubmit = async (certificate) => {
    try {
      setSaving(true);

      if (editingCertificate) {
        await updateCertificate(editingCertificate.id, certificate);
      } else {
        await createCertificate(certificate);
      }

      await loadCertificates();

      setShowModal(false);
      setEditingCertificate(null);
    } catch (error) {
      console.error(error);
      alert("Failed to save certificate.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Certificates
          </h1>

          <p className="text-slate-400 mt-2">
            Manage your certificates.
          </p>

        </div>

        <button
          onClick={handleCreate}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold"
        >
          + Add Certificate
        </button>

      </div>

      {loading ? (
        <div className="text-white text-xl">
          Loading...
        </div>
      ) : (
        <CertificateTable
          certificates={certificates}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CertificateFormModal
        open={showModal}
        initialData={editingCertificate}
        loading={saving}
        onClose={() => {
          setShowModal(false);
          setEditingCertificate(null);
        }}
        onSubmit={handleSubmit}
      />

    </AdminLayout>
  );
}


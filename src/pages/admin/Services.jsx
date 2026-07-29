import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

import ServiceTable from "../../components/admin/services/ServiceTable";
import ServiceFormModal from "../../components/admin/services/ServiceFormModal";

import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../../api/serviceApi";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);

      const response = await getAllServices();

      setServices(response.data.data || []);
    } catch (error) {
      console.error("Failed to load services:", error);

      toast.error("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingService(null);
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setShowModal(true);
  };

  const handleClose = () => {
    if (saving) return;

    setShowModal(false);
    setEditingService(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) {
      return;
    }

    try {
      await deleteService(id);

      toast.success("Service deleted successfully.");

      await loadServices();
    } catch (error) {
      console.error("Failed to delete service:", error);

      toast.error(
        error?.response?.data?.message || "Failed to delete service."
      );
    }
  };

  const handleSubmit = async (service) => {
    try {
      setSaving(true);

      if (editingService) {
        await updateService(editingService.id, service);

        toast.success("Service updated successfully.");
      } else {
        await createService(service);

        toast.success("Service created successfully.");
      }

      await loadServices();

      setShowModal(false);
      setEditingService(null);
    } catch (error) {
      console.error("Failed to save service:", error);

      toast.error(
        error?.response?.data?.message || "Failed to save service."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Services
          </h1>

          <p className="mt-2 text-slate-400">
            Manage the services displayed on your portfolio.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreate}
          className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          + Add Service
        </button>
      </div>

      {loading ? (
        <div className="text-xl text-white">
          Loading...
        </div>
      ) : (
        <ServiceTable
          services={services}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <ServiceFormModal
        open={showModal}
        initialData={editingService}
        loading={saving}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </AdminLayout>
  );
}
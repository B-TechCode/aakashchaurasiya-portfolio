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
      <div className="w-full min-w-0">

        {/* ================= Header ================= */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Services
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Manage the services displayed on your portfolio.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreate}
            className="w-full shrink-0 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700 sm:w-auto sm:px-6"
          >
            + Add Service
          </button>
        </div>

        {/* ================= Content ================= */}

        {loading ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Loading services...
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Please wait...
            </p>
          </div>
        ) : (
          <ServiceTable
            services={services}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* ================= Modal ================= */}

        <ServiceFormModal
          open={showModal}
          initialData={editingService}
          loading={saving}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />

      </div>
    </AdminLayout>
  );
}
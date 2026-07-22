import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAnalyticsCounts,
  getAllAnalyticsEvents,
  deleteAnalyticsEvent,
} from "../../api/analyticsApi";

import AnalyticsCards from "../../components/admin/analytics/AnalyticsCards";
import AnalyticsTable from "../../components/admin/analytics/AnalyticsTable";
import DeleteAnalyticsModal from "../../components/admin/analytics/DeleteAnalyticsModal";

export default function Analytics() {

  const [counts, setCounts] = useState(null);

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [page, setPage] = useState(0);

  const [size] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {

    loadAnalytics();

  }, [page]);

  const loadAnalytics = async () => {

    setLoading(true);

    try {

      const countsResponse = await getAnalyticsCounts();

      const eventsResponse =
        await getAllAnalyticsEvents(page, size);

      setCounts(countsResponse.data);

      setEvents(eventsResponse.data.content);

      setTotalPages(eventsResponse.data.totalPages);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load analytics.");

    } finally {

      setLoading(false);

    }

  };

  const handleDeleteClick = (event) => {

    setSelectedEvent(event);

    setDeleteModalOpen(true);

  };

  const handleDeleteConfirm = async () => {

    if (!selectedEvent) return;

    try {

      setDeleteLoading(true);

      await deleteAnalyticsEvent(selectedEvent.id);

      toast.success("Analytics event deleted successfully.");

      setDeleteModalOpen(false);

      setSelectedEvent(null);

      await loadAnalytics();

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete analytics event.");

    } finally {

      setDeleteLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="text-white text-xl">
          Loading Analytics...
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            Analytics
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor portfolio activities.
          </p>

        </div>

        <AnalyticsCards
          counts={counts}
        />

        <div className="mt-8">

          <AnalyticsTable
            events={events}
            onDelete={handleDeleteClick}
          />

        </div>

        {totalPages > 1 && (

          <div className="flex justify-between items-center mt-6">

            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 0}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Previous
            </button>

            <div className="flex gap-2">

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    page === index
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {index + 1}
                </button>

              ))}

            </div>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages - 1}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Next
            </button>

          </div>

        )}

                <DeleteAnalyticsModal
          open={deleteModalOpen}
          loading={deleteLoading}
          event={selectedEvent}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedEvent(null);
          }}
          onConfirm={handleDeleteConfirm}
        />

      </div>

    </AdminLayout>

  );

}
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
      const eventsResponse = await getAllAnalyticsEvents(
        page,
        size
      );

      setCounts(countsResponse.data || null);
      setEvents(eventsResponse.data?.content || []);
      setTotalPages(eventsResponse.data?.totalPages || 0);
    } catch (error) {
      console.error("Failed to load analytics:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load analytics."
      );
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

      toast.success(
        "Analytics event deleted successfully."
      );

      setDeleteModalOpen(false);
      setSelectedEvent(null);

      // If the last item on a later page is deleted,
      // move back instead of leaving an empty page.
      if (events.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        await loadAnalytics();
      }
    } catch (error) {
      console.error(
        "Failed to delete analytics event:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete analytics event."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="w-full min-w-0">
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center sm:p-8">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Loading Analytics...
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Please wait...
            </p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mx-auto w-full min-w-0 max-w-7xl">

        {/* Header */}

        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Analytics
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
            Monitor portfolio activities.
          </p>
        </div>

        {/* Analytics Summary */}

        <AnalyticsCards counts={counts} />

        {/* Analytics Events */}

        <div className="mt-6 sm:mt-8">
          <div className="mb-4 sm:mb-5">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Recent Events
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Activity recorded across your portfolio.
            </p>
          </div>

          <AnalyticsTable
            events={events}
            onDelete={handleDeleteClick}
          />
        </div>

        {/* Pagination */}

        {totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <button
              type="button"
              onClick={() =>
                setPage((prev) => Math.max(0, prev - 1))
              }
              disabled={page === 0}
              className="w-full rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Previous
            </button>

            <div className="flex max-w-full items-center justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={
                    page === index ? "page" : undefined
                  }
                  className={`h-10 min-w-10 flex-shrink-0 rounded-lg px-3 text-sm font-semibold transition ${
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
              type="button"
              onClick={() =>
                setPage((prev) =>
                  Math.min(totalPages - 1, prev + 1)
                )
              }
              disabled={page === totalPages - 1}
              className="w-full rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
            if (deleteLoading) return;

            setDeleteModalOpen(false);
            setSelectedEvent(null);
          }}
          onConfirm={handleDeleteConfirm}
        />

      </div>
    </AdminLayout>
  );
}

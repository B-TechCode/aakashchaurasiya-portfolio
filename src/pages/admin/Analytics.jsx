import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAnalyticsCounts,
  getAllAnalyticsEvents,
  deleteAnalyticsEvent,
} from "../../api/analyticsApi";

export default function Analytics() {

  const [counts, setCounts] = useState(null);

  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);

  const [size] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {

    loadAnalytics();

  }, [page]);

 const loadAnalytics = async () => {

  setLoading(true);

  try {

    const countsResponse = await getAnalyticsCounts();

    const eventsResponse = await getAllAnalyticsEvents(page, size);

    setCounts(countsResponse.data.data);

    setEvents(eventsResponse.data.data.content);

    setTotalPages(eventsResponse.data.data.totalPages);

  } catch (error) {

    console.error(error);

    toast.error("Failed to load analytics.");

  } finally {

    setLoading(false);

  }

};

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this analytics event?")) return;

    try {

      await deleteAnalyticsEvent(id);

      toast.success("Analytics event deleted.");

      await loadAnalytics();

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete analytics event.");

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

        <div className="grid md:grid-cols-5 gap-5 mb-8">

          <Card title="Resume Downloads" value={counts.resumeDownloads} />

          <Card title="Project Clicks" value={counts.projectClicks} />

          <Card title="GitHub Clicks" value={counts.githubClicks} />

          <Card title="LinkedIn Clicks" value={counts.linkedinClicks} />

          <Card title="Contact Forms" value={counts.contactFormSubmissions} />

        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-900 text-white">

              <tr>

                <th className="text-left p-5">Event</th>

                <th className="text-left p-5">Entity</th>

                <th className="text-left p-5">Date</th>

                <th className="text-right p-5">Action</th>

              </tr>

            </thead>

            <tbody>

              {events.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center p-10 text-slate-400"
                  >
                    No analytics events found.
                  </td>

                </tr>

              ) : (

                events.map((event) => (

                  <tr
                    key={event.id}
                    className="border-t border-slate-700"
                  >

                    <td className="p-5 text-white">
                      {event.eventType}
                    </td>

                    <td className="p-5 text-slate-300">
                      {event.entityType || "-"}
                    </td>

                    <td className="p-5 text-slate-300">
                      {new Date(event.createdAt).toLocaleString()}
                    </td>

                    <td className="p-5 text-right">

                      <button
                        onClick={() => handleDelete(event.id)}
                        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        {totalPages > 1 && (

          <div className="flex justify-between items-center mt-6">

            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 0}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50"
            >
              Previous
            </button>

            <div className="flex gap-2">

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`w-10 h-10 rounded-lg ${
                    page === index
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-700 text-slate-300"
                  }`}
                >
                  {index + 1}
                </button>

              ))}

            </div>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages - 1}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50"
            >
              Next
            </button>

          </div>

        )}

      </div>

    </AdminLayout>

  );

}

function Card({ title, value }) {

  return (

    <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">

      <div className="text-slate-400 text-sm">

        {title}

      </div>

      <div className="text-3xl font-bold text-cyan-400 mt-3">

        {value}

      </div>

    </div>

  );

}
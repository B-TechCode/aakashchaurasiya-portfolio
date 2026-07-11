import { useEffect, useState } from "react";
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

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const countsResponse = await getAnalyticsCounts();
      const eventsResponse = await getAllAnalyticsEvents();

      setCounts(countsResponse.data);
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this analytics event?")) return;

    try {
      await deleteAnalyticsEvent(id);
      loadAnalytics();
    } catch (error) {
      console.error(error);
      alert("Failed to delete analytics event.");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-white text-xl">Loading Analytics...</div>
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

        {/* Statistics */}

        <div className="grid md:grid-cols-5 gap-5 mb-8">

          <Card title="Resume Downloads" value={counts.resumeDownloads} />

          <Card title="Project Clicks" value={counts.projectClicks} />

          <Card title="GitHub Clicks" value={counts.githubClicks} />

          <Card title="LinkedIn Clicks" value={counts.linkedinClicks} />

          <Card title="Contact Forms" value={counts.contactFormSubmissions} />

        </div>

        {/* Events */}

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
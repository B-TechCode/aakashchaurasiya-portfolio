import {
  FaTrash,
  FaChartLine,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
  FaProjectDiagram,
  FaEnvelope,
} from "react-icons/fa";

function EventBadge({ type }) {
  const badgeStyles = {
    PORTFOLIO_VISIT: {
      label: "Portfolio Visit",
      color: "bg-cyan-500",
      icon: <FaChartLine />,
    },

    RESUME_DOWNLOAD: {
      label: "Resume Download",
      color: "bg-green-500",
      icon: <FaFileDownload />,
    },

    PROJECT_VIEW: {
      label: "Project Click",
      color: "bg-purple-500",
      icon: <FaProjectDiagram />,
    },

    GITHUB_CLICK: {
      label: "GitHub Click",
      color: "bg-slate-600",
      icon: <FaGithub />,
    },

    LINKEDIN_CLICK: {
      label: "LinkedIn Click",
      color: "bg-blue-600",
      icon: <FaLinkedin />,
    },

    CONTACT_FORM_SUBMISSION: {
      label: "Contact Form",
      color: "bg-red-500",
      icon: <FaEnvelope />,
    },
  };

  const badge =
    badgeStyles[type] || {
      label: type,
      color: "bg-slate-600",
      icon: null,
    };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-white ${badge.color}`}
    >
      {badge.icon}
      {badge.label}
    </span>
  );
}

export default function AnalyticsTable({
  events,
  onDelete,
}) {
  if (!events.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">

        <h2 className="text-2xl font-semibold text-white">
          No Analytics Events
        </h2>

        <p className="text-slate-400 mt-3">
          Analytics events will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-900">

          <tr>

            <th className="px-6 py-4 text-left text-white">
              Event
            </th>

            <th className="px-6 py-4 text-left text-white">
              Entity
            </th>

            <th className="px-6 py-4 text-left text-white">
              Date
            </th>

            <th className="px-6 py-4 text-center text-white">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {events.map((event) => (

            <tr
              key={event.id}
              className="border-t border-slate-700 hover:bg-slate-700/40 transition"
            >

              <td className="px-6 py-5">

                <EventBadge type={event.eventType} />

              </td>

              <td className="px-6 py-5 text-slate-300">

                {event.entityType || "-"}

              </td>

              <td className="px-6 py-5 text-slate-300">

                {new Date(event.createdAt).toLocaleString()}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center">

                  <button
                    onClick={() => onDelete(event)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                    title="Delete Event"
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
import {
  FaTrash,
  FaChartLine,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
  FaProjectDiagram,
  FaEnvelope,
  FaClock,
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
      label: type || "Unknown Event",
      color: "bg-slate-600",
      icon: null,
    };

  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${badge.color}`}
    >
      {badge.icon && (
        <span className="flex-shrink-0">
          {badge.icon}
        </span>
      )}

      <span className="min-w-0 break-words">
        {badge.label}
      </span>
    </span>
  );
}

export default function AnalyticsTable({
  events,
  onDelete,
}) {
  if (!events || events.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center sm:p-8 md:p-12">

        <FaChartLine
          size={30}
          className="mx-auto text-slate-500"
        />

        <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
          No Analytics Events
        </h2>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Analytics events will appear here.
        </p>

      </div>
    );
  }

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString();
  };

  return (
    <>
      {/* ================================================
          MOBILE + TABLET
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 lg:hidden">

        {events.map((event) => (
          <article
            key={event.id}
            className="min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-5"
          >

            {/* Event */}

            <div className="flex min-w-0 items-start justify-between gap-3">

              <div className="min-w-0">
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Event
                </p>

                <EventBadge type={event.eventType} />
              </div>

              <button
                type="button"
                onClick={() => onDelete(event)}
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700"
                title="Delete Event"
                aria-label={`Delete ${
                  event.eventType || "analytics"
                } event`}
              >
                <FaTrash />
              </button>

            </div>

            {/* Information */}

            <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-700 pt-4 sm:grid-cols-2">

              {/* Entity */}

              <div className="min-w-0">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Entity
                </p>

                <p className="mt-1 break-words text-sm text-slate-300">
                  {event.entityType || "-"}
                </p>

              </div>

              {/* Date */}

              <div className="min-w-0">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Date
                </p>

                <div className="mt-1 flex items-start gap-2 text-sm text-slate-300">

                  <FaClock className="mt-0.5 flex-shrink-0 text-slate-500" />

                  <span className="break-words">
                    {formatDate(event.createdAt)}
                  </span>

                </div>

              </div>

            </div>

          </article>
        ))}

      </div>

      {/* ================================================
          DESKTOP TABLE
      ================================================= */}

      <div className="hidden w-full min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 lg:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px]">

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
                  className="border-t border-slate-700 transition hover:bg-slate-700/40"
                >

                  {/* Event */}

                  <td className="px-6 py-5">
                    <EventBadge type={event.eventType} />
                  </td>

                  {/* Entity */}

                  <td className="px-6 py-5">

                    <div className="max-w-[250px] break-words text-slate-300">
                      {event.entityType || "-"}
                    </div>

                  </td>

                  {/* Date */}

                  <td className="whitespace-nowrap px-6 py-5 text-slate-300">
                    {formatDate(event.createdAt)}
                  </td>

                  {/* Action */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      <button
                        type="button"
                        onClick={() => onDelete(event)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        title="Delete Event"
                        aria-label={`Delete ${
                          event.eventType || "analytics"
                        } event`}
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

      </div>
    </>
  );
}
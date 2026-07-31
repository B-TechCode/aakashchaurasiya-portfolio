import {
  FaEye,
  FaTrash,
  FaCheck,
  FaEnvelope,
  FaClock,
  FaUser,
} from "react-icons/fa";

export default function ContactMessageTable({
  messages,
  onView,
  onRead,
  onDelete,
}) {
  // ===============================
  // Empty State
  // ===============================

  if (!messages || messages.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center sm:p-8 md:p-12">

        <FaEnvelope
          size={30}
          className="mx-auto text-slate-500"
        />

        <h2 className="mt-4 text-xl font-semibold text-white sm:text-2xl">
          No Messages Found
        </h2>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Contact messages will appear here.
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
      {/* ==================================================
          MOBILE + SMALL TABLET CARDS
          Below lg breakpoint
      ================================================== */}

      <div className="grid grid-cols-1 gap-4 lg:hidden">

        {messages.map((message) => (
          <article
            key={message.id}
            className="min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-5"
          >

            {/* Header */}

            <div className="flex min-w-0 items-start justify-between gap-3">

              <div className="flex min-w-0 items-start gap-3">

                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-700 text-cyan-400">
                  <FaUser />
                </div>

                <div className="min-w-0">

                  <h3 className="break-words font-semibold text-white">
                    {message.name}
                  </h3>

                  <p className="mt-1 break-all text-sm text-slate-400">
                    {message.email}
                  </p>

                </div>

              </div>

              <span
                className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  message.status === "NEW"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {message.status}
              </span>

            </div>

            {/* Received */}

            <div className="mt-4 flex items-start gap-2 border-t border-slate-700 pt-4 text-sm text-slate-400">

              <FaClock className="mt-0.5 flex-shrink-0" />

              <span className="break-words">
                {formatDate(message.createdAt)}
              </span>

            </div>

            {/* Message Preview */}

            <div className="mt-4 rounded-xl bg-slate-900/60 p-3">

              <p className="line-clamp-3 break-words text-sm leading-6 text-slate-300">
                {message.message || "No message content."}
              </p>

            </div>

            {/* Actions */}

            <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">

              <button
                type="button"
                onClick={() => onView(message)}
                className="flex min-h-10 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                <FaEye />
                View
              </button>

              {message.status === "NEW" && (
                <button
                  type="button"
                  onClick={() => onRead(message.id)}
                  className="flex min-h-10 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-cyan-700"
                >
                  <FaCheck />
                  Read
                </button>
              )}

              <button
                type="button"
                onClick={() => onDelete(message)}
                className={`flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 ${
                  message.status !== "NEW"
                    ? "col-span-1"
                    : "col-span-2 sm:col-span-1"
                }`}
              >
                <FaTrash />
                Delete
              </button>

            </div>

          </article>
        ))}

      </div>

      {/* ==================================================
          DESKTOP TABLE
          lg and above
      ================================================== */}

      <div className="hidden w-full min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 lg:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-900">

              <tr>

                <th className="px-6 py-4 text-left text-white">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-white">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-white">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-white">
                  Received
                </th>

                <th className="px-6 py-4 text-center text-white">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {messages.map((message) => (
                <tr
                  key={message.id}
                  className="border-t border-slate-700 transition hover:bg-slate-700/40"
                >

                  {/* Name */}

                  <td className="px-6 py-5">

                    <div className="max-w-[200px] break-words font-semibold text-white">
                      {message.name}
                    </div>

                  </td>

                  {/* Email */}

                  <td className="px-6 py-5">

                    <div className="max-w-[280px] break-all text-slate-300">
                      {message.email}
                    </div>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        message.status === "NEW"
                          ? "bg-red-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {message.status}
                    </span>

                  </td>

                  {/* Received */}

                  <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-300">
                    {formatDate(message.createdAt)}
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        type="button"
                        onClick={() => onView(message)}
                        className="rounded-lg bg-indigo-600 p-2 text-white transition hover:bg-indigo-700"
                        title="View Message"
                        aria-label={`View message from ${message.name}`}
                      >
                        <FaEye />
                      </button>

                      {message.status === "NEW" && (
                        <button
                          type="button"
                          onClick={() =>
                            onRead(message.id)
                          }
                          className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                          title="Mark as Read"
                          aria-label={`Mark message from ${message.name} as read`}
                        >
                          <FaCheck />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => onDelete(message)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        title="Delete Message"
                        aria-label={`Delete message from ${message.name}`}
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

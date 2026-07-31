import {
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
  FaLink,
} from "react-icons/fa";

export default function SocialLinkTable({
  links,
  loading,
  deletingId,
  onEdit,
  onDelete,
}) {
  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">

        <FaLink
          size={34}
          className="mx-auto mb-4 text-cyan-400"
        />

        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Loading Social Links...
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Please wait...
        </p>

      </div>
    );
  }

  // ===============================
  // Empty State
  // ===============================

  if (!links || links.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">

        <FaLink
          size={34}
          className="mx-auto mb-4 text-slate-500"
        />

        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Social Links
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Add your first social link.
        </p>

      </div>
    );
  }

  return (
    <>
      {/* ==================================================
          MOBILE + TABLET
          Below 1024px
      ================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:hidden">

        {links.map((link) => {
          const isDeleting = deletingId === link.id;

          return (
            <article
              key={link.id}
              className="flex min-w-0 flex-col rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-5"
            >

              {/* Platform */}

              <div className="flex min-w-0 items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <FaLink />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Platform
                  </p>

                  <h2 className="mt-1 break-words text-lg font-semibold text-white">
                    {link.platform || "-"}
                  </h2>

                </div>

              </div>

              {/* URL */}

              <div className="mt-5 border-t border-slate-700 pt-4">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  URL
                </p>

                {link.url ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex min-w-0 items-start gap-2 text-sm text-cyan-400 transition hover:text-cyan-300"
                  >
                    <FaExternalLinkAlt className="mt-1 shrink-0" />

                    <span className="min-w-0 break-all">
                      {link.url}
                    </span>
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">
                    -
                  </p>
                )}

              </div>

              {/* Order */}

              <div className="mt-5">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Display Order
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {link.displayOrder ?? 0}
                </p>

              </div>

              {/* Actions */}

              <div className="mt-auto pt-5">

                <div className="grid grid-cols-2 gap-3 border-t border-slate-700 pt-4">

                  <button
                    type="button"
                    onClick={() => onEdit(link)}
                    disabled={isDeleting}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaEdit />

                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(link.id)}
                    disabled={isDeleting}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FaTrash />

                    <span>
                      {isDeleting
                        ? "Deleting..."
                        : "Delete"}
                    </span>
                  </button>

                </div>

              </div>

            </article>
          );
        })}

      </div>

      {/* ==================================================
          LAPTOP + DESKTOP
          1024px+
      ================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 lg:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[760px]">

            <thead className="bg-slate-900">

              <tr>

                <th className="px-6 py-4 text-left text-slate-300">
                  Platform
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  URL
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Order
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {links.map((link) => {
                const isDeleting = deletingId === link.id;

                return (
                  <tr
                    key={link.id}
                    className="border-t border-slate-700 transition hover:bg-slate-700/40"
                  >

                    {/* Platform */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                          <FaLink />
                        </div>

                        <span className="font-medium text-white">
                          {link.platform || "-"}
                        </span>

                      </div>

                    </td>

                    {/* URL */}

                    <td className="max-w-xl px-6 py-5">

                      {link.url ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex max-w-full items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
                        >
                          <FaExternalLinkAlt className="shrink-0" />

                          <span className="truncate">
                            {link.url}
                          </span>
                        </a>
                      ) : (
                        <span className="text-slate-500">
                          -
                        </span>
                      )}

                    </td>

                    {/* Order */}

                    <td className="px-6 py-5 text-center text-white">
                      {link.displayOrder ?? 0}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-3">

                        <button
                          type="button"
                          onClick={() => onEdit(link)}
                          disabled={isDeleting}
                          className="rounded-lg bg-cyan-600 p-2.5 text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Edit social link"
                          aria-label={`Edit ${link.platform}`}
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(link.id)}
                          disabled={isDeleting}
                          className="rounded-lg bg-red-600 p-2.5 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                          title="Delete social link"
                          aria-label={`Delete ${link.platform}`}
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}

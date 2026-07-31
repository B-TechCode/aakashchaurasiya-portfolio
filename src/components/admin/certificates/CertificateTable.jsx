import {
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function CertificateTable({
  certificates,
  loading,
  onEdit,
  onDelete,
}) {
  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">

        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Loading Certificates...
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Please wait...
        </p>

      </div>
    );
  }

  // ===============================
  // Empty
  // ===============================

  if (!certificates || certificates.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">

        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Certificates Found
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Click "Add Certificate" to create one.
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

        {certificates.map((certificate) => (
          <article
            key={certificate.id}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800"
          >

            {/* ================= Image ================= */}

            {certificate.imageUrl && (
              <div className="aspect-video w-full overflow-hidden border-b border-slate-700 bg-slate-900">

                <img
                  src={certificate.imageUrl}
                  alt={certificate.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

              </div>
            )}

            {/* ================= Card Header ================= */}

            <div className="border-b border-slate-700 p-4 sm:p-5">

              <h2 className="break-words text-lg font-semibold text-white">
                {certificate.title}
              </h2>

              <p className="mt-1 break-words text-sm text-slate-400">
                {certificate.issuer || "-"}
              </p>

            </div>

            {/* ================= Card Body ================= */}

            <div className="flex flex-1 flex-col p-4 sm:p-5">

              {/* Issue Date */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Issue Date
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {certificate.issuedDate || "-"}
                </p>
              </div>

              {/* Display Order */}

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Display Order
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {certificate.displayOrder ?? 0}
                </p>
              </div>

              {/* Credential URL */}

              {certificate.credentialUrl && (
                <div className="mt-5">

                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Credential
                  </p>

                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex max-w-full items-center gap-2 text-sm text-cyan-400 transition hover:text-cyan-300"
                  >
                    <FaExternalLinkAlt className="shrink-0" />

                    <span className="truncate">
                      View Credential
                    </span>
                  </a>

                </div>
              )}

              {/* ================= Actions ================= */}

              <div className="mt-auto pt-5">

                <div className="grid grid-cols-2 gap-3 border-t border-slate-700 pt-4">

                  <button
                    type="button"
                    onClick={() => onEdit(certificate)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
                    aria-label={`Edit ${certificate.title}`}
                  >
                    <FaEdit />

                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(certificate)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                    aria-label={`Delete ${certificate.title}`}
                  >
                    <FaTrash />

                    <span>Delete</span>
                  </button>

                </div>

              </div>

            </div>

          </article>
        ))}

      </div>

      {/* ==================================================
          LAPTOP + DESKTOP
          1024px+
      ================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 lg:block">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="bg-slate-900">

              <tr>

                <th className="px-6 py-4 text-left text-slate-300">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Issuer
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Issue Date
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {certificates.map((certificate) => (

                <tr
                  key={certificate.id}
                  className="border-t border-slate-700 transition hover:bg-slate-700/40"
                >

                  {/* Title */}

                  <td className="px-6 py-5">

                    <div className="font-semibold text-white">
                      {certificate.title}
                    </div>

                  </td>

                  {/* Issuer */}

                  <td className="px-6 py-5 text-slate-300">
                    {certificate.issuer || "-"}
                  </td>

                  {/* Issue Date */}

                  <td className="px-6 py-5 text-slate-300">
                    {certificate.issuedDate || "-"}
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        type="button"
                        onClick={() => onEdit(certificate)}
                        className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                        title="Edit certificate"
                        aria-label={`Edit ${certificate.title}`}
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(certificate)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        title="Delete certificate"
                        aria-label={`Delete ${certificate.title}`}
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
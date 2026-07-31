import {
  FaTrash,
  FaDownload,
  FaExternalLinkAlt,
  FaFilePdf,
} from "react-icons/fa";

export default function ResumeTable({
  resumes,
  loading,
  onDelete,
}) {
  // ===============================
  // Format Upload Date
  // ===============================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">

        <FaFilePdf
          size={36}
          className="mx-auto mb-4 text-cyan-400"
        />

        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Loading Resumes...
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

  if (!resumes || resumes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">

        <FaFilePdf
          size={36}
          className="mx-auto mb-4 text-slate-500"
        />

        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Resume Uploaded
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Upload your first resume.
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

        {resumes.map((resume) => (

          <article
            key={resume.id}
            className="flex min-w-0 flex-col rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-5"
          >

            {/* ================= Header ================= */}

            <div className="flex min-w-0 items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <FaFilePdf size={22} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Resume
                </p>

                <h2 className="mt-1 text-lg font-semibold text-white">
                  Version {resume.version ?? "-"}
                </h2>

                {resume.fileName && (
                  <p
                    className="mt-1 truncate text-sm text-slate-400"
                    title={resume.fileName}
                  >
                    {resume.fileName}
                  </p>
                )}

              </div>

            </div>

            {/* ================= Details ================= */}

            <div className="mt-5 border-t border-slate-700 pt-4">

              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Uploaded
              </p>

              <p className="mt-1 text-sm text-slate-300">
                {formatDate(resume.uploadedAt)}
              </p>

            </div>

            {/* ================= View ================= */}

            {resume.fileUrl && (
              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex max-w-full items-center gap-2 text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
              >
                <FaExternalLinkAlt className="shrink-0" />

                <span>
                  View Resume
                </span>
              </a>
            )}

            {/* ================= Actions ================= */}

            <div className="mt-auto pt-5">

              <div className="grid grid-cols-2 gap-3 border-t border-slate-700 pt-4">

                {resume.fileUrl ? (
                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
                    aria-label={`Open resume version ${resume.version}`}
                  >
                    <FaDownload />

                    <span>Open</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-slate-700 px-3 py-2.5 text-sm font-medium text-slate-500"
                  >
                    <FaDownload />

                    <span>Open</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => onDelete(resume)}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                  aria-label={`Delete resume version ${resume.version}`}
                >
                  <FaTrash />

                  <span>Delete</span>
                </button>

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

          <table className="w-full min-w-[720px]">

            <thead className="bg-slate-900">

              <tr>

                <th className="px-6 py-4 text-left text-slate-300">
                  Version
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Uploaded
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Resume
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {resumes.map((resume) => (

                <tr
                  key={resume.id}
                  className="border-t border-slate-700 transition hover:bg-slate-700/40"
                >

                  {/* Version */}

                  <td className="px-6 py-5 text-white">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                        <FaFilePdf />
                      </div>

                      <div className="min-w-0">

                        <p className="font-medium">
                          v{resume.version ?? "-"}
                        </p>

                        {resume.fileName && (
                          <p
                            className="mt-1 max-w-52 truncate text-xs text-slate-500"
                            title={resume.fileName}
                          >
                            {resume.fileName}
                          </p>
                        )}

                      </div>

                    </div>

                  </td>

                  {/* Uploaded */}

                  <td className="px-6 py-5 text-slate-300">
                    {formatDate(resume.uploadedAt)}
                  </td>

                  {/* Resume */}

                  <td className="px-6 py-5">

                    {resume.fileUrl ? (
                      <a
                        href={resume.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-cyan-400 transition hover:text-cyan-300"
                      >
                        <FaExternalLinkAlt size={12} />

                        View Resume
                      </a>
                    ) : (
                      <span className="text-slate-500">
                        Not available
                      </span>
                    )}

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      {resume.fileUrl && (
                        <a
                          href={resume.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                          title="Open resume"
                          aria-label={`Open resume version ${resume.version}`}
                        >
                          <FaDownload />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => onDelete(resume)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        title="Delete resume"
                        aria-label={`Delete resume version ${resume.version}`}
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

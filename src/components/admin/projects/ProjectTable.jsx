import { FaEdit, FaTrash, FaImage } from "react-icons/fa";

export default function ProjectTable({
  projects,
  loading,
  onEdit,
  onDelete,
  onUploadImage,
  onManageImages,
}) {
  // =====================================================
  // Loading State
  // =====================================================

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-10 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Loading Projects...
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Please wait...
        </p>
      </div>
    );
  }

  // =====================================================
  // Empty State
  // =====================================================

  if (!projects || projects.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 px-5 py-10 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Projects Found
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Click "Add Project" to create your first project.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* =================================================
          MOBILE + TABLET VIEW
          Visible below 1024px
      ================================================= */}

      <div className="grid grid-cols-1 gap-4 lg:hidden sm:gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="min-w-0 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800"
          >
            {/* Project Header */}

            <div className="border-b border-slate-700 p-5">
              <h2 className="break-words text-lg font-semibold text-white">
                {project.title}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-400">
                {project.slug}
              </p>
            </div>

            {/* Project Information */}

            <div className="space-y-5 p-5">
              {/* Status */}

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Status
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.featured ? (
                    <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs text-white">
                      Featured
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                      Regular
                    </span>
                  )}

                  {project.published ? (
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                      Unpublished
                    </span>
                  )}
                </div>
              </div>

              {/* Skills */}

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Skills
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.skills && project.skills.length > 0 ? (
                    project.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="max-w-full break-words rounded-md border border-cyan-500/30 bg-cyan-600/20 px-2 py-1 text-xs text-cyan-300"
                      >
                        {skill.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No Skills
                    </span>
                  )}
                </div>
              </div>

              {/* Images */}

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Images
                </p>

                <button
                  type="button"
                  onClick={() => onManageImages(project)}
                  className="break-words text-left text-sm font-medium text-cyan-400 underline transition hover:text-cyan-300"
                >
                  Manage Images ({project.images?.length || 0})
                </button>
              </div>

              {/* Actions */}

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  Actions
                </p>

                <div className="grid grid-cols-1 gap-2 min-[360px]:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => onUploadImage(project)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    aria-label={`Upload image for ${project.title}`}
                  >
                    <FaImage />
                    <span>Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit(project)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
                    aria-label={`Edit ${project.title}`}
                  >
                    <FaEdit />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(project)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                    aria-label={`Delete ${project.title}`}
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

      {/* =================================================
          LAPTOP + DESKTOP VIEW
          Visible from 1024px
      ================================================= */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-slate-300">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Featured
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Published
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Skills
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Images
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-t border-slate-700 transition hover:bg-slate-700/40"
                >
                  {/* Title */}

                  <td className="px-6 py-5">
                    <div className="font-semibold text-white">
                      {project.title}
                    </div>

                    <div className="mt-1 text-sm text-slate-400">
                      {project.slug}
                    </div>
                  </td>

                  {/* Featured */}

                  <td className="px-6 py-5">
                    {project.featured ? (
                      <span className="rounded-full bg-cyan-600 px-3 py-1 text-xs text-white">
                        Featured
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                        Regular
                      </span>
                    )}
                  </td>

                  {/* Published */}

                  <td className="px-6 py-5">
                    {project.published ? (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                        Published
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                        Unpublished
                      </span>
                    )}
                  </td>

                  {/* Skills */}

                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-2">
                      {project.skills && project.skills.length > 0 ? (
                        project.skills.map((skill) => (
                          <span
                            key={skill.id}
                            className="rounded-md border border-cyan-500/30 bg-cyan-600/20 px-2 py-1 text-xs text-cyan-300"
                          >
                            {skill.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          No Skills
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Images */}

                  <td className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => onManageImages(project)}
                      className="text-cyan-400 underline transition hover:text-cyan-300"
                    >
                      Manage Images ({project.images?.length || 0})
                    </button>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => onUploadImage(project)}
                        className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                        aria-label={`Upload image for ${project.title}`}
                        title="Upload Image"
                      >
                        <FaImage />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(project)}
                        className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                        aria-label={`Edit ${project.title}`}
                        title="Edit Project"
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(project)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        aria-label={`Delete ${project.title}`}
                        title="Delete Project"
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


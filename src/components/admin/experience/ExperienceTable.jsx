import { FaEdit, FaTrash } from "react-icons/fa";

export default function ExperienceTable({
  experiences,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          Loading Experiences...
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Please wait...
        </p>
      </div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Experiences Found
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Click "Add Experience" to create your first experience.
        </p>
      </div>
    );
  }

  const getEndDate = (experience) => {
    if (experience.currentlyWorking) {
      return "Present";
    }

    return experience.endDate || "-";
  };

  return (
    <>
      {/* ==================================================
          MOBILE + TABLET
          Below 1024px
      ================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:hidden">

        {experiences.map((experience) => (
          <article
            key={experience.id}
            className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800"
          >

            {/* Card Header */}

            <div className="border-b border-slate-700 p-4 sm:p-5">
              <div className="flex min-w-0 items-start justify-between gap-3">

                <div className="min-w-0">
                  <h2 className="break-words text-lg font-semibold text-white">
                    {experience.title}
                  </h2>

                  <p className="mt-1 break-words text-sm text-slate-400">
                    {experience.organization}
                  </p>
                </div>

                {experience.currentlyWorking ? (
                  <span className="shrink-0 rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                    Current
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                    Completed
                  </span>
                )}

              </div>
            </div>

            {/* Card Content */}

            <div className="flex flex-1 flex-col p-4 sm:p-5">

              {/* Location */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Location
                </p>

                <p className="mt-1 break-words text-sm text-slate-300">
                  {experience.location || "-"}
                </p>
              </div>

              {/* Duration */}

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Duration
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                  <span>
                    {experience.startDate || "-"}
                  </span>

                  <span className="text-slate-600">
                    →
                  </span>

                  <span>
                    {getEndDate(experience)}
                  </span>
                </div>
              </div>

              {/* Description */}

              {experience.description && (
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Description
                  </p>

                  <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                    {experience.description}
                  </p>
                </div>
              )}

              {/* Display Order */}

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Display Order
                </p>

                <p className="mt-1 text-sm font-medium text-white">
                  {experience.displayOrder ?? 0}
                </p>
              </div>

              {/* Actions */}

              <div className="mt-auto pt-5">
                <div className="grid grid-cols-2 gap-3 border-t border-slate-700 pt-4">

                  <button
                    type="button"
                    onClick={() => onEdit(experience)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
                    aria-label={`Edit ${experience.title}`}
                  >
                    <FaEdit />

                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(experience)}
                    className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                    aria-label={`Delete ${experience.title}`}
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

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-900">
              <tr>

                <th className="px-6 py-4 text-left text-slate-300">
                  Position
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Organization
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Duration
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody>

              {experiences.map((experience) => (
                <tr
                  key={experience.id}
                  className="border-t border-slate-700 transition hover:bg-slate-700/40"
                >

                  {/* Position */}

                  <td className="px-6 py-5">

                    <div className="font-semibold text-white">
                      {experience.title}
                    </div>

                    <div className="mt-1 text-sm text-slate-400">
                      {experience.location || "-"}
                    </div>

                  </td>

                  {/* Organization */}

                  <td className="px-6 py-5 text-white">
                    {experience.organization}
                  </td>

                  {/* Duration */}

                  <td className="px-6 py-5 text-slate-300">

                    <div>
                      {experience.startDate || "-"}
                    </div>

                    <div className="mt-1 text-sm text-slate-500">
                      {getEndDate(experience)}
                    </div>

                  </td>

                  {/* Status */}

                  <td className="px-6 py-5">

                    {experience.currentlyWorking ? (
                      <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                        Current
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                        Completed
                      </span>
                    )}

                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">

                    <div className="flex justify-center gap-3">

                      <button
                        type="button"
                        onClick={() => onEdit(experience)}
                        className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                        title="Edit experience"
                        aria-label={`Edit ${experience.title}`}
                      >
                        <FaEdit />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(experience)}
                        className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                        title="Delete experience"
                        aria-label={`Delete ${experience.title}`}
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

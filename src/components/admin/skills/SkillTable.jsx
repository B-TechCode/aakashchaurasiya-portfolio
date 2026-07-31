import { FaEdit, FaTrash } from "react-icons/fa";

export default function SkillTable({
  skills,
  onEdit,
  onDelete,
}) {
  if (!skills || skills.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Skills Found
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Click "Add Skill" to create your first skill.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ==================================================
          MOBILE + SMALL TABLET VIEW
          ================================================== */}

      <div className="space-y-4 lg:hidden">
        {skills.map((skill) => {
          const proficiency = skill.proficiency || 0;

          return (
            <div
              key={skill.id}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-5"
            >
              {/* Skill heading */}

              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="break-words text-lg font-semibold text-white">
                    {skill.name}
                  </h3>

                  <p className="mt-1 break-words text-sm text-slate-400">
                    {skill.iconName || "No icon"}
                  </p>
                </div>

                {skill.published ? (
                  <span className="shrink-0 rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                    Published
                  </span>
                ) : (
                  <span className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                    Draft
                  </span>
                )}
              </div>

              {/* Category */}

              <div className="mt-5">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Category
                </p>

                <p className="mt-1 break-words text-sm text-slate-200">
                  {skill.category || "-"}
                </p>
              </div>

              {/* Proficiency */}

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Proficiency
                  </p>

                  <span className="text-sm font-medium text-slate-300">
                    {proficiency}%
                  </span>
                </div>

                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-cyan-500"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, proficiency)
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Actions */}

              <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-700 pt-4">
                <button
                  type="button"
                  onClick={() => onEdit(skill)}
                  className="flex min-w-0 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
                >
                  <FaEdit />

                  <span>Edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => onDelete(skill.id)}
                  className="flex min-w-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                >
                  <FaTrash />

                  <span>Delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ==================================================
          DESKTOP VIEW
          ================================================== */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 lg:block">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[850px]">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-slate-300">
                  Skill
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Proficiency
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Published
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {skills.map((skill) => {
                const proficiency = skill.proficiency || 0;

                return (
                  <tr
                    key={skill.id}
                    className="border-t border-slate-700 transition hover:bg-slate-700/40"
                  >
                    <td className="px-6 py-5">
                      <div className="font-semibold text-white">
                        {skill.name}
                      </div>

                      <div className="mt-1 text-sm text-slate-400">
                        {skill.iconName || "-"}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-white">
                      {skill.category || "-"}
                    </td>

                    <td className="px-6 py-5">
                      <div className="w-44">
                        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
                          <div
                            className="h-full rounded-full bg-cyan-500"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(0, proficiency)
                              )}%`,
                            }}
                          />
                        </div>

                        <span className="mt-1 block text-sm text-slate-300">
                          {proficiency}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      {skill.published ? (
                        <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                          Published
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                          Draft
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onEdit(skill)}
                          className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                          aria-label={`Edit ${skill.name}`}
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(skill.id)}
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                          aria-label={`Delete ${skill.name}`}
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

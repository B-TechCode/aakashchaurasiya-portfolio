import { FaEdit, FaTrash } from "react-icons/fa";

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
}) {
  if (!services || services.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8 text-center sm:p-12">
        <h2 className="text-xl font-semibold text-white sm:text-2xl">
          No Services Found
        </h2>

        <p className="mt-3 text-sm text-slate-400 sm:text-base">
          Click "Add Service" to create your first service.
        </p>
      </div>
    );
  }

  const getTags = (tags) => {
    if (!tags) return [];

    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  };

  return (
    <>
      {/* ==================================================
          MOBILE + TABLET
          Below 1024px
      ================================================== */}

      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:hidden">
        {services.map((service) => {
          const tags = getTags(service.tags);

          return (
            <article
              key={service.id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-800"
            >
              {/* Header */}

              <div className="border-b border-slate-700 p-4 sm:p-5">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="break-words text-lg font-semibold text-white">
                      {service.title}
                    </h2>

                    <p className="mt-1 break-words text-sm text-slate-400">
                      {service.iconName || "No icon"}
                    </p>
                  </div>

                  {service.published ? (
                    <span className="shrink-0 rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                      Published
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                      Draft
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}

              <div className="flex flex-1 flex-col p-4 sm:p-5">

                {/* Description */}

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Description
                  </p>

                  <p className="mt-2 break-words text-sm leading-6 text-slate-300">
                    {service.description || "-"}
                  </p>
                </div>

                {/* Tags */}

                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Tags
                  </p>

                  {tags.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <span
                          key={`${service.id}-${tag}-${index}`}
                          className="max-w-full break-words rounded-full border border-cyan-700 bg-cyan-950/50 px-2.5 py-1 text-xs text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-slate-400">
                      No tags
                    </p>
                  )}
                </div>

                {/* Order */}

                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Display Order
                  </p>

                  <p className="mt-1 text-sm font-medium text-white">
                    {service.displayOrder ?? 0}
                  </p>
                </div>

                {/* Actions */}

                <div className="mt-auto pt-5">
                  <div className="grid grid-cols-2 gap-3 border-t border-slate-700 pt-4">
                    <button
                      type="button"
                      onClick={() => onEdit(service)}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-cyan-700"
                      aria-label={`Edit ${service.title}`}
                    >
                      <FaEdit />

                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(service.id)}
                      className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
                      aria-label={`Delete ${service.title}`}
                    >
                      <FaTrash />

                      <span>Delete</span>
                    </button>
                  </div>
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
          <table className="w-full min-w-[1050px]">
            <thead className="bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-slate-300">
                  Service
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Description
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Tags
                </th>

                <th className="px-6 py-4 text-center text-slate-300">
                  Order
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
              {services.map((service) => {
                const tags = getTags(service.tags);

                return (
                  <tr
                    key={service.id}
                    className="border-t border-slate-700 transition hover:bg-slate-700/40"
                  >
                    {/* Service */}

                    <td className="px-6 py-5">
                      <div className="font-semibold text-white">
                        {service.title}
                      </div>

                      <div className="mt-1 text-sm text-slate-400">
                        {service.iconName || "-"}
                      </div>
                    </td>

                    {/* Description */}

                    <td className="max-w-sm px-6 py-5">
                      <p className="line-clamp-3 text-sm leading-6 text-slate-300">
                        {service.description || "-"}
                      </p>
                    </td>

                    {/* Tags */}

                    <td className="px-6 py-5">
                      {tags.length > 0 ? (
                        <div className="flex max-w-xs flex-wrap gap-2">
                          {tags.map((tag, index) => (
                            <span
                              key={`${service.id}-${tag}-${index}`}
                              className="rounded-full border border-cyan-700 bg-cyan-950/50 px-2.5 py-1 text-xs text-cyan-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-400">
                          -
                        </span>
                      )}
                    </td>

                    {/* Display Order */}

                    <td className="px-6 py-5 text-center text-white">
                      {service.displayOrder ?? 0}
                    </td>

                    {/* Published */}

                    <td className="px-6 py-5">
                      {service.published ? (
                        <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                          Published
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onEdit(service)}
                          className="rounded-lg bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                          title="Edit service"
                          aria-label={`Edit ${service.title}`}
                        >
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(service.id)}
                          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                          title="Delete service"
                          aria-label={`Delete ${service.title}`}
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

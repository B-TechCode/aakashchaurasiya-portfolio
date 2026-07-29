import { FaEdit, FaTrash } from "react-icons/fa";

export default function ServiceTable({
  services,
  onEdit,
  onDelete,
}) {
  if (!services.length) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-800 p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Services Found
        </h2>

        <p className="mt-3 text-slate-400">
          Click "Add Service" to create your first service.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-800">
      <table className="w-full">
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
          {services.map((service) => (
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
                  {service.description}
                </p>
              </td>

              {/* Tags */}
              <td className="px-6 py-5">
                {service.tags ? (
                  <div className="flex max-w-xs flex-wrap gap-2">
                    {service.tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean)
                      .map((tag, index) => (
                        <span
                          key={`${service.id}-${tag}-${index}`}
                          className="rounded-full border border-cyan-700 bg-cyan-950/50 px-2.5 py-1 text-xs text-cyan-300"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                ) : (
                  <span className="text-slate-400">-</span>
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
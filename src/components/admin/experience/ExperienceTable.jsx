import { FaEdit, FaTrash } from "react-icons/fa";

export default function ExperienceTable({
  experiences,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Loading Experiences...
        </h2>

        <p className="text-slate-400 mt-3">
          Please wait...
        </p>
      </div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Experiences Found
        </h2>

        <p className="text-slate-400 mt-3">
          Click "Add Experience" to create your first experience.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
      <table className="w-full">

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
              className="border-t border-slate-700 hover:bg-slate-700/40 transition"
            >

              <td className="px-6 py-5">

                <div className="font-semibold text-white">
                  {experience.title}
                </div>

                <div className="text-sm text-slate-400 mt-1">
                  {experience.location || "-"}
                </div>

              </td>

              <td className="px-6 py-5 text-white">
                {experience.organization}
              </td>

              <td className="px-6 py-5 text-slate-300">

                <div>
                  {experience.startDate || "-"}
                </div>

                <div className="text-sm text-slate-500">

                  {experience.currentlyWorking
                    ? "Present"
                    : experience.endDate || "-"}

                </div>

              </td>

              <td className="px-6 py-5">

                {experience.currentlyWorking ? (

                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                    Current
                  </span>

                ) : (

                  <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">
                    Completed
                  </span>

                )}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(experience)}
                    className="bg-cyan-600 hover:bg-cyan-700 transition text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(experience)}
                    className="bg-red-600 hover:bg-red-700 transition text-white p-2 rounded-lg"
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
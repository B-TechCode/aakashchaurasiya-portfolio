import { FaEdit, FaTrash } from "react-icons/fa";

export default function ExperienceTable({
  experiences,
  onEdit,
  onDelete,
}) {
  if (!experiences.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl text-white font-semibold">
          No Experience Found
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

                <div className="text-sm text-slate-400">
                  {experience.location}
                </div>

              </td>

              <td className="px-6 py-5 text-white">
                {experience.organization}
              </td>

              <td className="px-6 py-5 text-slate-300">

                {experience.startDate}

                {" - "}

                {experience.currentlyWorking
                  ? "Present"
                  : experience.endDate}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(experience)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(experience.id)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
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
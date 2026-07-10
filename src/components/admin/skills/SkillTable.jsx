import { FaEdit, FaTrash } from "react-icons/fa";

export default function SkillTable({
  skills,
  onEdit,
  onDelete,
}) {
  if (!skills.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl text-white font-semibold">
          No Skills Found
        </h2>

        <p className="text-slate-400 mt-3">
          Click "Add Skill" to create your first skill.
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

          {skills.map((skill) => (

            <tr
              key={skill.id}
              className="border-t border-slate-700 hover:bg-slate-700/40 transition"
            >

              <td className="px-6 py-5">

                <div className="font-semibold text-white">
                  {skill.name}
                </div>

                <div className="text-sm text-slate-400">
                  {skill.iconName || "-"}
                </div>

              </td>

              <td className="px-6 py-5 text-white">
                {skill.category || "-"}
              </td>

              <td className="px-6 py-5">

                <div className="w-44 bg-slate-700 rounded-full h-3">

                  <div
                    className="bg-cyan-500 h-3 rounded-full"
                    style={{
                      width: `${skill.proficiency || 0}%`,
                    }}
                  />

                </div>

                <span className="text-slate-300 text-sm">
                  {skill.proficiency || 0}%
                </span>

              </td>

              <td className="px-6 py-5">

                {skill.published ? (

                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                    Published
                  </span>

                ) : (

                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
                    Draft
                  </span>

                )}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(skill)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(skill.id)}
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
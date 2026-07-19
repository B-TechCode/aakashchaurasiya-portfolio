import { FaEdit, FaTrash, FaImage } from "react-icons/fa";

export default function ProjectTable({
  projects,
  loading,
  onEdit,
  onDelete,
  onUploadImage,
  onManageImages,
}) {
  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Loading Projects...
        </h2>

        <p className="text-slate-400 mt-3">
          Please wait...
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Projects Found
        </h2>

        <p className="text-slate-400 mt-3">
          Click "Add Project" to create your first project.
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
              className="border-t border-slate-700 hover:bg-slate-700/40 transition"
            >
              <td className="px-6 py-5">
                <div className="font-semibold text-white">
                  {project.title}
                </div>

                <div className="text-sm text-slate-400 mt-1">
                  {project.slug}
                </div>
              </td>

              <td className="px-6 py-5">
                {project.featured ? (
                  <span className="bg-cyan-600 text-white px-3 py-1 rounded-full text-xs">
                    Featured
                  </span>
                ) : (
                  <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">
                    Regular
                  </span>
                )}
              </td>

              <td className="px-6 py-5">
                {project.published ? (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
                    Published
                  </span>
                ) : (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs">
                    Unpublished
                  </span>
                )}
              </td>

              <td className="px-6 py-5">
  <div className="flex flex-wrap gap-2">
    {project.skills && project.skills.length > 0 ? (
      project.skills.map((skill) => (
        <span
          key={skill.id}
          className="bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 px-2 py-1 rounded-md text-xs"
        >
          {skill.name}
        </span>
      ))
    ) : (
      <span className="text-slate-500 text-sm">
        No Skills
      </span>
    )}
  </div>
</td>

              <td className="px-6 py-5">
                <button
                  onClick={() => onManageImages(project)}
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Manage Images ({project.images?.length || 0})
                </button>
              </td>

              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onUploadImage(project)}
                    className="bg-blue-600 hover:bg-blue-700 transition text-white p-2 rounded-lg"
                  >
                    <FaImage />
                  </button>

                  <button
                    onClick={() => onEdit(project)}
                    className="bg-cyan-600 hover:bg-cyan-700 transition text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(project)}
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
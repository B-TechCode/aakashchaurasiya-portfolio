import { FaEdit, FaTrash, FaImage } from "react-icons/fa";

export default function ProjectTable({
  projects,
  onEdit,
  onDelete,
  onUploadImage,
}) {

 if (!projects || projects.length === 0) {

    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl text-white font-semibold">
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
                    Yes
                  </span>

                ) : (

                  <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs">
                    No
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
                    Draft
                  </span>

                )}

              </td>

              <td className="px-6 py-5">

                <div className="flex gap-2 flex-wrap">

                  {project.images?.length ? (

                    project.images.map((img) => (

                      <img
                        key={img.id}
                        src={img.imageUrl}
                        alt=""
                        className="w-12 h-12 rounded object-cover border border-slate-600"
                      />

                    ))

                  ) : (

                    <span className="text-slate-500 text-sm">
                      No Images
                    </span>

                  )}

                </div>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onUploadImage(project)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                  >
                    <FaImage />
                  </button>

                  <button
                    onClick={() => onEdit(project)}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onDelete(project.id)}
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


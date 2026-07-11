import { FaTrash, FaDownload } from "react-icons/fa";

export default function ResumeTable({
  resumes,
  onDelete,
}) {

  if (!resumes.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">

        <h2 className="text-2xl font-semibold text-white">
          No Resume Uploaded
        </h2>

        <p className="text-slate-400 mt-3">
          Upload your first resume.
        </p>

      </div>
    );
  }

  return (

    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-900">

          <tr>

            <th className="px-6 py-4 text-left text-slate-300">
              Version
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Uploaded
            </th>

            <th className="px-6 py-4 text-left text-slate-300">
              Resume
            </th>

            <th className="px-6 py-4 text-center text-slate-300">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {resumes.map((resume) => (

            <tr
              key={resume.id}
              className="border-t border-slate-700 hover:bg-slate-700/40"
            >

              <td className="px-6 py-5 text-white">
                v{resume.version}
              </td>

              <td className="px-6 py-5 text-slate-300">
                {new Date(resume.createdAt).toLocaleDateString()}
              </td>

              <td className="px-6 py-5">

                <a
                  href={resume.fileUrl}
                  target="_blank"
                  className="text-cyan-400 hover:text-cyan-300"
                >
                  View Resume
                </a>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    className="bg-cyan-600 hover:bg-cyan-700 p-2 rounded-lg text-white"
                  >
                    <FaDownload />
                  </a>

                  <button
                    onClick={() => onDelete(resume.id)}
                    className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white"
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


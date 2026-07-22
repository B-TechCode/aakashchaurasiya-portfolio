import { FaEye, FaTrash, FaCheck } from "react-icons/fa";

export default function ContactMessageTable({
  messages,
  onView,
  onRead,
  onDelete,
}) {
  if (!messages.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Messages Found
        </h2>

        <p className="text-slate-400 mt-3">
          Contact messages will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-900">

          <tr>

            <th className="px-6 py-4 text-left text-white">
              Name
            </th>

            <th className="px-6 py-4 text-left text-white">
              Email
            </th>

            <th className="px-6 py-4 text-left text-white">
              Status
            </th>

            <th className="px-6 py-4 text-left text-white">
              Received
            </th>

            <th className="px-6 py-4 text-center text-white">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {messages.map((message) => (

            <tr
              key={message.id}
              className="border-t border-slate-700 hover:bg-slate-700/40 transition"
            >

              <td className="px-6 py-5">

                <div className="font-semibold text-white">
                  {message.name}
                </div>

              </td>

              <td className="px-6 py-5 text-slate-300">
                {message.email}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    message.status === "NEW"
                      ? "bg-red-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {message.status}
                </span>

              </td>

              <td className="px-6 py-5 text-slate-300">
                {new Date(message.createdAt).toLocaleString()}
              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onView(message)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg"
                    title="View Message"
                  >
                    <FaEye />
                  </button>

                  {message.status === "NEW" && (

                    <button
                      onClick={() => onRead(message.id)}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white p-2 rounded-lg"
                      title="Mark as Read"
                    >
                      <FaCheck />
                    </button>

                  )}

                  <button
                    onClick={() => onDelete(message)}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                    title="Delete Message"
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
export default function SocialLinkTable({
  links,
  loading,
  onEdit,
  onDelete,
}) {

  if (loading) {
    return (
      <div className="text-white text-xl">
        Loading...
      </div>
    );
  }

  if (!links.length) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Social Links
        </h2>

        <p className="text-slate-400 mt-3">
          Add your first social link.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-900">

          <tr>

            <th className="p-4 text-left text-slate-300">
              Platform
            </th>

            <th className="p-4 text-left text-slate-300">
              URL
            </th>

            <th className="p-4 text-left text-slate-300">
              Order
            </th>

            <th className="p-4 text-center text-slate-300">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {links.map((link) => (

            <tr
              key={link.id}
              className="border-t border-slate-700 hover:bg-slate-700/40"
            >

              <td className="p-4 text-white">
                {link.platform}
              </td>

              <td className="p-4">

                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 break-all"
                >
                  {link.url}
                </a>

              </td>

              <td className="p-4 text-white">
                {link.displayOrder}
              </td>

              <td className="p-4">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={() => onEdit(link)}
                    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded text-white"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(link.id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                  >
                    Delete
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
import { FaStar, FaTrash } from "react-icons/fa";

export default function ProjectImagesModal({
  open,
  project,
  loading,
  onClose,
  onDelete,
  onPrimary,
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl p-8 max-h-[90vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-3xl font-bold text-white">

              Project Images

            </h2>

            <p className="text-slate-400 mt-2">

              {project?.title}

            </p>

          </div>

          <button
            onClick={onClose}
            className="text-3xl text-slate-400 hover:text-white"
          >
            ×
          </button>

        </div>

        {project?.images?.length === 0 ? (

          <div className="text-center py-20 text-slate-400">

            No images uploaded.

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {project.images.map((image) => (

              <div
                key={image.id}
                className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
              >

                <img
                  src={image.imageUrl}
                  alt=""
                  className="w-full h-52 object-cover"
                />

                <div className="p-4">

                  <p className="text-white">

                    {image.caption || "No Caption"}

                  </p>

                  <div className="flex justify-between mt-4">

                    <button
                      disabled={loading}
                      onClick={() => onPrimary(image.id)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        image.primary
                          ? "bg-green-600"
                          : "bg-yellow-600 hover:bg-yellow-700"
                      }`}
                    >
                      <FaStar />
                    </button>

                    <button
                      disabled={loading}
                      onClick={() => onDelete(image.id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}


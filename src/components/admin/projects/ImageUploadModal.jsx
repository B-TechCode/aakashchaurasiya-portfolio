import { useState } from "react";

export default function ImageUploadModal({
  open,
  project,
  onClose,
  onUpload,
  loading,
}) {
  const [image, setImage] = useState(null);

  const [caption, setCaption] = useState("");

  const [folder, setFolder] = useState("portfolio/projects");

  const [primary, setPrimary] = useState(false);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please choose an image.");
      return;
    }

    onUpload(image, {
      folder,
      publicId: null,
      caption,
      primary,
    });

    setImage(null);
    setCaption("");
    setPrimary(false);
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-white">
            Upload Image
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <p className="text-slate-400 mb-6">
          {project?.title}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block text-slate-300 mb-2">
              Select Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-white"
            />

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              Caption
            </label>

            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <div>

            <label className="block text-slate-300 mb-2">
              Folder
            </label>

            <input
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white"
            />

          </div>

          <label className="flex items-center gap-3 text-white">

            <input
              type="checkbox"
              checked={primary}
              onChange={(e) => setPrimary(e.target.checked)}
            />

            Primary Image

          </label>

          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="bg-slate-700 px-6 py-3 rounded-lg text-white"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-lg text-white font-semibold"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}
import { useState } from "react";

export default function ResumeUploadModal({
  open,
  onClose,
  onUpload,
  loading,
}) {

  const [file, setFile] = useState(null);

  if (!open) return null;

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!file) {
      alert("Please choose a PDF.");
      return;
    }

    onUpload(file);
  };

  return (

    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg p-8">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">
            Upload Resume
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block text-slate-300 mb-2">
              Resume PDF
            </label>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-white"
            />

          </div>

          <div className="flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-slate-700 text-white"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-8 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              {loading ? "Uploading..." : "Upload Resume"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}
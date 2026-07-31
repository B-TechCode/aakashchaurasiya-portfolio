import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  FaFilePdf,
  FaUpload,
} from "react-icons/fa";

export default function ResumeUploadModal({
  open,
  onClose,
  onUpload,
  loading,
}) {
  const [file, setFile] = useState(null);

  // Reset old selected file whenever modal opens.
  useEffect(() => {
    if (open) {
      setFile(null);
    }
  }, [open]);

  if (!open) return null;

  // ===============================
  // File Selection
  // ===============================

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const isPdf =
      selectedFile.type === "application/pdf" ||
      selectedFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      toast.error("Only PDF files are allowed.");

      e.target.value = "";
      setFile(null);

      return;
    }

    setFile(selectedFile);
  };

  // ===============================
  // Submit
  // ===============================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    if (!file) {
      toast.error("Please choose a PDF file.");
      return;
    }

    onUpload(file);
  };

  // ===============================
  // Close
  // ===============================

  const handleClose = () => {
    if (loading) return;

    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-5">

      <div className="my-auto w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* ================= Header ================= */}

        <div className="flex items-center justify-between gap-4 border-b border-slate-700 px-4 py-4 sm:px-6 sm:py-5">

          <div className="min-w-0">

            <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              Upload Resume
            </h2>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              Upload your resume in PDF format.
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close resume upload"
          >
            ×
          </button>

        </div>

        {/* ================= Form ================= */}

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 md:p-8"
        >

          <div>

            <label
              htmlFor="resume-file"
              className="mb-2 block text-sm text-slate-300 sm:text-base"
            >
              Resume PDF
            </label>

            <label
              htmlFor="resume-file"
              className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-600 bg-slate-800/60 p-5 text-center transition hover:border-cyan-500 hover:bg-slate-800"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                <FaUpload size={20} />
              </div>

              <p className="mt-4 text-sm font-medium text-white">
                Choose Resume PDF
              </p>

              <p className="mt-1 text-xs text-slate-500">
                PDF files only
              </p>

              <input
                id="resume-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                disabled={loading}
                className="sr-only"
              />

            </label>

          </div>

          {/* ================= Selected File ================= */}

          {file && (
            <div className="mt-5 flex min-w-0 items-center gap-3 rounded-xl border border-slate-700 bg-slate-800 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400">
                <FaFilePdf size={18} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium text-white">
                  {file.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>
          )}

          {/* ================= Actions ================= */}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="w-full rounded-lg bg-slate-700 px-6 py-3 text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <FaUpload />

              {loading
                ? "Uploading..."
                : "Upload Resume"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

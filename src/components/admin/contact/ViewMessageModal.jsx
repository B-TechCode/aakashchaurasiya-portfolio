export default function ViewMessageModal({
  open,
  message,
  onClose,
}) {
  if (!open || !message) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold text-white">
            Contact Message
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        {/* Name */}

        <div className="mb-5">

          <label className="block text-slate-400 text-sm mb-2">
            Name
          </label>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
            {message.name}
          </div>

        </div>

        {/* Email */}

        <div className="mb-5">

          <label className="block text-slate-400 text-sm mb-2">
            Email
          </label>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white break-all">
            {message.email}
          </div>

        </div>

        {/* Status */}

        <div className="mb-5">

          <label className="block text-slate-400 text-sm mb-2">
            Status
          </label>

          <div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                message.status === "NEW"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {message.status}
            </span>

          </div>

        </div>

        {/* Received */}

        <div className="mb-5">

          <label className="block text-slate-400 text-sm mb-2">
            Received
          </label>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-white">
            {new Date(message.createdAt).toLocaleString()}
          </div>

        </div>

        {/* Message */}

        <div className="mb-8">

          <label className="block text-slate-400 text-sm mb-2">
            Message
          </label>

          <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-white whitespace-pre-wrap leading-7 min-h-[180px]">
            {message.message}
          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end">

          <button
            onClick={onClose}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
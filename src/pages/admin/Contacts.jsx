import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllMessages,
  deleteMessage,
  markMessageAsRead,
} from "../../api/contactApi";

import ContactMessageTable from "../../components/admin/contact/ContactMessageTable";
import ViewMessageModal from "../../components/admin/contact/ViewMessageModal";
import DeleteMessageModal from "../../components/admin/contact/DeleteMessageModal";

export default function Contacts() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // ===============================
  // Load Messages
  // ===============================

  useEffect(() => {
    loadMessages();
  }, [page]);

  const loadMessages = async () => {
    setLoading(true);

    try {
      const response = await getAllMessages(page, size);

      const data = response.data.data;

      setMessages(data?.content || []);
      setTotalPages(data?.totalPages || 0);
    } catch (error) {
      console.error("Failed to load contact messages:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // View Message
  // ===============================

  const handleView = async (message) => {
    setSelectedMessage(message);
    setViewModalOpen(true);

    if (message.status === "NEW") {
      try {
        await markMessageAsRead(message.id);

        setSelectedMessage((prev) =>
          prev
            ? {
                ...prev,
                status: "READ",
              }
            : prev
        );

        await loadMessages();
      } catch (error) {
        console.error(
          "Failed to mark message as read:",
          error
        );
      }
    }
  };

  // ===============================
  // Mark Message As Read
  // ===============================

  const handleRead = async (id) => {
    try {
      await markMessageAsRead(id);

      await loadMessages();

      toast.success("Message marked as read.");
    } catch (error) {
      console.error(
        "Failed to mark message as read:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to mark message as read."
      );
    }
  };

  // ===============================
  // Open Delete Modal
  // ===============================

  const handleDeleteClick = (message) => {
    setSelectedMessage(message);
    setDeleteModalOpen(true);
  };

  // ===============================
  // Delete Message
  // ===============================

  const handleDeleteConfirm = async () => {
    if (!selectedMessage) return;

    try {
      setDeleteLoading(true);

      await deleteMessage(selectedMessage.id);

      toast.success("Message deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedMessage(null);

      /*
       * If this was the only message on the current page
       * and we are not on the first page, go back one page.
       */
      if (messages.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        await loadMessages();
      }
    } catch (error) {
      console.error("Failed to delete message:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete message."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // ===============================
  // Loading
  // ===============================

  if (loading) {
    return (
      <AdminLayout>
        <div className="w-full min-w-0">

          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-center sm:p-8">

            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Loading Messages...
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Please wait...
            </p>

          </div>

        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>

      <div className="w-full min-w-0">

        {/* ===============================
            Header
        =============================== */}

        <div className="mb-6 sm:mb-8">

          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Contact Messages
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-400 sm:text-base">
            Manage visitor contact messages.
          </p>

        </div>

        {/* ===============================
            Messages
        =============================== */}

        <ContactMessageTable
          messages={messages}
          onView={handleView}
          onRead={handleRead}
          onDelete={handleDeleteClick}
        />

        {/* ===============================
            Pagination
        =============================== */}

        {totalPages > 1 && (
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Previous */}

            <button
              type="button"
              onClick={() =>
                setPage((prev) => Math.max(0, prev - 1))
              }
              disabled={page === 0}
              className="w-full rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Previous
            </button>

            {/* Page Numbers */}

            <div className="flex max-w-full items-center justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">

              {[...Array(totalPages)].map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={
                    page === index ? "page" : undefined
                  }
                  className={`h-10 min-w-10 flex-shrink-0 rounded-lg px-3 text-sm font-semibold transition ${
                    page === index
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

            </div>

            {/* Next */}

            <button
              type="button"
              onClick={() =>
                setPage((prev) =>
                  Math.min(totalPages - 1, prev + 1)
                )
              }
              disabled={page === totalPages - 1}
              className="w-full rounded-lg bg-slate-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              Next
            </button>

          </div>
        )}

        {/* ===============================
            View Modal
        =============================== */}

        <ViewMessageModal
          open={viewModalOpen}
          message={selectedMessage}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedMessage(null);
          }}
        />

        {/* ===============================
            Delete Modal
        =============================== */}

        <DeleteMessageModal
          open={deleteModalOpen}
          loading={deleteLoading}
          message={selectedMessage}
          onClose={() => {
            if (deleteLoading) return;

            setDeleteModalOpen(false);
            setSelectedMessage(null);
          }}
          onConfirm={handleDeleteConfirm}
        />

      </div>

    </AdminLayout>
  );
}

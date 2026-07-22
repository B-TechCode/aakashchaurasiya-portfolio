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

  useEffect(() => {

    loadMessages();

  }, [page]);

  const loadMessages = async () => {

    setLoading(true);

    try {

      const response = await getAllMessages(page, size);

      setMessages(response.data.data.content);

      setTotalPages(response.data.data.totalPages);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load contact messages.");

    } finally {

      setLoading(false);

    }

  };

  const handleView = async (message) => {

    setSelectedMessage(message);

    setViewModalOpen(true);

    if (message.status === "NEW") {

      try {

        await markMessageAsRead(message.id);

        await loadMessages();

      } catch (error) {

        console.error(error);

      }

    }

  };

  const handleRead = async (id) => {

    try {

      await markMessageAsRead(id);

      await loadMessages();

      toast.success("Message marked as read.");

    } catch (error) {

      console.error(error);

      toast.error("Failed to mark message as read.");

    }

  };

  const handleDeleteClick = (message) => {

    setSelectedMessage(message);

    setDeleteModalOpen(true);

  };

  const handleDeleteConfirm = async () => {

    if (!selectedMessage) return;

    try {

      setDeleteLoading(true);

      await deleteMessage(selectedMessage.id);

      toast.success("Message deleted successfully.");

      setDeleteModalOpen(false);

      setSelectedMessage(null);

      await loadMessages();

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete message.");

    } finally {

      setDeleteLoading(false);

    }

  };

  if (loading) {

    return (

      <AdminLayout>

        <div className="text-white text-xl">
          Loading Messages...
        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div>

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-white">
            Contact Messages
          </h1>

          <p className="text-slate-400 mt-2">
            Manage visitor contact messages.
          </p>

        </div>

        <ContactMessageTable
          messages={messages}
          onView={handleView}
          onRead={handleRead}
          onDelete={handleDeleteClick}
        />

        {totalPages > 1 && (

          <div className="flex items-center justify-between mt-6">

            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 0}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Previous
            </button>

            <div className="flex gap-2">

              {[...Array(totalPages)].map((_, index) => (

                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`w-10 h-10 rounded-lg font-semibold transition ${
                    page === index
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {index + 1}
                </button>

              ))}

            </div>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages - 1}
              className="px-4 py-2 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600"
            >
              Next
            </button>

          </div>

        )}
                <ViewMessageModal
          open={viewModalOpen}
          message={selectedMessage}
          onClose={() => {
            setViewModalOpen(false);
            setSelectedMessage(null);
          }}
        />

        <DeleteMessageModal
          open={deleteModalOpen}
          loading={deleteLoading}
          message={selectedMessage}
          onClose={() => {
            setDeleteModalOpen(false);
            setSelectedMessage(null);
          }}
          onConfirm={handleDeleteConfirm}
        />

      </div>

    </AdminLayout>

  );

}
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllMessages,
  deleteMessage,
  markMessageAsRead,
} from "../../api/contactApi";

export default function Contacts() {

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

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

      toast.error("Failed to load messages.");

    } finally {

      setLoading(false);

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

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this message?")) return;

    try {

      await deleteMessage(id);

      await loadMessages();

      toast.success("Message deleted successfully.");

    } catch (error) {

      console.error(error);

      toast.error("Failed to delete message.");

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

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">

          <table className="w-full">

            <thead className="bg-slate-900">

              <tr>

                <th className="text-left text-white p-5">Name</th>

                <th className="text-left text-white">Email</th>

                <th className="text-left text-white">Status</th>

                <th className="text-left text-white">Received</th>

                <th className="text-right text-white pr-8">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {messages.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="text-center py-12 text-slate-400"
                  >
                    No Messages Found
                  </td>

                </tr>

              ) : (

                messages.map((message) => (

                  <tr
                    key={message.id}
                    className="border-t border-slate-700"
                  >

                    <td className="p-5">

                      <div className="font-semibold text-white">
                        {message.name}
                      </div>

                    </td>

                    <td className="text-slate-300">
                      {message.email}
                    </td>

                    <td>

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

                    <td className="text-slate-400">

                      {new Date(message.createdAt).toLocaleString()}

                    </td>

                    <td>

                      <div className="flex justify-end gap-3 pr-5">

                        {message.status === "NEW" && (

                          <button
                            onClick={() => handleRead(message.id)}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg"
                          >
                            Read
                          </button>

                        )}

                        <button
                          onClick={() => handleDelete(message.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

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

      </div>

    </AdminLayout>

  );

}
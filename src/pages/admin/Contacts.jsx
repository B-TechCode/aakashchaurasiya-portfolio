import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getAllMessages,
  deleteMessage,
  markMessageAsRead,
} from "../../api/contactApi";

export default function Contacts() {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadMessages();

  }, []);

  const loadMessages = async () => {

    try {

      const response = await getAllMessages();

      setMessages(response.data.data);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  const handleRead = async (id) => {

    try {

      await markMessageAsRead(id);

      loadMessages();

    } catch (error) {

      console.error(error);

      alert("Failed to mark message as read.");

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this message?")) return;

    try {

      await deleteMessage(id);

      loadMessages();

    } catch (error) {

      console.error(error);

      alert("Failed to delete message.");

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

                      {new Date(
                        message.createdAt
                      ).toLocaleString()}

                    </td>

                    <td>

                      <div className="flex justify-end gap-3 pr-5">

                        {message.status === "NEW" && (

                          <button
                            onClick={() =>
                              handleRead(message.id)
                            }
                            className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg"
                          >
                            Read
                          </button>

                        )}

                        <button
                          onClick={() =>
                            handleDelete(message.id)
                          }
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

      </div>

    </AdminLayout>

  );

}

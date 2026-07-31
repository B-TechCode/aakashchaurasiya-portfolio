import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";

import {
  fetchUnreadMessageCount,
  fetchRecentMessages,
  readContactMessage,
} from "../../services/contactService";

export default function Topbar({ onMenuClick }) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const notificationRef = useRef(null);

  // ===============================
  // Load Unread Count
  // ===============================

  const loadUnreadCount = async () => {
    try {
      const count = await fetchUnreadMessageCount();
      setUnreadCount(Number(count) || 0);
    } catch (error) {
      console.error("Failed to load unread message count:", error);
    }
  };

  // ===============================
  // Load Recent Messages
  // ===============================

  const loadRecentMessages = async () => {
    try {
      setLoading(true);

      const recentMessages = await fetchRecentMessages(5);

      setMessages(recentMessages);
    } catch (error) {
      console.error("Failed to load recent messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Initial Notification Count
  // ===============================

  useEffect(() => {
    loadUnreadCount();
  }, []);

  // ===============================
  // Close Dropdown Outside
  // ===============================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // ===============================
  // Bell Click
  // ===============================

  const handleBellClick = async () => {
    const nextState = !isOpen;

    setIsOpen(nextState);

    if (nextState) {
      await loadRecentMessages();
      await loadUnreadCount();
    }
  };

  // ===============================
  // Notification Click
  // ===============================

  const handleMessageClick = async (message) => {
    try {
      if (message.status === "NEW") {
        await readContactMessage(message.id);

        setMessages((prev) =>
          prev.map((item) =>
            item.id === message.id
              ? {
                  ...item,
                  status: "READ",
                }
              : item
          )
        );

        setUnreadCount((prev) => Math.max(0, prev - 1));
      }

      setIsOpen(false);

      navigate("/admin/contacts");
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  // ===============================
  // View All Messages
  // ===============================

  const handleViewAll = () => {
    setIsOpen(false);
    navigate("/admin/contacts");
  };

  // ===============================
  // Format Date
  // ===============================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <header className="min-h-20 bg-slate-800 border-b border-slate-700 flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3">
     <div className="flex items-center gap-3 min-w-0">

  {/* Mobile Hamburger */}

  <button
    type="button"
    onClick={onMenuClick}
    aria-label="Open admin menu"
    className="lg:hidden flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700 text-slate-200 transition hover:bg-cyan-600 hover:text-white"
  >
    <FaBars size={18} />
  </button>

  <div className="min-w-0">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
      Dashboard
    </h2>

    <p className="hidden sm:block text-slate-400 text-sm">
      Welcome back, Aakash
    </p>
  </div>

</div>

     <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">

        {/* ================= Notification ================= */}

        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={handleBellClick}
            className="relative text-slate-300 hover:text-cyan-400 transition"
            aria-label="Notifications"
          >
            <FaBell size={22} />

            {unreadCount > 0 && (
              <span className="absolute -top-3 -right-3 min-w-[20px] h-5 px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold border-2 border-slate-800">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>

          {/* ================= Dropdown ================= */}

          {isOpen && (
            <div className="fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-11 sm:w-96">

              {/* Header */}

              <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
                <div>
                  <h3 className="font-semibold text-white">
                    Notifications
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread message${
                          unreadCount === 1 ? "" : "s"
                        }`
                      : "No unread messages"}
                  </p>
                </div>
              </div>

              {/* Content */}

              <div className="max-h-96 overflow-y-auto">

                {loading ? (
                  <div className="px-5 py-8 text-center text-sm text-slate-400">
                    Loading notifications...
                  </div>
                ) : messages.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <FaBell
                      size={28}
                      className="mx-auto mb-3 text-slate-600"
                    />

                    <p className="text-sm text-slate-400">
                      No notifications yet.
                    </p>
                  </div>
                ) : (
                  messages.map((message) => (
                    <button
                      type="button"
                      key={message.id}
                      onClick={() => handleMessageClick(message)}
                      className={`w-full border-b border-slate-800 px-5 py-4 text-left transition hover:bg-slate-800 ${
                        message.status === "NEW"
                          ? "bg-cyan-500/5"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">

                        {/* Status Indicator */}

                        <div className="mt-2 w-2 flex-shrink-0">
                          {message.status === "NEW" && (
                            <span className="block h-2 w-2 rounded-full bg-cyan-400" />
                          )}
                        </div>

                        {/* Message */}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p
                              className={`truncate text-sm ${
                                message.status === "NEW"
                                  ? "font-semibold text-white"
                                  : "text-slate-300"
                              }`}
                            >
                              {message.name}
                            </p>

                            <span className="whitespace-nowrap text-[10px] text-slate-500">
                              {formatDate(message.createdAt)}
                            </span>
                          </div>

                          <p className="mt-1 truncate text-xs text-slate-400">
                            {message.email}
                          </p>

                          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
                            {message.message}
                          </p>
                        </div>

                      </div>
                    </button>
                  ))
                )}

              </div>

              {/* Footer */}

              <button
                type="button"
                onClick={handleViewAll}
                className="w-full border-t border-slate-700 px-5 py-4 text-center text-sm font-medium text-cyan-400 transition hover:bg-slate-800 hover:text-cyan-300"
              >
                View all messages
              </button>

            </div>
          )}
        </div>

        {/* ================= Admin ================= */}

        <div className="flex items-center gap-3">

  <FaUserCircle
    size={36}
    className="text-cyan-400 flex-shrink-0 sm:hidden"
  />

  <FaUserCircle
    size={42}
    className="text-cyan-400 flex-shrink-0 hidden sm:block"
  />

  <div className="hidden sm:block">
    <h4 className="font-semibold text-white">
      Aakash
    </h4>

    <p className="text-sm text-slate-400">
      Administrator
    </p>
  </div>

</div>


      </div>
    </header>
  );
}
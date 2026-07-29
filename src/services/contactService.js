import {
  sendContactMessage,
  getUnreadMessageCount,
  getAllMessages,
  markMessageAsRead,
} from "../api/contactApi";

// ===============================
// Public Contact
// ===============================

export const submitContactMessage = async (data) => {
  return await sendContactMessage(data);
};

// ===============================
// Admin Notifications
// ===============================

// Get number of NEW contact messages
export const fetchUnreadMessageCount = async () => {
  const response = await getUnreadMessageCount();
  return response.data.data;
};

// Get recent contact messages for notification dropdown
export const fetchRecentMessages = async (size = 5) => {
  const response = await getAllMessages(0, size);

  return response.data.data?.content || [];
};

// Mark notification/message as read
export const readContactMessage = async (id) => {
  const response = await markMessageAsRead(id);
  return response.data.data;
};

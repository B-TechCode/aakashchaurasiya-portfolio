import axios from "./axios";

// ===============================
// Admin Contact APIs
// ===============================

// Get All Messages (Paginated)
export const getAllMessages = (page = 0, size = 10) => {
  return axios.get(`/admin/contact?page=${page}&size=${size}`);
};


// Get Unread Message Count
export const getUnreadMessageCount = () => {
  return axios.get("/admin/contact/unread-count");
};
// Get Single Message
export const getMessageById = (id) => {
  return axios.get(`/admin/contact/${id}`);
};

// Mark Message as Read
export const markMessageAsRead = (id) => {
  return axios.put(`/admin/contact/${id}/read`);
};

// Delete Message
export const deleteMessage = (id) => {
  return axios.delete(`/admin/contact/${id}`);
};

// ===============================
// Public Contact API
// ===============================

export const sendContactMessage = (data) => {
  return axios.post("/contact", data);
};
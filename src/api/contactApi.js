import axios from "./axios";

export const getAllMessages = (

  page = 0,

  size = 10

) => {

return axios.get(
  `/admin/contact?page=${page}&size=${size}`
);

};


export const getMessageById = (id) =>
  axios.get(`/admin/contact/${id}`);

export const markMessageAsRead = (id) =>
  axios.put(`/admin/contact/${id}/read`);

export const deleteMessage = (id) =>
  axios.delete(`/admin/contact/${id}`);

// ===============================
// Public Contact API
// ===============================

export const sendContactMessage = (data) =>
  axios.post("/public/contact", data);
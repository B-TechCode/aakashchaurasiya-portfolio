import api from "./axios";

export const getAnalyticsCounts = async () => {
  const response = await api.get("/admin/analytics/counts");
  return response.data;
};

export const getAllAnalyticsEvents = async () => {
  const response = await api.get("/admin/analytics");
  return response.data;
};

export const deleteAnalyticsEvent = async (id) => {
  const response = await api.delete(`/admin/analytics/${id}`);
  return response.data;
};
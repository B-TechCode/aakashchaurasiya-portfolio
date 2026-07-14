import api from "./axios";

/*
|--------------------------------------------------------------------------
| Public Analytics APIs
|--------------------------------------------------------------------------
*/

export const recordAnalyticsEvent = async (
  eventType,
  entityType = null,
  entityId = null
) => {
  const response = await api.post(`/public/analytics/${eventType}`, {
    entityType,
    entityId,
  });

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Admin Analytics APIs
|--------------------------------------------------------------------------
*/

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
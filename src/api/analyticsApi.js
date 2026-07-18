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

export const getAllAnalyticsEvents = async (
  page = 0,
  size = 10
) => {

  const response = await api.get(
    `/admin/analytics?page=${page}&size=${size}`
  );

  return response.data;

};

export const deleteAnalyticsEvent = async (id) => {
  const response = await api.delete(`/admin/analytics/${id}`);
  return response.data;
};
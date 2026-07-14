import { recordAnalyticsEvent } from "../api/analyticsApi";

export const recordAnalytics = async (
  eventType,
  entityType = null,
  entityId = null
) => {
  try {
    await recordAnalyticsEvent(
      eventType,
      entityType,
      entityId
    );
  } catch (error) {
    console.error("Analytics Error:", error);
  }
};
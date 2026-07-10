export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const truncate = (text, length = 100) => {
  if (!text) return "";

  return text.length > length
    ? text.substring(0, length) + "..."
    : text;
};
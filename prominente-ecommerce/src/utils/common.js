export const convToDate = (timestamp) => {
  return timestamp?.toDate().toDateString();
};

export const convToTime = (timestamp) => {
  return timestamp?.toDate().toLocaleTimeString([], {
    // year: "numeric",
    // month: "numeric",
    // day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

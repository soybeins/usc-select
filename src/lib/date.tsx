export const formatDateTime = (inputDateTime: any) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC", // Assuming the input datetime is in UTC
  };

  const formattedDateTime = new Date(inputDateTime).toLocaleString(
    "en-US",
    options
  );
  return formattedDateTime;
};

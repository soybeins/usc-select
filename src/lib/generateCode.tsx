export const generateCode = (): string => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const randomNumbers = Math.floor(Math.random() * 900000) + 100000;

  return `APP-${year}${month}${day}-${randomNumbers}`;
};

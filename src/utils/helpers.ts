import dayjs from "dayjs";

export const formatDate = (date: string | Date, format = "YYYY-MM-DD") => {
  if (!date) return "";

  return dayjs(date).format(format);
};

export const generateInitials = (name: string) => {
  if (!name) {
    return "";
  }

  // Take the first letter first word and the first letter of the last word
  const initials = name;
  const firstLetter = initials.charAt(0);
  const lastLetter = initials.charAt(initials.length - 1);

  return `${firstLetter}${lastLetter}`.toUpperCase();
};

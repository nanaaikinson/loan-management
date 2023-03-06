import dayjs from "dayjs";

export const formatDate = (date: string | Date, format = "YYY-MM-DD") => {
  if (!date) return "";

  return dayjs(date).format(format);
};

export const generateInitials = (name: string) => {
  if (!name) {
    return "";
  }

  const words = name.trim().split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (word.length > 0) {
      initials += word[0].toUpperCase();
    }
  }
  return initials;
};

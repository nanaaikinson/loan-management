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

export const formatMoney = (
  amount: number,
  decimalCount = 2,
  decimalSeparator = ".",
  thousandsSeparator = ","
): string => {
  const negativeSign = amount < 0 ? "-" : "";
  const absAmount = Math.abs(amount);
  const intAmount = parseInt(absAmount.toFixed(decimalCount), 10).toString();
  const hasThousandsSeparator = intAmount.length > 3;
  const startIndex = hasThousandsSeparator ? intAmount.length % 3 : 0;
  const intAmountWithSeparator = startIndex
    ? intAmount.slice(0, startIndex) + thousandsSeparator
    : "";
  const decimalAmount = absAmount.toFixed(decimalCount).slice(-decimalCount);
  return (
    negativeSign +
    intAmountWithSeparator +
    intAmount
      .slice(startIndex)
      .replace(/(\d{3})(?=\d)/g, `$1${thousandsSeparator}`) +
    decimalSeparator +
    decimalAmount
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    value === "" ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (Array.isArray(value) && value.length === 0)
  );
};

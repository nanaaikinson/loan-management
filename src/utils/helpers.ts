import dayjs from "dayjs";

export const formatDate = (date: string | Date, format = "YYYY-MM-DD") => {
  if (!date) return "";

  return dayjs(date).format(format);
};

export const generateInitials = (str: string) => {
  if (!str) return "";

  const initialsArr = str.toUpperCase().split(" ");

  if (initialsArr.length === 1) {
    return `${initialsArr[0].charAt(0)}${initialsArr[0].charAt(1)}`;
  }

  if (initialsArr.length === 2) {
    return `${initialsArr[0].charAt(0)}${initialsArr[1].charAt(0)}`;
  }

  // If the length is 1, then return the first letter of the word
  return `${initialsArr[0].charAt(0)}${initialsArr[
    initialsArr.length - 1
  ].charAt(0)}`;
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

export const getDurationInMonthsReadable = (
  durationInMonths: number
): string => {
  const years = Math.floor(durationInMonths / 12);
  const months = durationInMonths % 12;

  let result = `${durationInMonths} month${durationInMonths !== 1 ? "s" : ""}`;

  if (years > 0) {
    result = ` ${years} year${years !== 1 ? "s" : ""} ${months} month${
      months !== 1 ? "s" : ""
    }`;
  }

  return result;
};

export const calculateLoan = (
  loanAmount: number,
  interestRate: number,
  durationMonths: number
) => {
  const monthlyInterestRate = interestRate / 1200; // Convert yearly interest rate to monthly
  const totalInterest = loanAmount * monthlyInterestRate * durationMonths;
  const totalRepayment = loanAmount + totalInterest;
  const monthlyRepayment = totalRepayment / durationMonths;

  return {
    totalRepayment:
      isNaN(totalRepayment) || totalRepayment === Infinity ? 0 : totalRepayment,
    totalInterest:
      isNaN(totalInterest) || totalInterest === Infinity ? 0 : totalInterest,
    monthlyRepayment:
      isNaN(monthlyRepayment) || monthlyRepayment === Infinity
        ? 0
        : monthlyRepayment,
  };
};


export const getEnumOptions = (_enum: any) => {
  const keys = Object.keys(_enum);
  return keys?.map((item) => {
    return {
      value: _enum[item],
      label: toNormalCase(_enum[item]),
    };
  });
};

export const toNormalCase = (str = "") => {
  if (!str) {
    return "";
  }
  const words = str.toLocaleLowerCase().split("_");
  return words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

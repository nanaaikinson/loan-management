import {
  LoanRequestInterestRateTypeEnum,
  LoanRequestRepaymentFrequencyEnum,
  LoanRequestTypeEnum,
} from "@/openapi/generated";
import type { InferType } from "yup";
import { mixed, number, object, string } from "yup";

// const greaterThanZeroRegex = /^([1-9]\d*|0)(\.\d+)?$/;

export const storeLoanValidationSchema = object({
  amount: number().min(10).label("Amount").required(),
  type: mixed<LoanRequestTypeEnum>()
    .required()
    .oneOf(Object.values(LoanRequestTypeEnum))
    .label("Loan type"),
  repaymentFrequency: mixed<LoanRequestRepaymentFrequencyEnum>()
    .required()
    .oneOf(Object.values(LoanRequestRepaymentFrequencyEnum))

    .label("Repayment frequency"),
  startDate: string().trim().required().label("Start date"),
  interestRateType: string()
    .trim()
    .required()
    .oneOf(Object.values(LoanRequestInterestRateTypeEnum))
    .label("Interest rate type"),
  interestRate: number().required().label("Interest rate"),

  duration: number().label("Duration of loan").required(),
  customerId: string().trim().nullable().optional().label("Customer"),
});
export type StoreLoanForm = InferType<typeof storeLoanValidationSchema>;

export const loanRepaymentValidationSchema = object({
  amount: number().typeError("Amount is required").required().label("Amount"),
  note: string().trim().optional().label("Note"),
});
export type LoanRepaymentForm = InferType<typeof loanRepaymentValidationSchema>;

import {
  LoanRequestInterestRateTypeEnum,
  LoanRequestRepaymentFrequencyEnum,
  LoanRequestTypeEnum,
} from "@/openapi/generated";
import type { InferType } from "yup";
import { mixed, number, object, string } from "yup";

// const greaterThanZeroRegex = /^([1-9]\d*|0)(\.\d+)?$/;

export const storeLoanValidationSchema = object({
  amount: number()
    .typeError("Amount is required")
    .required()
    .test("gt-0", "Amount must be greater than 0", (value) => value > 0)
    .label("Amount"),
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
  interestRate: number()
    .typeError("Interest rate is required")
    .required()
    .test("gt-0", "Interest rate must be greater than 0", (value) => value > 0)
    .label("Interest rate"),
  duration: number()
    .typeError("Duration is required")
    .required()
    .test("gt-0", "Duration must be greater than 0", (value) => value > 0)
    .label("Duration of loan"),
  customerId: string().trim().required().label("Customer"),
});
export type StoreLoanForm = InferType<typeof storeLoanValidationSchema>;

export const loanRepaymentValidationSchema = object({
  amount: number()
    .typeError("Amount is required")
    .required()
    .test("gt-0", "Amount must be greater than 0", (value) => value > 0)
    .label("Amount"),
  note: string().trim().optional().label("Note"),
});
export type LoanRepaymentForm = InferType<typeof loanRepaymentValidationSchema>;

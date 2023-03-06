import type { InferType } from "yup";
import { mixed, number, object, string } from "yup";
import {
    LoanRequestRepaymentFrequencyEnum,
    LoanRequestTypeEnum
} from "./../api-reference/api";

export const validationSchema = object({
  amount: number().min(10).label("Amount").required(),
  type: mixed<LoanRequestTypeEnum>()
    .oneOf(Object.values(LoanRequestTypeEnum))
    .required()
    .label("Loan type"),
  repaymentFrequency: mixed<LoanRequestRepaymentFrequencyEnum>()
    .oneOf(Object.values(LoanRequestRepaymentFrequencyEnum))
    .required()
    .label("Repayment frequency"),
  startDate: string().required().label("Start date"),
  interestRate: number().label("Interest rate").min(1).required(),
  duration: number().label("Duration of loan").required(),
});

export type AddLoansType = InferType<typeof validationSchema>;

import { Loan, Transaction } from "@/openapi/generated";
import { createContext } from "react";

interface ILoanContext {
  loan: Loan;
  updateLoan: (loan: Loan) => void;
  repayments: Array<Transaction>;
  updateRepayments: (repayments: Array<Transaction>) => void;
}

export const LoanContext = createContext<ILoanContext | null>(null);

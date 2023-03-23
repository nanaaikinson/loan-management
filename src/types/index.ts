import { Customer, Loan } from "@/openapi/generated";
import { To } from "react-router-dom";

export type ILoan = Loan;

export interface BreadcrumbItem {
  to?: To;
  label: string;
}

export type CustomerOutletContextType = { customer: Customer };

import { CustomerService } from "@/services/customer.service";
import { LoanService } from "@/services/loan.service";
import { TransactionService } from "@/services/transaction.service";

export const loadCustomers = async () => {
  const { data } = await CustomerService.instance().getCustomers();

  return data;
};

export const loadCustomer = async (customerId: string) => {
  const { data } = await CustomerService.instance().getCustomer(customerId);

  return data;
};

export const loadCustomerLoans = async (customerId: string) => {
  const { data } = await CustomerService.instance().customerLoans(customerId);

  return data;
};

export const loadCustomerTransactions = async (customerId: string) => {
  const { data } = await CustomerService.instance().customerTransactions(
    customerId
  );

  return data;
};

export const loadTransactions = async () => {
  const { data } = await TransactionService.instance().getTransactions();

  return data;
};

export const loadLoans = async () => {
  const { data } = await LoanService.instance().getLoans();

  return data;
};

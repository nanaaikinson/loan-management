import { CustomerService } from "@/services/customer.service";

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

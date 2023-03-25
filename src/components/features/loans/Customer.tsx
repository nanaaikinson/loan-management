import { Customer } from "@/openapi/generated";

interface LoanCustomerProps {
  customer: Customer;
}

const LoanCustomer = ({ customer }: LoanCustomerProps) => {
  // State

  // Template
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col justify-center">
          <div className="rounded-full bg-gray-300 h-20 w-20 mb-2"></div>
          <p className="font-semibold mb-0">
            {customer.firstName} {customer.lastName}
          </p>
          <small className="text-gray-500">{customer.occupation}</small>
        </div>
      </div>
    </>
  );
};

export default LoanCustomer;

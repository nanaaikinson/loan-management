import Avatar from "@/components/common/Avatar";
import { Customer } from "@/openapi/generated";
import { useEffect, useState } from "react";

interface LoanCustomerProps {
  customer: Customer;
}

const LoanCustomer = ({ customer }: LoanCustomerProps) => {
  // State
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [avatarInitials, setAvatarInitials] = useState<boolean>(false);

  // Effects
  useEffect(() => {
    if (customer?.avatar) {
      setAvatarSrc(customer.avatar);
      setAvatarInitials(false);
    } else {
      setAvatarSrc(`${customer.firstName} ${customer.lastName}`);
      setAvatarInitials(true);
    }
  }, [customer]);

  // Template
  return (
    <>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col items-center justify-center">
          <Avatar
            className="h-20 w-20"
            src={avatarSrc}
            initials={avatarInitials}
          />

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

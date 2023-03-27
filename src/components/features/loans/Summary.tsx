import Avatar from "@/components/common/Avatar";
import LoanStatus from "@/components/misc/LoanStatus";
import { LoanContext } from "@/context/loan.context";
import { formatMoney, getDurationInMonthsReadable } from "@/utils/helpers";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LoanSummary = () => {
  const [customerAvatarSrc, setCustomerAvatarSrc] = useState<string>("");
  const [customerAvatarInitials, setCustomerAvatarInitials] =
    useState<boolean>(false);
  const loanContext = useContext(LoanContext);

  useEffect(() => {
    if (loanContext?.loan.customer?.avatar) {
      setCustomerAvatarSrc(loanContext?.loan.customer.avatar);
      setCustomerAvatarInitials(false);
    } else {
      setCustomerAvatarSrc(
        `${loanContext?.loan.customer.firstName} ${loanContext?.loan.customer.lastName}`
      );
      setCustomerAvatarInitials(true);
    }
  }, [loanContext?.loan]);

  if (!loanContext?.loan) return <></>;

  return (
    <div className="flex flex-col gap-y-8 p-5">
      <div className="flex items-center space-x-5">
        <div className="relative">
          <Avatar
            className="h-20 w-20"
            src={customerAvatarSrc}
            initials={customerAvatarInitials}
          />
        </div>

        <div className="flex flex-col flex-1 ">
          <Link to={`/customers/${loanContext?.loan.customer.id}/loans`}>
            <span className="text-info hover:text-info-dark">
              {loanContext?.loan.customer.firstName}{" "}
              {loanContext?.loan.customer.lastName}
            </span>
          </Link>
          <span className="text-gray-500 text-sm capitalize">
            {loanContext?.loan.customer.gender}
          </span>
          <span className="text-gray-500 text-sm capitalize">
            {loanContext?.loan.customer.occupation ?? "No occupation"}
          </span>
        </div>
      </div>

      <div>
        <span className="font-semibold text-lg block mb-5">Loan detail</span>

        <div className="flex flex-col divide-y divide-gray-100 gap-y-2">
          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">ID</span>
            <span className="text-right">{loanContext?.loan.id}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Number</span>
            <span className="text-right">{loanContext?.loan.loanNumber}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Amount</span>
            <span className="text-right">
              {loanContext?.loan.currency}{" "}
              {formatMoney(loanContext?.loan.amount)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Type</span>
            <span className="text-right capitalize">
              {loanContext?.loan.type}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Status</span>
            <span className="text-right">
              <LoanStatus status={loanContext?.loan.status} />
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500 capitalize">
              Repayment Frequency
            </span>
            <span className="text-right capitalize">
              {loanContext?.loan.repaymentFrequency}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Start Date</span>
            <span className="text-right">{loanContext?.loan.startDate}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Proposed End Date</span>
            <span className="text-right">{loanContext?.loan.endDate}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Annual Interest Rate</span>
            <span className="text-right">
              {loanContext?.loan.interestRate}%
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Payment Term</span>
            <span className="text-right">
              {getDurationInMonthsReadable(loanContext?.loan.duration)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Estimated monthly repayment</span>
            <span className="text-right">
              {loanContext?.loan.currency}{" "}
              {formatMoney(loanContext?.loan.repaymentAmount)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Total Interest</span>
            <span className="text-right">
              {loanContext?.loan.currency}{" "}
              {formatMoney(loanContext?.loan.amountDue)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-gray-500">Total Repayment</span>
            <span className="text-right">
              {loanContext?.loan.currency}{" "}
              {formatMoney(loanContext?.loan.totalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;

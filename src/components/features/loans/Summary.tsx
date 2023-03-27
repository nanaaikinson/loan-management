import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import LoanStatus from "@/components/misc/LoanStatus";
import Prompt from "@/components/modals/Prompt";
import { LoanContext } from "@/context/loan.context";
import { LoanApprovalRequestStatusEnum } from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { formatMoney, getDurationInMonthsReadable } from "@/utils/helpers";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { isAxiosError } from "axios";
import classNames from "classnames";
import { Fragment, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const LoanSummary = () => {
  const [customerAvatarSrc, setCustomerAvatarSrc] = useState<string>("");
  const [customerAvatarInitials, setCustomerAvatarInitials] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [promptTitle, setPromptTitle] = useState<string>("");
  const [action, setAction] = useState<LoanApprovalRequestStatusEnum>(
    LoanApprovalRequestStatusEnum.Approved
  );
  const loanContext = useContext(LoanContext);

  // Methods
  const triggerLoanApproval = (status: LoanApprovalRequestStatusEnum) => {
    setAction(status);
    setShowPrompt(true);
  };
  const onLoanApproval = async () => {
    if (loanContext?.loan) {
      setShowPrompt(false);
      setIsSubmitting(true);

      try {
        const { data: response } = await LoanService.instance().loanApproval(
          loanContext?.loan.id,
          { status: action }
        );
        toast.success(response.message);

        loanContext?.updateLoan(response.data);
      } catch (error) {
        if (isAxiosError(error) && error?.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error((error as Error).message);
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Effects
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

  useEffect(() => {
    switch (action) {
      case LoanApprovalRequestStatusEnum.WrittenOff:
        setPromptTitle("Are you sure you want to write off this loan?");
        break;
      case LoanApprovalRequestStatusEnum.Rejected:
        setPromptTitle("Are you sure you want to reject this loan?");
        break;
      case LoanApprovalRequestStatusEnum.Disbursed:
        setPromptTitle("Are you sure you want to disburse this loan?");
        break;
      case LoanApprovalRequestStatusEnum.WaivedOff:
        setPromptTitle("Are you sure you want to waive off this loan?");
        break;
      case LoanApprovalRequestStatusEnum.Closed:
        setPromptTitle("Are you sure you want to close this loan?");
        break;
      default:
        setPromptTitle(`Are you sure you want to approve this loan?`);
        break;
    }
  }, [action]);

  // Template
  if (!loanContext?.loan) return <></>;

  return (
    <>
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
          <div className="flex items-center justify-between mb-5">
            <span className="font-semibold text-lg block">Loan detail</span>

            {(loanContext?.loan.status === "approved" ||
              loanContext?.loan.status === "pending") && (
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <div>
                    <Menu.Button as={Fragment}>
                      <Button
                        size="sm"
                        className="px-10 flex items-center space-x-2"
                        variant="secondary"
                      >
                        <span>Actions</span>
                        <Icon
                          icon="mdi:chevron-down"
                          className={classNames(
                            "transition duration-300 ease-in-out transform h-4 w-4",
                            open ? "rotate-180" : "rotate-0"
                          )}
                        />
                      </Button>
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-1 w-36 bg-white shadow-lg rounded-[5px]">
                        <div className="px-1 py-1 flex flex-col divide-y divide-gray-50">
                          {loanContext?.loan.status === "pending" && (
                            <>
                              <Menu.Item>
                                <button
                                  className="text-left px-4 py-1 text-gray-500 transition rounded-[4px] duration-300 hover:bg-gray-50 hover:text-dark"
                                  onClick={() =>
                                    triggerLoanApproval(
                                      LoanApprovalRequestStatusEnum.Approved
                                    )
                                  }
                                >
                                  Approve
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="text-left px-4 py-1 text-gray-500 transition rounded-[4px] duration-300 hover:bg-gray-50 hover:text-dark"
                                  onClick={() =>
                                    triggerLoanApproval(
                                      LoanApprovalRequestStatusEnum.Rejected
                                    )
                                  }
                                >
                                  Reject
                                </button>
                              </Menu.Item>
                            </>
                          )}
                          {loanContext?.loan.status === "approved" && (
                            <>
                              <Menu.Item>
                                <button
                                  className="text-left px-4 py-1 text-gray-500 transition rounded-[4px] duration-300 hover:bg-gray-50 hover:text-dark"
                                  onClick={() =>
                                    triggerLoanApproval(
                                      LoanApprovalRequestStatusEnum.Disbursed
                                    )
                                  }
                                >
                                  Disburse
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="text-left px-4 py-1 text-gray-500 transition rounded-[4px] duration-300 hover:bg-gray-50 hover:text-dark"
                                  onClick={() =>
                                    triggerLoanApproval(
                                      LoanApprovalRequestStatusEnum.WrittenOff
                                    )
                                  }
                                >
                                  Write off
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="text-left px-4 py-1 text-gray-500 transition rounded-[4px] duration-300 hover:bg-gray-50 hover:text-dark"
                                  onClick={() =>
                                    triggerLoanApproval(
                                      LoanApprovalRequestStatusEnum.WaivedOff
                                    )
                                  }
                                >
                                  Waive off
                                </button>
                              </Menu.Item>
                              <Menu.Item>
                                <button
                                  className="text-left px-4 py-1 text-gray-500 transition rounded-[4px] duration-300 hover:bg-gray-50 hover:text-dark"
                                  onClick={() =>
                                    triggerLoanApproval(
                                      LoanApprovalRequestStatusEnum.Closed
                                    )
                                  }
                                >
                                  Close
                                </button>
                              </Menu.Item>
                            </>
                          )}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </div>
                )}
              </Menu>
            )}
          </div>

          <div className="flex flex-col divide-y divide-gray-100 gap-y-2 mb-8">
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

      <Prompt
        visible={showPrompt}
        title={promptTitle}
        message="This action cannot be undone."
        confirmText="Continue"
        cancelText="Cancel"
        onConfirm={onLoanApproval}
        onCancel={() => setShowPrompt(false)}
      />
    </>
  );
};

export default LoanSummary;

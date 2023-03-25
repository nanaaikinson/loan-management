import Button from "@/components/common/Button";
import LoanCustomer from "@/components/features/loans/Customer";
import LoanRepayments from "@/components/features/loans/Repayments";
import Breadcrumb from "@/components/includes/Breadcrumb";
import { Customer, Loan, Transaction } from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { BreadcrumbItem } from "@/types";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const ViewLoan = () => {
  useTitle(`Loan | Microlend`);

  // State
  const loanData = useLoaderData() as Loan;
  const breadcrumbItems: Array<BreadcrumbItem> = [
    {
      label: "Loans",
      to: "/loans",
    },
    {
      label: `${loanData.id}`,
    },
  ];
  const [loan, setLoan] = useState<Loan>(loanData);
  const [repayments, setRepayments] = useState<Array<Transaction>>([]);

  // Methods
  const fetchRepayments = async () => {
    try {
      const {
        data: { data: response },
      } = await LoanService.instance().getLoanRepayments(loan.id);
      setRepayments(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Effects
  useEffect(() => {
    fetchRepayments();
  }, []);

  // Template
  return (
    <>
      <Breadcrumb items={breadcrumbItems} className="" />

      <div className="container xl:container-fluid">
        <div className="flex flex-col gap-y-10 py-5">
          {/* Summary */}
          {loan?.customer && (
            <>
              <LoanCustomer customer={loan?.customer as Customer} />
            </>
          )}

          {/* Repayments */}
          {loan.status === "approved" && (
            <LoanRepayments
              loan={loan}
              repayments={repayments}
              updateRepayments={setRepayments}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ViewLoan;

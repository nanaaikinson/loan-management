import Button from "@/components/common/Button";
import LoanCustomer from "@/components/features/loans/Customer";
import LoanRepayments from "@/components/features/loans/Repayments";
import Breadcrumb from "@/components/includes/Breadcrumb";
import { Loan, Transaction } from "@/openapi/generated";
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

      <div className="container-fluid">
        <div className="flex flex-col gap-y-10 py-5">
          {/* Summary */}
          <div className="row">
            <div className="col-12 lg:col-4">
              <LoanCustomer customer={loan.customer} />
            </div>

            <div className="col-12 lg:col-8"></div>
          </div>

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

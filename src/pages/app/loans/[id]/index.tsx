import Card from "@/components/common/Card";
import LoanRepayments from "@/components/features/loans/Repayments";
import LoanSummary from "@/components/features/loans/Summary";
import Breadcrumb from "@/components/includes/Breadcrumb";
import { LoanContext } from "@/context/loan.context";
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

      <LoanContext.Provider
        value={{
          loan,
          updateLoan: setLoan,
          repayments,
          updateRepayments: setRepayments,
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 lg:col-4">
              <LoanSummary />
            </div>

            <div className="col-12 lg:col-8">
              <Card className="p-5 h-screen flex flex-col gap-y-8 rounded-none lg:border-t-0">
                <LoanRepayments />
              </Card>
            </div>
          </div>
        </div>
      </LoanContext.Provider>
    </>
  );
};

export default ViewLoan;

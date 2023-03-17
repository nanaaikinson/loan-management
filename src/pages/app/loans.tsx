import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import StoreLoanModal from "@/components/modals/StoreLoanModal";
import { GetLoans200Response, Loan } from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { formatDate, formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const Loans = () => {
  useTitle("Loans | Microlend");

  const loans = (useLoaderData() as GetLoans200Response).data;
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [loan, setLoan] = useState<Loan>();

  const tableColumns = useMemo<Array<ColumnDef<Loan>>>(
    () => [
      {
        header: "Type",
        cell: (val) => (
          <span className="capitalize">{val.row.original.type}</span>
        ),
      },
      {
        header: "Amount",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.amount)}`}</span>
        ),
      },
      {
        header: "Interest Rate",
        cell: (val) => (
          <span className="text-right">{`${val.renderValue()} (${
            val.row.original.interestRateType === "amount" ? "cash" : "%"
          })`}</span>
        ),
        accessorKey: "interestRate",
      },
      {
        header: "Total Amount",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.totalAmount)}`}</span>
        ),
      },
      {
        header: "Status",
        cell: (val) => {
          switch (val.row.original.status) {
            case "pending":
              return <Badge variant="warning" text={"pending"} />;
            case "approved":
              return <Badge variant="success" text={"approved"} />;
            case "rejected":
              return <Badge variant="danger" text={"rejected"} />;
            default:
              return <Badge variant="default" text={val.row.original.status} />;
          }
        },
      },
      {
        header: "Start Date",
        cell: (val) => formatDate(val.row.original.startDate, "MMM DD, YYYY"),
      },
      {
        header: "End Date",
        cell: (val) => formatDate(val.row.original.endDate, "MMM DD, YYYY"),
      },
      {
        header: "Added On",
        cell: (val) => formatDate(val.row.original.createdAt, "MMM DD, YYYY"),
      },
      {
        header: " ",
        cell: (val) => (
          <div className="flex space-x-2 items-center">
            <button
              className="text-info"
              onClick={() => viewLoan(val.row.original)}
            >
              View
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Methods
  const viewLoan = async (loan: Loan) => {
    setLoading(true);

    try {
      const {
        data: { data: response },
      } = await LoanService.instance().getLoan(loan.id);
      setLoan(response);
      setShowLoanModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Template
  return (
    <>
      <div className="container">
        <Card className="p-5 min-h-[400px]">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3>Loans</h3>
              </div>

              <Button onClick={() => setShowLoanModal(true)}>Add loan</Button>
            </div>

            <Table data={loans} columns={tableColumns} />
          </div>
        </Card>
      </div>

      <StoreLoanModal
        visible={showLoanModal}
        loan={loan}
        onClose={() => {
          setShowLoanModal(false);
          setLoan(undefined);
        }}
        onUpdated={() => console.log("updated")}
      />
    </>
  );
};

export default Loans;

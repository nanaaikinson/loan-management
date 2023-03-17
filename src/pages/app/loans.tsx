import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import StoreLoanModal from "@/components/modals/StoreLoanModal";
import { Loan } from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { formatDate, formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

const Loans = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [loans, setLoans] = useState<Array<Loan>>([]);
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
  const fetchData = async () => {
    setLoading(true);

    try {
      const {
        data: { data: loans },
      } = await LoanService.instance().getLoans();
      setLoans(loans);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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

  // Effects
  useEffect(() => {
    fetchData();
  }, []);

  // Template
  return (
    <>
      <div className="container">
        <Card className="rounded-[7px] p-5">
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
        onUpdated={() => fetchData()}
      />
    </>
  );
};

export default Loans;

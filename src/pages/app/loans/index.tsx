import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import LoanStatus from "@/components/misc/LoanStatus";
import LoanModal from "@/components/modals/LoanModal";
import { GetLoans200Response, Loan } from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { formatDate, formatMoney } from "@/utils/helpers";
import { loadLoans } from "@/utils/loaders";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const Loans = () => {
  useTitle("Loans | Microlend");

  const loaderData = (useLoaderData() as GetLoans200Response).data;
  const [loading, setLoading] = useState<boolean>(false);
  const [readonlyLoan, setReadonlyLoan] = useState<boolean>(false);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [loan, setLoan] = useState<Loan>();
  const [loans, setLoans] = useState<Array<Loan>>([]);

  const tableColumns = useMemo<Array<ColumnDef<Loan>>>(
    () => [
      {
        header: "Type",
        cell: (val) => (
          <span className="capitalize">{val.row.original.type}</span>
        ),
      },
      {
        header: "Customer",
        cell: (val) => (
          <span className="capitalize">
            {val.row.original?.customer ? (
              <Link
                to={`/customers/${val.row.original?.customer.id}`}
                className="text-info transition duration-300 hover:text-info-dark"
              >
                {val.row.original?.customer.firstName}{" "}
                {val.row.original?.customer.lastName}
              </Link>
            ) : (
              <span className="text-gray-300">None</span>
            )}
          </span>
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
        header: "Loan Amount",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.amount)}`}</span>
        ),
      },
      {
        header: "Amount to Pay",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.totalAmount)}`}</span>
        ),
      },
      {
        header: "Status",
        cell: (val) => <LoanStatus status={val.row.original.status} />,
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
            <Link
              to={`/loans/${val.row.original.id}`}
              className="text-info hover:text-info-dark"
              onClick={() => viewLoan(val.row.original)}
            >
              View
            </Link>
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
      setReadonlyLoan(response.status === "approved");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const loadData = async () => {
    setLoading(true);

    try {
      const response = await loadLoans();
      setLoans(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    setLoans(loaderData);
  }, []);

  // Template
  return (
    <>
      <div className="container-fluid">
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

      <LoanModal
        visible={showLoanModal}
        readonly={readonlyLoan}
        loan={loan}
        onClose={() => {
          setShowLoanModal(false);
          setLoan(undefined);
        }}
        onUpdated={loadData}
      />
    </>
  );
};

export default Loans;

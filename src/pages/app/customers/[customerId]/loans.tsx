import Table from "@/components/common/Table";
import LoanStatus from "@/components/misc/LoanStatus";
import NoData from "@/components/misc/NoData";
import { CustomerLoans200Response, Loan } from "@/openapi/generated";
import { formatDate, formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";

const CustomerLoans = () => {
  // State
  const loans = (useLoaderData() as CustomerLoans200Response).data;
  const tableColumns = useMemo<Array<ColumnDef<Loan>>>(
    () => [
      {
        header: "Type",
        cell: (val) => (
          <span className="capitalize">{val.row.original.type}</span>
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
        header: "Total Amount",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.totalAmount)}`}</span>
        ),
      },
      {
        header: "Amount Paid",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.amountPaid)}`}</span>
        ),
      },
      {
        header: "Amount Due",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.amountDue)}`}</span>
        ),
      },
      {
        header: "Status",
        cell: (val) => <LoanStatus status={val.row.original.status} />,
      },
      {
        header: "Duration",
        cell: (val) => <span>{val.row.original.duration} months</span>,
      },
      {
        header: "Start Date",
        cell: (val) => formatDate(val.row.original.startDate, "MMM DD, YYYY"),
      },
      {
        header: " ",
        cell: (val) => (
          <div className="flex space-x-3 items-center">
            <Link
              to={`/loans/${val.row.original.id}`}
              className="text-info hover:text-info-dark"
            >
              View
            </Link>
          </div>
        ),
      },
    ],
    []
  );

  // Template
  return (
    <>
      {loans.length > 0 ? (
        <>
          <Table columns={tableColumns} data={loans} />
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default CustomerLoans;

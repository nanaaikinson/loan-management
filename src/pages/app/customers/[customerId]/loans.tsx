import Badge from "@/components/common/Badge";
import Table from "@/components/common/Table";
import { CustomerLoans200Response, Loan } from "@/openapi/generated";
import { formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";

const CustomerLoans = () => {
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
        header: " ",
        cell: (val) => (
          <div className="flex space-x-3 items-center">
            <button className="text-info">View</button>

            {val.row.original.status === "approved" && (
              <button className="text-success">Pay</button>
            )}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      {loans.length > 0 ? (
        <>
          <Table columns={tableColumns} data={loans} />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-36">
          <img src="/images/no_data.svg" alt="no data" className="h-20 mb-4" />
          <p className="text-gray-400">No data found</p>
        </div>
      )}
    </>
  );
};

export default CustomerLoans;

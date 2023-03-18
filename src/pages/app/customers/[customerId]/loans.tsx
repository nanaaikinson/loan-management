import Badge from "@/components/common/Badge";
import Table from "@/components/common/Table";
import NoData from "@/components/misc/NoData";
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
        <NoData />
      )}
    </>
  );
};

export default CustomerLoans;

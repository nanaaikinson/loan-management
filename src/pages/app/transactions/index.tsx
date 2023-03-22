import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import { GetTransactions200Response, Transaction } from "@/openapi/generated";
import { formatDate, formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const Transactions = () => {
  useTitle("Transactions | Microlend");

  const transactions = (useLoaderData() as GetTransactions200Response).data;
  const tableColumns = useMemo<Array<ColumnDef<Transaction>>>(
    () => [
      {
        header: "Amount",
        cell: (val) => (
          <span className="font-semibold">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.amount)}`}</span>
        ),
      },
      // {
      //   header: "Account Number",
      //   cell: (val) => <span className="font-semibold">1234567890</span>,
      // },
      {
        header: "Customer",
        cell: (val) => (
          <>
            <Link to={`/customers/${val.row.original.id}/transactions`}>
              <span className="font-semibold">
                `${val.row.original.customer.firstName} $
                {val.row.original.customer.lastName}`
              </span>
            </Link>
          </>
        ),
      },
      {
        header: "Reference",
        cell: (val) => val.renderValue(),
        accessorKey: "reference",
      },
      {
        header: "Transaction Date",
        cell: (val) => (
          <span>
            {formatDate(
              val.row.original.createdAt,
              "dddd, MMMM DD, YYYY hh:mm A"
            )}
          </span>
        ),
      },
      {
        header: " ",
        cell: (val) => (
          <div className="flex space-x-2">
            <button className="text-info">View</button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <>
      <div className="container xl:container-fluid">
        <Card className="p-5 min-h-[400px]">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3>Transactions</h3>
              </div>
            </div>

            <Table data={transactions} columns={tableColumns} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Transactions;

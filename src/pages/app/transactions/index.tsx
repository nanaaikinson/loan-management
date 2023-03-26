import Badge from "@/components/common/Badge";
import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import TransactionStatus from "@/components/misc/TransactionStatus";
import TransactionModal from "@/components/modals/TransactionModal";
import { GetTransactions200Response, Transaction } from "@/openapi/generated";
import { formatDate, formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const Transactions = () => {
  useTitle("Transactions | Microlend");

  // State
  const transactions = (useLoaderData() as GetTransactions200Response).data;
  const tableColumns = useMemo<Array<ColumnDef<Transaction>>>(
    () => [
      {
        header: "Reference",
        cell: (val) => val.renderValue(),
        accessorKey: "reference",
      },
      {
        header: "Amount",
        cell: (val) => (
          <span className="">{`${val.row.original.currency} ${formatMoney(
            val.row.original.amount
          )}`}</span>
        ),
      },
      {
        header: "Customer",
        cell: (val) => (
          <>
            <Link to={`/customers/${val.row.original?.customer?.id}/loans`}>
              <span className="transition-all duration-300 text-info hover:text-info-dark">
                {`${val.row.original?.customer?.firstName} ${val.row.original?.customer?.lastName}`}
              </span>
            </Link>
          </>
        ),
      },
      {
        header: "Loan",
        cell: (val) =>
          val.row.original.loan ? (
            <>
              <Link to={`/loans/${val.row.original?.loan.id}`}>
                <span className="transition-all duration-300 text-info hover:text-info-dark">
                  {val.row.original?.loan.id}
                </span>
              </Link>
            </>
          ) : (
            <span className="text-gray-300">None</span>
          ),
      },
      {
        header: "Type",
        cell: (val) => val.renderValue(),
        accessorKey: "type",
      },
      {
        header: "Status",
        cell: (val) => <TransactionStatus status={val.row.original.status} />,
      },
      {
        header: "Transaction Date",
        cell: (val) => (
          <span>
            {formatDate(
              val.row.original.createdAt,
              "dddd, MMMM DD, YYYY h:mm A"
            )}
          </span>
        ),
      },
      {
        header: " ",
        cell: (val) => (
          <div className="flex space-x-2">
            <button
              className="text-info"
              onClick={viewTransaction(val.row.original)}
            >
              View
            </button>
          </div>
        ),
      },
    ],
    []
  );
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Methods
  const viewTransaction = (transaction: Transaction) => () => {
    setTransaction(transaction);
    setShowModal(true);
  };

  // Template
  return (
    <>
      <div className="container-fluid">
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

      <TransactionModal
        transaction={transaction as Transaction}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
          setTransaction(null);
        }}
      />
    </>
  );
};

export default Transactions;

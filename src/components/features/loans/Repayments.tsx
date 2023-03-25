import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import { Transaction } from "@/openapi/generated";
import { formatDate, formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface LoanRepaymentsProps {
  repayments: Array<Transaction>;
  updateRepayments: () => void;
}

const LoanRepayments = ({ repayments }: LoanRepaymentsProps) => {
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
        header: "Status",
        cell: (val) => {
          switch (val.row.original.status) {
            case "pending":
              return <Badge variant="warning" text={"pending"} />;
            case "success":
              return <Badge variant="success" text={"success"} />;
            case "failed":
              return <Badge variant="danger" text={"failed"} />;
            default:
              return <Badge variant="default" text={val.row.original.status} />;
          }
        },
      },
      {
        header: "Repayment Date",
        cell: (val) =>
          formatDate(val.row.original.createdAt, "dddd, MMMM DD, YYYY h:mm A"),
      },
    ],
    []
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <span className="font-semibold text-lg">Repayments</span>
        <Button variant="primary">New payment</Button>
      </div>

      <Table columns={tableColumns} data={repayments} />
    </div>
  );
};

export default LoanRepayments;

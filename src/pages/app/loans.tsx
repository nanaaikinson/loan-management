import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Table from "@/components/common/Table";
import StoreLoanModal from "@/components/modals/StoreLoanModal";
import { Loan, LoanStatusEnum } from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { formatDate, formatMoney } from "@/utils/helpers";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

const LoanStatus = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="warning" text={"pending"} />;
    case "approved":
      return <Badge variant="success" text={"approved"} />;
    case "rejected":
      return <Badge variant="danger" text={"rejected"} />;
    default:
      return null;
  }
};

const Loans = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [loans, setLoans] = useState<Array<Loan>>([]);

  const tableColumns = useMemo<Array<ColumnDef<Loan>>>(
    () => [
      {
        header: "Number",
        cell: (val) => val.renderValue(),
        accessorKey: "number",
      },
      {
        header: "Amount",
        cell: (val) => (
          <span className="text-right">{`${
            val.row.original.currency
          } ${formatMoney(val.row.original.amount)}`}</span>
        ),
        accessorKey: "amount",
      },
      {
        header: "Type",
        cell: (val) => (
          <span className="capitalize">{val.row.original.type}</span>
        ),
        accessorKey: "type",
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
        accessorKey: "status",
      },
      {
        header: "Start Date",
        cell: (val) => val.row.original.startDate,
        accessorKey: "startDate",
      },
      {
        header: "End Date",
        cell: (val) => val.row.original.endDate,
        accessorKey: "endDate",
      },
      {
        header: "Created At",
        cell: (val) => formatDate(val.row.original.createdAt),
        accessorKey: "createdAt",
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
        accessorKey: "",
      },
    ],
    []
  );

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
      setShowLoanModal(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h4>Loans</h4>
            <span className="text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
              dolore!
            </span>
          </div>

          <Button onClick={() => setShowLoanModal(true)}>Add loan</Button>
        </div>

        <Table data={loans} columns={tableColumns} />
      </div>

      <StoreLoanModal
        visible={showLoanModal}
        onClose={() => setShowLoanModal(false)}
        onUpdated={() => fetchData()}
      />
    </>
  );
};

export default Loans;

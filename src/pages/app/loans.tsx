import Table from "@/components/common/Table";
import StoreLoanModal from "@/components/modals/StoreLoanModal";
import { Loan } from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

const Loans = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [loans, setLoans] = useState<Array<Loan>>([]);

  const tableColumns = useMemo<Array<ColumnDef<Loan>>>(
    () => [
      {
        header: "Number",
        cell: (row) => row.renderValue(),
        accessorKey: "number",
      },
      {
        header: "Amount",
        cell: (val) => (
          <span className="text-right">{`${val.row.original.currency} ${val.row.original.amount}`}</span>
        ),
        accessorKey: "amount",
      },
      {
        header: "Type",
        cell: (row) => row.renderValue(),
        accessorKey: "type",
      },
      {
        header: "Interest Rate",
        cell: (row) => row.renderValue(),
        accessorKey: "interestRate",
      },
      {
        header: "Status",
        cell: (row) => row.renderValue(),
        accessorKey: "status",
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Table data={loans} columns={tableColumns} />
      </div>

      <StoreLoanModal
        visible={showLoanModal}
        onClose={() => setShowLoanModal(false)}
      />
    </>
  );
};

export default Loans;

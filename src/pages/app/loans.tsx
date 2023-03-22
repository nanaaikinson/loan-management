import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import LoanModal from "@/components/modals/LoanModal";
import Prompt from "@/components/modals/Prompt";
import {
  GetLoans200Response,
  Loan,
  LoanApprovalRequestStatusEnum,
} from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { formatDate, formatMoney } from "@/utils/helpers";
import { loadLoans } from "@/utils/loaders";
import { ColumnDef } from "@tanstack/react-table";
import { isAxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const Loans = () => {
  useTitle("Loans | Microlend");

  const loaderData = (useLoaderData() as GetLoans200Response).data;
  const [loading, setLoading] = useState<boolean>(false);
  const [readonlyLoan, setReadonlyLoan] = useState<boolean>(false);
  const [showLoanModal, setShowLoanModal] = useState<boolean>(false);
  const [showApprovalPrompt, setShowApprovalPrompt] = useState<boolean>(false);
  const [loan, setLoan] = useState<Loan>();
  const [loans, setLoans] = useState<Array<Loan>>([]);
  const [approvalStatus, setApprovalStatus] =
    useState<LoanApprovalRequestStatusEnum>("approved");

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
                {val.row.original?.customer.firstName}
              </Link>
            ) : (
              <span className="text-gray-300">No customer</span>
            )}
          </span>
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

            {val.row.original.status === "pending" && (
              <>
                <button
                  className="text-success"
                  onClick={() => {
                    setLoan(val.row.original);
                    setApprovalStatus("approved");
                    setShowApprovalPrompt(true);
                  }}
                >
                  Approve
                </button>

                <button
                  className="text-danger"
                  onClick={() => {
                    setLoan(val.row.original);
                    setApprovalStatus("rejected");
                    setShowApprovalPrompt(true);
                  }}
                >
                  Reject
                </button>
              </>
            )}
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
  const onHandleLoanApproval = async () => {
    if (loan) {
      await loanApproval();
      await loadData();
    }
  };
  const loanApproval = async () => {
    setLoading(true);
    setShowApprovalPrompt(false);

    try {
      if (loan) {
        const { data: response } = await LoanService.instance().loanApproval(
          loan?.id,
          { status: approvalStatus }
        );
        toast.success(response.message);
      }
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };
  const loadData = async () => {
    const response = await loadLoans();

    setLoans(response.data);
  };

  // Effects
  useEffect(() => {
    setLoans(loaderData);
  }, []);

  // Template
  return (
    <>
      <div className="container xl:container-fluid">
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

      <Prompt
        visible={showApprovalPrompt}
        title={`Are you sure you want to ${
          approvalStatus === "approved" ? "approve" : "reject"
        } this loan?`}
        message="This action cannot be undone."
        onConfirm={onHandleLoanApproval}
        onCancel={() => setShowApprovalPrompt(false)}
      />
    </>
  );
};

export default Loans;

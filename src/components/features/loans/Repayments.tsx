import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";
import Dialog from "@/components/common/Dialog";
import ErrorMessage from "@/components/common/ErrorMessage";
import Table from "@/components/common/Table";
import AmountInput from "@/components/form/AmountInput";
import TransactionModal from "@/components/modals/TransactionModal";
import { LoanContext } from "@/context/loan.context";
import {
  StoreTransactionRequestTypeEnum,
  Transaction,
} from "@/openapi/generated";
import { LoanService } from "@/services/loan.service";
import { formatDate, formatMoney } from "@/utils/helpers";
import {
  LoanRepaymentForm,
  loanRepaymentValidationSchema,
} from "@/validation/loan";
import { yupResolver } from "@hookform/resolvers/yup";
import { ColumnDef } from "@tanstack/react-table";
import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const LoanRepayments = () => {
  // State
  const [amount, setAmount] = useState<number>(0);
  const [isSubmittingLoanRepayment, setIsSubmittingLoanRepayment] =
    useState<boolean>(false);
  const [showRepaymentModal, setShowRepaymentModal] = useState<boolean>(false);
  const [showTransactionModal, setShowTransactionModal] =
    useState<boolean>(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
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
      {
        header: " ",
        cell: (val) => (
          <button
            className="text-info hover:text-info-dark"
            onClick={() => viewRepayment(val.row.original)}
          >
            View
          </button>
        ),
      },
    ],
    []
  );
  const loanContext = useContext(LoanContext);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoanRepaymentForm>({
    resolver: yupResolver(loanRepaymentValidationSchema),
  });

  // Methods
  const onLoanRepayment = async (data: LoanRepaymentForm) => {
    try {
      if (amount <= 0) {
        setError("amount", {
          type: "manual",
          message: "Amount must be greater than 0",
        });
        return;
      }

      setIsSubmittingLoanRepayment(true);

      const { data: response } = await LoanService.instance().loanRepayment(
        loanContext?.loan.id as string,
        {
          amount: data.amount,
          currency: loanContext?.loan.currency as string,
          customer: loanContext?.loan?.customer?.id as string,
          type: StoreTransactionRequestTypeEnum.LoanRepayment,
          loan: loanContext?.loan.id as string,
          note: data?.note ?? "",
        }
      );

      toast.success(response.message);
      loanContext?.updateRepayments([
        response.data,
        ...(loanContext?.repayments as Transaction[]),
      ]);

      const { data: loanResponse } = await LoanService.instance().getLoan(
        loanContext?.loan.id as string
      );
      loanContext?.updateLoan(loanResponse.data);

      closeRepaymentModal();
    } catch (error) {
      //
    } finally {
      setIsSubmittingLoanRepayment(false);
    }
  };
  const closeRepaymentModal = () => {
    setShowRepaymentModal(false);
    setAmount(0);
    reset();
  };
  const viewRepayment = (repayment: Transaction) => {
    setTransaction(repayment);
    setShowTransactionModal(true);
  };
  const closeTransactionModal = () => {
    setShowTransactionModal(false);
    setTransaction(null);
  };

  // Template
  if (!loanContext?.loan) return <></>;

  return (
    <>
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="font-semibold text-lg">Repayments</span>
          {loanContext?.loan.status === "approved" &&
            loanContext?.loan.amountDue > 0 && (
              <Button
                variant="primary"
                type="button"
                onClick={() => setShowRepaymentModal(true)}
              >
                New payment
              </Button>
            )}
        </div>

        <Table columns={tableColumns} data={loanContext?.repayments} />
      </div>

      <Dialog
        size="sm"
        visible={showRepaymentModal}
        onClose={() => setShowRepaymentModal(false)}
      >
        <div className="py-5 px-8">
          <h4 className="mb-0">New payment</h4>
        </div>

        <div className="pt-8 pb-10 px-8">
          <form onSubmit={handleSubmit(onLoanRepayment)}>
            <div className="mb-4">
              <label htmlFor="amount">Amount *</label>
              <AmountInput
                currency="GHS"
                value={amount}
                onChange={(value) => {
                  setAmount(value);
                  setValue("amount", value);
                  setError("amount", { type: "manual", message: "" });
                }}
              />
              {errors?.amount?.message && (
                <ErrorMessage message={errors?.amount?.message} />
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="note">Note</label>
              <textarea
                {...register("note")}
                name="note"
                id="note"
                cols={30}
                rows={4}
                className="form-input"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end gap-x-3">
              <Button
                variant="secondary"
                className="px-10"
                type="button"
                disabled={isSubmittingLoanRepayment}
                onClick={closeRepaymentModal}
              >
                Cancel
              </Button>
              <Button
                className="px-10"
                type="submit"
                disabled={isSubmittingLoanRepayment}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      <TransactionModal
        visible={showTransactionModal}
        transaction={transaction as Transaction}
        onClose={closeTransactionModal}
      />
    </>
  );
};

export default LoanRepayments;

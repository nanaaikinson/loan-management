import CloseButton from "../common/CloseButton";
import Dialog from "../common/Dialog";
import TransactionStatus from "../misc/TransactionStatus";
import { Transaction } from "@/openapi/generated";
import { formatDate, formatMoney } from "@/utils/helpers";

interface TransactionModalProps {
  visible: boolean;
  transaction: Transaction;
  onClose: () => void;
}

const TransactionModal = ({
  transaction,
  visible,
  onClose,
}: TransactionModalProps) => {
  if (!transaction) return null;
  return (
    <>
      <Dialog visible={visible} size="sm">
        <div className="flex items-center justify-between py-5 px-8">
          <h4 className="mb-0">Transaction details</h4>

          <CloseButton onClick={onClose} />
        </div>
        <div className="py-8 px-8">
          <div className="flex flex-col divide-y divide-gray-100 gap-y-2">
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Transaction ID</span>
              <span className="text-right">{transaction.id}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Reference</span>
              <span className="text-right">{transaction.reference}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Amount</span>
              <span className="text-right">
                {transaction.currency} {formatMoney(transaction.amount)}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Customer</span>
              <span className="text-right">
                {transaction?.customer
                  ? `${transaction?.customer?.firstName} ${transaction?.customer?.lastName}`
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Status</span>
              <span className="text-right">
                <TransactionStatus status={transaction.status} />
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Transaction Date</span>
              <span className="text-right">
                {formatDate(
                  transaction.createdAt,
                  "dddd, MMMM DD, YYYY h:mm A"
                )}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Transaction Type</span>
              <span className="text-right capitalize">{transaction.type}</span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-500">Loan Repayment</span>
              <span className="text-right capitalize">
                {transaction.loanRepayment ? "True" : "False"}
              </span>
            </div>

            {transaction?.loan && (
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500">Loan</span>
                <span className="text-right">{transaction?.loan.id}</span>
              </div>
            )}

            <div className="flex flex-col pt-2">
              <span className="text-gray-500">Note</span>
              <span className="">{transaction?.note}</span>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TransactionModal;

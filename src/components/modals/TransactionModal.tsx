import CloseButton from "../common/CloseButton";
import Dialog from "../common/Dialog";
import { Transaction } from "@/openapi/generated";

interface TransactionModalProps {
  visible: boolean;
  transaction: Transaction;
  onClose: () => void;
}

const TransactionModal = ({ transaction, visible }: TransactionModalProps) => {
  return (
    <>
      <Dialog visible={visible}>
        <div className="flex items-center justify-between py-3 px-8">
          <h3 className="mb-0">Transaction details</h3>

          <CloseButton />
        </div>
        <div className="py-8 px-8"></div>
      </Dialog>
    </>
  );
};

export default TransactionModal;

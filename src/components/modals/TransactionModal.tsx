import AmountInput from "../common/AmountInput";
import Button from "@/components/common/Button";
import CloseButton from "@/components/common/CloseButton";
import Dialog from "@/components/common/Dialog";
import ErrorMessage from "@/components/common/ErrorMessage";
import { Customer, StoreTransactionRequestTypeEnum } from "@/openapi/generated";
import { TransactionService } from "@/services/transaction.service";
import {
  StoreTransactionForm,
  storeTransactionValidationSchema,
} from "@/validation/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface TransactionModalProps {
  customer: Customer;
  visible: boolean;
  readonly?: boolean;
  loanId?: string;
  currency?: string;
  onClose: () => void;
  onUpdate?: () => void;
}

const transactionTypeOptions = Object.values(StoreTransactionRequestTypeEnum);

const TransactionModal = ({
  visible,
  customer,
  loanId,
  currency = "GHS",
  readonly,
  onClose,
  onUpdate,
}: TransactionModalProps) => {
  // State
  const [amount, setAmount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    setValue,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<StoreTransactionForm>({
    resolver: yupResolver(storeTransactionValidationSchema),
  });

  // Methods
  const onSubmit = async (data: StoreTransactionForm) => {
    setIsSubmitting(true);

    try {
      const { data: response } =
        await TransactionService.instance().createTransaction({
          customer: customer.id,
          loan: loanId ?? null,
          amount: data.amount,
          type: data.type as StoreTransactionRequestTypeEnum,
          note: data.note ?? "",
          currency: data.currency,
        });

      toast.success(response.message);
      onUpdate?.();
      handleClose();
    } catch (error) {
      if (isAxiosError(error) && error?.response) {
        const { status, data } = error.response;

        if (status === 401) {
          for (const [key, value] of Object.entries(data.errors)) {
            const val = value as Array<string>;

            if (key === "amount") {
              setError(key, { message: val[0] });
            }
            if (key === "type") {
              setError(key, { message: val[0] });
            }
          }
        } else {
          toast.error(data.message);
        }
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClose = () => {
    setAmount(0);
    reset();
    onClose();
  };

  // Effects
  useEffect(() => {
    setValue("currency", currency);
  }, [visible]);

  return (
    <>
      <Dialog visible={visible} size="xs">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-12 px-5 border-b border-gray-100">
            <h3 className="text-xl mb-0">Transaction</h3>

            <CloseButton onClick={handleClose} />
          </div>

          <div className="py-8 px-5 flex-1 overflow-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="">Customer</label>
                    <div>{`${customer.firstName} ${customer.lastName}`}</div>
                  </div>
                </div>

                <div className="col-12 lg:col-12">
                  <div className="mb-4">
                    <label htmlFor="amount">Amount *</label>
                    <AmountInput
                      value={amount}
                      onChange={(value) => {
                        setValue("amount", value);
                        setAmount(value);
                      }}
                    />
                    {errors?.amount?.message && (
                      <ErrorMessage message={errors.amount?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12 lg:col-12">
                  <div className="mb-4">
                    <label htmlFor="type">Type *</label>
                    <select
                      {...register("type")}
                      name="type"
                      id="type"
                      className="form-select"
                    >
                      <option value="">Select option</option>
                      {transactionTypeOptions.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors?.type?.message && (
                      <ErrorMessage message={errors.type?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12 lg:col-12">
                  <div className="mb-4">
                    <label htmlFor="type">Note</label>
                    <textarea
                      {...register("note")}
                      name="note"
                      id="note"
                      cols={30}
                      rows={4}
                      className="form-input"
                    ></textarea>
                  </div>
                </div>

                <div className="col-12">
                  <div className="pt-4 flex">
                    <Button
                      type="submit"
                      className="ml-auto px-10"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Transact"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default TransactionModal;

import Button from "@/components/common/Button";
import CloseButton from "@/components/common/CloseButton";
import Dialog from "@/components/common/Dialog";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  CreateLoan200Response,
  LoanRequestInterestRateTypeEnum,
  LoanRequestRepaymentFrequencyEnum,
  LoanRequestTypeEnum,
  UpdateLoan200Response,
} from "@/openapi/generated";
import { CustomerService } from "@/services/customer.service";
import { LoanService } from "@/services/loan.service";
import { type ILoan } from "@/types";
import { formatDate } from "@/utils/helpers";
import { StoreLoanForm, storeLoanValidationSchema } from "@/validation/loan";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { isAxiosError } from "axios";
import "flatpickr/dist/flatpickr.min.css";
import { useEffect, useState } from "react";
import DatePicker from "react-flatpickr";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import AsyncSelect from "react-select/async";

interface StoreLoanModalProps {
  visible: boolean;
  readonly: boolean;
  loan?: ILoan;
  onClose: () => void;
  onUpdated?: () => void;
}

const StoreLoanModal = ({
  visible,
  readonly: readonlyProp,
  loan,
  onClose,
  onUpdated,
}: StoreLoanModalProps) => {
  const [interestLabel, setInterestLabel] = useState<string>("in cash");
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [customer, setCustomer] = useState<{ name: string; id: string }>({
    name: "",
    id: "",
  });
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StoreLoanForm>({
    resolver: yupResolver(storeLoanValidationSchema),
    defaultValues: {
      type: "personal",
      repaymentFrequency: "monthly",
      interestRateType: "amount",
      duration: 0,
      amount: 0,
      interestRate: 0,
    },
  });

  // Methods
  const onInputAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };
  const onSubmit = async (data: StoreLoanForm) => {
    const request = { ...data, startDate, customerId: customer.id };
    let response: CreateLoan200Response | UpdateLoan200Response;

    setLoading(true);

    try {
      if (loan?.id) {
        const { data } = await LoanService.instance().updateLoan(
          loan?.id,
          request
        );
        response = data;
      } else {
        const { data } = await LoanService.instance().createLoan(request);
        response = data;
      }

      // Show toast notification
      toast.success(response.message, { position: "top-center" });

      onUpdated && onUpdated();
      handleClose();
    } catch (error) {
      if (isAxiosError(error) && error?.response) {
        const { status, data } = error.response;

        if (status === 422) {
          const { errors } = data;

          for (const [key, value] of Object.entries(errors)) {
            const err = (value as Array<string>)[0];

            if (key === "amount") {
              setError("amount", {
                message: err,
              });
            }
            if (key === "interestRate") {
              setError("interestRate", {
                message: err,
              });
            }
            if (key === "duration") {
              setError("duration", {
                message: err,
              });
            }
            if (key === "repaymentFrequency") {
              setError("repaymentFrequency", {
                message: err,
              });
            }
            if (key === "interestRateType") {
              setError("interestRateType", {
                message: err,
              });
            }
            if (key === "type") {
              setError("type", {
                message: err,
              });
            }
            if (key === "startDate") {
              setError("startDate", {
                message: err,
              });
            }
          }
        } else {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setLoading(false);
    setStartDate("");
    setInterestLabel("in cash");
    setCustomer({ name: "", id: "" });
    reset();
    onClose();
  };
  const loadCustomers = async (inputValue: string) => {
    try {
      const {
        data: { data: response },
      } = await CustomerService.instance().customersSearch(inputValue);

      return response.map((customer) => ({
        value: customer.id,
        label: customer.name,
      }));
    } catch (error) {
      return [];
    }
  };

  // Effects
  useEffect(() => {
    if (loan) {
      setValue("amount", loan.amount);
      setValue("type", loan.type);
      setValue("repaymentFrequency", loan.repaymentFrequency);
      setValue("startDate", loan.startDate);
      setStartDate(loan.startDate);
      setValue("interestRateType", loan.interestRateType);
      setValue("interestRate", loan.interestRate);
      setInterestLabel(
        loan.interestRateType === "amount" ? "in cash" : "per month"
      );
      setValue("duration", loan.duration);
      if (loan?.customer) {
        setCustomer({
          name: `${loan.customer.firstName} ${loan.customer.lastName}`,
          id: loan.customer.id,
        });
      }
    }
  }, [visible]);

  // Template
  return (
    <>
      {/* <Dialog visible={visible} className="w-full lg:!w-[30%] xl:!w-[28%]"> */}
      <Dialog visible={visible} size="xs">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-12 px-5 border-b border-gray-100">
            <h3 className="text-xl font-medium mb-0">Loan</h3>

            <CloseButton onClick={handleClose} />
          </div>

          <div className="py-8 px-5 flex-1 overflow-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="type">Type*</label>
                    <select
                      {...register("type")}
                      name="type"
                      id="type"
                      className="form-select"
                      disabled={readonlyProp}
                    >
                      <option value="">Select option</option>
                      {Object.values(LoanRequestTypeEnum).map((type, index) => (
                        <option value={type} key={index}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors?.type?.message && (
                      <ErrorMessage message={errors?.type?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="repaymentFrequency">
                      Repayment Frequency*
                    </label>
                    <select
                      {...register("repaymentFrequency")}
                      name="repaymentFrequency"
                      id="repaymentFrequency"
                      className="form-select"
                      disabled={readonlyProp}
                    >
                      <option value="">Select option</option>
                      {Object.values(LoanRequestRepaymentFrequencyEnum).map(
                        (frequency, index) => (
                          <option value={frequency} key={index}>
                            {frequency}
                          </option>
                        )
                      )}
                    </select>
                    {errors?.repaymentFrequency?.message && (
                      <ErrorMessage
                        message={errors?.repaymentFrequency?.message}
                      />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="amount">Amount*</label>
                    <input
                      {...register("amount")}
                      type="text"
                      name="amount"
                      id="amount"
                      className="form-input"
                      onInput={onInputAmount}
                      disabled={readonlyProp}
                    />
                    {errors?.amount?.message && (
                      <ErrorMessage message={errors?.amount?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="startDate">Start Date*</label>
                    <div className="relative">
                      <DatePicker
                        {...register("startDate")}
                        id="startDate"
                        className="date-picker pr-14"
                        placeholder="Select date"
                        value={startDate}
                        onChange={([date]) => {
                          const d = formatDate(date, "YYYY-MM-DD");
                          setValue("startDate", d);
                          setStartDate(d);
                        }}
                        disabled={readonlyProp}
                      />
                      <div className="absolute top-0 right-0 h-full w-12 flex items-center justify-center pointer-events-none">
                        <Icon icon="bx:calendar" />
                      </div>
                    </div>
                    {errors?.startDate?.message && (
                      <ErrorMessage message={errors?.startDate?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="interestRateType">
                      Interest Rate Type*
                    </label>
                    <select
                      {...register("interestRateType")}
                      name="interestRateType"
                      id="interestRateType"
                      className="form-select"
                      onChange={(e) => {
                        const value = e.target.value;
                        setInterestLabel(
                          value === "amount" ? "in cash" : "in %"
                        );
                      }}
                      disabled={readonlyProp}
                    >
                      <option value="" disabled>
                        Select option
                      </option>
                      {Object.values(LoanRequestInterestRateTypeEnum).map(
                        (type, index) => (
                          <option value={type} key={index}>
                            {type}
                          </option>
                        )
                      )}
                    </select>
                    {errors?.interestRateType?.message && (
                      <ErrorMessage
                        message={errors?.interestRateType?.message}
                      />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="interestRate">
                      Interest Rate ({interestLabel})*
                    </label>
                    <input
                      {...register("interestRate")}
                      type="text"
                      name="interestRate"
                      id="interestRate"
                      className="form-input"
                      onInput={onInputAmount}
                      disabled={readonlyProp}
                    />
                    {errors?.interestRate?.message && (
                      <ErrorMessage message={errors?.interestRate?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="duration">Duration (months)*</label>
                    <input
                      {...register("duration")}
                      type="number"
                      name="duration"
                      id="duration"
                      className="form-input"
                      disabled={readonlyProp}
                    />
                    {errors?.duration?.message && (
                      <ErrorMessage message={errors?.duration?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    {customer.id.length ? (
                      <>
                        <label htmlFor="">Customer</label>
                        <div className="flex justify-between items-center">
                          <p className="mb-0">{customer?.name}</p>

                          {!readonlyProp && (
                            <button
                              type="button"
                              className="text-danger h-8 w-8 hover:bg-danger hover:bg-opacity-10 rounded-full flex items-center justify-center"
                              onClick={() => {
                                setCustomer({ name: "", id: "" });
                              }}
                            >
                              <Icon icon="bx:trash" />
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {!readonlyProp && (
                          <>
                            <label htmlFor="customerId">Search customer</label>
                            <AsyncSelect
                              className="react-form-select"
                              classNamePrefix="react-select"
                              cacheOptions
                              loadOptions={loadCustomers}
                              onChange={(option) => {
                                if (option) {
                                  setCustomer({
                                    name: option.label,
                                    id: option.value,
                                  });
                                }
                              }}
                            />
                            {errors?.customerId?.message && (
                              <ErrorMessage
                                message={errors?.customerId?.message}
                              />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>

              {!readonlyProp && (
                <div className="pt-4 flex">
                  <Button
                    type="submit"
                    className="ml-auto px-10"
                    disabled={loading}
                  >
                    {loading
                      ? loan?.id
                        ? "Updating..."
                        : "Submitting..."
                      : loan?.id
                      ? "Update"
                      : "Submit"}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default StoreLoanModal;

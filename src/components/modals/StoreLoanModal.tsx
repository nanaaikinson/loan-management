import Button from "../common/Button";
import CloseButton from "../common/CloseButton";
import Drawer from "../common/Drawer";
import ErrorMessage from "../common/ErrorMessage";
import {
  LoanRequestInterestRateTypeEnum,
  LoanRequestRepaymentFrequencyEnum,
  LoanRequestTypeEnum,
} from "@/openapi/generated";
import { CustomerService } from "@/services/customer.service";
import { LoanService } from "@/services/loan.service";
import { formatDate } from "@/utils/helpers";
import { StoreLoanForm, storeLoanValidationSchema } from "@/validation/loan";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { isAxiosError } from "axios";
import "flatpickr/dist/flatpickr.min.css";
import { useState } from "react";
import DatePicker from "react-flatpickr";
import { useForm } from "react-hook-form";
import AsyncSelect from "react-select/async";

interface StoreLoanModalProps {
  visible: boolean;
  onClose: () => void;
}

const StoreLoanModal = ({ visible, onClose }: StoreLoanModalProps) => {
  const [interestLabel, setInterestLabel] = useState<string>("in cash");
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
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

  const onInputAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
  };

  const onSubmit = async (data: StoreLoanForm) => {
    setLoading(true);

    try {
      const {
        data: { data: response },
      } = await LoanService.instance().createLoan(data);
      console.log(response);

      // Show toast notification
      // Close modal
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

  return (
    <>
      <Drawer visible={visible} className="w-full lg:!w-[30%] xl:!w-[28%]">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-12 px-5 border-b border-gray-100">
            <h3 className="text-lg font-medium mb-0">Loan</h3>

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
                    />
                    {errors?.duration?.message && (
                      <ErrorMessage message={errors?.duration?.message} />
                    )}
                  </div>
                </div>

                <div className="col-12">
                  <div className="mb-4">
                    <label htmlFor="customerId">Assign customer</label>
                    <AsyncSelect
                      className="react-form-select"
                      classNamePrefix="react-select"
                      cacheOptions
                      loadOptions={loadCustomers}
                    />
                    {errors?.customerId?.message && (
                      <ErrorMessage message={errors?.customerId?.message} />
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex">
                <Button
                  type="submit"
                  className="ml-auto px-10"
                  disabled={loading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default StoreLoanModal;

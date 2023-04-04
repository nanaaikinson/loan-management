import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import Input from "@/components/form/TextInput";
import { StoreCustomerContext } from "@/context/customer.context";
import {
  StoreCustomerRequestGenderEnum,
  StoreCustomerRequestMaritalStatusEnum,
} from "@/openapi/generated";
import { formatDate, getEnumOptions } from "@/utils/helpers";
import {
  PersonalInfoForm,
  personalInfoValidationSchema,
} from "@/validation/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-flatpickr";
import { Controller, useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";

interface PersonalInformationProps {
  updateStep: () => void;
}

// 18 years and above
const maxDateOfBirth = new Date();
maxDateOfBirth.setFullYear(maxDateOfBirth.getFullYear() - 18);

const PersonalInformation = ({ updateStep }: PersonalInformationProps) => {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const storeCustomerContext = useContext(StoreCustomerContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    control,
  } = useForm<PersonalInfoForm>({
    resolver: yupResolver(personalInfoValidationSchema),
  });

  const onSubmit = async (data: PersonalInfoForm) => {
    if (storeCustomerContext) {
      storeCustomerContext.updatePersonalInfo(data);

      updateStep();
    }
  };

  const location = useLocation();

  const isEditRoute = location.pathname.includes("edit");

  useEffect(() => {
    if (storeCustomerContext?.customer) {
      setValue("firstName", storeCustomerContext.customer.firstName);
      setValue("lastName", storeCustomerContext.customer.lastName);
      setValue("gender", storeCustomerContext.customer.gender);
      setValue("maritalStatus", storeCustomerContext.customer.maritalStatus);
      setValue("dateOfBirth", storeCustomerContext.customer.dateOfBirth);
      setValue("email", storeCustomerContext.customer.email);
      setValue("phoneNumber", storeCustomerContext.customer.phoneNumber);
      setValue("gpAddress", storeCustomerContext.customer.gpAddress);
      setValue("postalAddress", storeCustomerContext.customer.postalAddress);
      setValue("occupation", storeCustomerContext.customer.occupation);
      setValue("secondaryPhone", storeCustomerContext.customer.secondaryPhone);
      setDateOfBirth(storeCustomerContext.customer.dateOfBirth);
    }
  }, [storeCustomerContext?.customer]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 lg:gap-4 lg:gap-x-8">
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                label={"First name"}
                id="firstName"
                disabled={isEditRoute}
                error={errors?.firstName?.message}
                required
                {...field}
              />
            )}
          />{" "}
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                label={"Last name"}
                id="lastName"
                disabled={isEditRoute}
                error={errors?.lastName?.message}
                required
                {...field}
              />
            )}
          />{" "}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Input
                variant="select"
                label={"Gender"}
                id="gender"
                error={errors?.gender?.message}
                required
                {...field}
                options={getEnumOptions(StoreCustomerRequestGenderEnum)}
              />
            )}
          />
          <div className="">
            <div className="mb-4">
              <label htmlFor="dateOfBirth">
                Date Of Birth <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  {...register("dateOfBirth")}
                  id="dateOfBirth"
                  className="date-picker pr-14"
                  placeholder="Select date"
                  value={dateOfBirth}
                  options={{ maxDate: maxDateOfBirth }}
                  onChange={([date]) => {
                    const d = formatDate(date, "YYYY-MM-DD");
                    setValue("dateOfBirth", d);
                    setDateOfBirth(d);
                  }}
                />
                <div className="absolute top-0 right-0 h-full w-12 flex items-center justify-center pointer-events-none">
                  <Icon icon="bx:calendar" />
                </div>
              </div>
              {errors?.dateOfBirth?.message && (
                <ErrorMessage message={errors?.dateOfBirth?.message} />
              )}
            </div>
          </div>
          <Controller
            name="maritalStatus"
            control={control}
            render={({ field }) => (
              <Input
                variant="select"
                label={"Marital Status"}
                id="maritalStatus"
                error={errors?.maritalStatus?.message}
                required
                {...field}
                options={getEnumOptions(StoreCustomerRequestMaritalStatusEnum)}
              />
            )}
          />{" "}
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <Input
                label={"Phone number"}
                id="phoneNumber"
                error={errors?.phoneNumber?.message}
                required
                {...field}
              />
            )}
          />
          <Controller
            name="secondaryPhone"
            control={control}
            render={({ field }) => (
              <Input
                label={"Secondary phone"}
                id="secondaryPhone"
                error={errors?.secondaryPhone?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                label={"Email"}
                id="email"
                error={errors?.email?.message}
                {...field}
              />
            )}
          />{" "}
          <Controller
            name="occupation"
            control={control}
            render={({ field }) => (
              <Input
                label={"Occupation"}
                id="occupation"
                error={errors?.occupation?.message}
                {...field}
              />
            )}
          />{" "}
          <Controller
            name="gpAddress"
            control={control}
            render={({ field }) => (
              <Input
                label={"Ghana post address"}
                id="gpAddress"
                error={errors?.gpAddress?.message}
                {...field}
              />
            )}
          />{" "}
          <Controller
            name="postalAddress"
            control={control}
            render={({ field }) => (
              <Input
                label={"Postal address"}
                id="postalAddress"
                error={errors?.postalAddress?.message}
                {...field}
              />
            )}
          />
        </div>

        <div className="mt-10 flex justify-end">
          <Button type="submit" className="px-10">
            Next
          </Button>
        </div>
      </form>
    </>
  );
};

export default PersonalInformation;

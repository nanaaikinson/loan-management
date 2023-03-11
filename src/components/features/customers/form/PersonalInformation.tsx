import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { StoreCustomerContext } from "@/context/customer.context";
import {
  StoreCustomerRequestGenderEnum,
  StoreCustomerRequestMaritalStatusEnum,
} from "@/openapi/generated";
import { formatDate } from "@/utils/helpers";
import {
  PersonalInfoForm,
  personalInfoValidationSchema,
} from "@/validation/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import DatePicker from "react-flatpickr";
import { useForm } from "react-hook-form";

interface PersonalInformationProps {
  updateStep: () => void;
}

const genderOptions = Object.values(StoreCustomerRequestGenderEnum);
const maritalStatusOptions = Object.values(
  StoreCustomerRequestMaritalStatusEnum
);
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
  } = useForm<PersonalInfoForm>({
    resolver: yupResolver(personalInfoValidationSchema),
  });

  const onSubmit = async (data: PersonalInfoForm) => {
    if (storeCustomerContext) {
      storeCustomerContext.updatePersonalInfo(data);

      updateStep();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="firstName">
                First name <span className="text-danger">*</span>
              </label>
              <input
                {...register("firstName")}
                type="text"
                name="firstName"
                id="firstName"
                className="form-input"
              />
              {errors?.firstName?.message && (
                <ErrorMessage message={errors?.firstName?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="lastName">
                Last name <span className="text-danger">*</span>
              </label>
              <input
                {...register("lastName")}
                type="text"
                name="lastName"
                id="lastName"
                className="form-input"
              />
              {errors?.lastName?.message && (
                <ErrorMessage message={errors?.lastName?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="gender">
                Gender <span className="text-danger">*</span>
              </label>
              <select
                {...register("gender")}
                name="gender"
                id="gender"
                className="form-select"
              >
                <option value="">Select option</option>
                {genderOptions.map((g, index) => (
                  <option key={index} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors?.gender?.message && (
                <ErrorMessage message={errors?.gender?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
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

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="maritalStatus">
                Marital status <span className="text-danger">*</span>
              </label>
              <select
                {...register("maritalStatus")}
                name="maritalStatus"
                id="maritalStatus"
                className="form-select"
              >
                <option value="">Select option</option>
                {maritalStatusOptions.map((g, index) => (
                  <option key={index} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              {errors?.maritalStatus?.message && (
                <ErrorMessage message={errors?.maritalStatus?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="phoneNumber">
                Phone number <span className="text-danger">*</span>
              </label>
              <input
                {...register("phoneNumber")}
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="form-input"
              />
              {errors?.phoneNumber?.message && (
                <ErrorMessage message={errors?.phoneNumber?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="secondaryPhone">Secondary phone</label>
              <input
                {...register("secondaryPhone")}
                type="text"
                name="secondaryPhone"
                id="secondaryPhone"
                className="form-input"
              />
              {errors?.secondaryPhone?.message && (
                <ErrorMessage message={errors?.secondaryPhone?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="email">Email</label>
              <input
                {...register("email")}
                type="text"
                name="email"
                id="email"
                className="form-input"
              />
              {errors?.email?.message && (
                <ErrorMessage message={errors?.email?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="occupation">Occupation</label>
              <input
                {...register("occupation")}
                type="text"
                name="occupation"
                id="occupation"
                className="form-input"
              />
              {errors?.occupation?.message && (
                <ErrorMessage message={errors?.occupation?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="gpAddress">Ghana post address</label>
              <input
                {...register("gpAddress")}
                type="text"
                name="gpAddress"
                id="gpAddress"
                className="form-input"
              />
              {errors?.gpAddress?.message && (
                <ErrorMessage message={errors?.gpAddress?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="postalAddress">Postal address</label>
              <input
                {...register("postalAddress")}
                type="text"
                name="postalAddress"
                id="postalAddress"
                className="form-input"
              />
              {errors?.postalAddress?.message && (
                <ErrorMessage message={errors?.postalAddress?.message} />
              )}
            </div>
          </div>
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

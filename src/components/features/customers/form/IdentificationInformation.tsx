import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { StoreCustomerContext } from "@/context/customer.context";
import { StoreCustomerRequestIdTypeEnum } from "@/openapi/generated";
import { formatDate } from "@/utils/helpers";
import {
  IdentificationInfoForm,
  identificationValidationSchema,
} from "@/validation/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import classNames from "classnames";
import { useContext, useState } from "react";
import DatePicker from "react-flatpickr";
import { useForm } from "react-hook-form";

interface IdentificationInformationProps {
  updateStep: () => void;
}

const idTypeOptions = Object.values(StoreCustomerRequestIdTypeEnum);

const IdentificationInformation = ({
  updateStep,
}: IdentificationInformationProps) => {
  const [idIssueDate, setIdIssueDate] = useState<string>("");
  const [idExpiryDate, setIdExpiryDate] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [idFrontImage, setIdFrontImage] = useState<string>("");
  const [idFrontImageFile, setIdFrontImageFile] = useState<File>();
  const [idBackImage, setIdBackImage] = useState<string>("");
  const [idBackImageFile, setIdBackImageFile] = useState<File>();
  const storeCustomerContext = useContext(StoreCustomerContext);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IdentificationInfoForm>({
    resolver: yupResolver(identificationValidationSchema),
  });

  const onSubmit = async (data: IdentificationInfoForm) => {
    if (storeCustomerContext) {
      storeCustomerContext.updateIdentificationInfo({
        ...storeCustomerContext?.customer,
        ...data,
      });
    }
  };

  const onChangeImageFile = (
    type: "idFrontImage" | "idBackImage",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (type === "idFrontImage") {
        setIdFrontImage(fileUrl);
        setIdFrontImageFile(file);
      }
      if (type === "idBackImage") {
        setIdBackImage(fileUrl);
        setIdBackImageFile(file);
      }
    }
  };

  const removeImage = (type: "idFrontImage" | "idBackImage") => {
    if (type === "idFrontImage") {
      setIdFrontImage("");
      setIdFrontImageFile(undefined);
    }
    if (type === "idBackImage") {
      setIdBackImage("");
      setIdBackImageFile(undefined);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="idNumber">ID number</label>
              <input
                {...register("idNumber")}
                type="text"
                name="idNumber"
                id="idNumber"
                className="form-input"
                onInput={(e) => setIdNumber(e.currentTarget.value)}
              />
              {errors?.idNumber?.message && (
                <ErrorMessage message={errors?.idNumber?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="idType">
                ID type{" "}
                <span
                  className={classNames(
                    idNumber.length ? "text-danger" : "hidden"
                  )}
                >
                  *
                </span>
              </label>
              <select
                {...register("idType")}
                name="idType"
                id="idType"
                className="form-select"
              >
                <option value="">Select option</option>
                {idTypeOptions.map((t, index) => (
                  <option key={index} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              {errors?.idType?.message && (
                <ErrorMessage message={errors?.idType?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="idIssueDate">
                ID Issue date{" "}
                <span
                  className={classNames(
                    idNumber.length ? "text-danger" : "hidden"
                  )}
                >
                  *
                </span>
              </label>
              <div className="relative">
                <DatePicker
                  {...register("idIssueDate")}
                  id="idIssueDate"
                  className="date-picker pr-14"
                  placeholder="Select date"
                  value={idIssueDate}
                  options={{ maxDate: new Date() }}
                  onChange={([date]) => {
                    const d = formatDate(date, "YYYY-MM-DD");
                    setValue("idIssueDate", d);
                    setIdIssueDate(d);
                  }}
                />
                <div className="absolute top-0 right-0 h-full w-12 flex items-center justify-center pointer-events-none">
                  <Icon icon="bx:calendar" />
                </div>
              </div>
              {errors?.idIssueDate?.message && (
                <ErrorMessage message={errors?.idIssueDate?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="idExpiryDate">
                ID Expiry date{" "}
                <span
                  className={classNames(
                    idNumber.length ? "text-danger" : "hidden"
                  )}
                >
                  *
                </span>
              </label>
              <div className="relative">
                <DatePicker
                  {...register("idExpiryDate")}
                  id="idExpiryDate"
                  className="date-picker pr-14"
                  placeholder="Select date"
                  value={idExpiryDate}
                  options={{ minDate: idIssueDate }}
                  onChange={([date]) => {
                    const d = formatDate(date, "YYYY-MM-DD");
                    setValue("idExpiryDate", d);
                    setIdExpiryDate(d);
                  }}
                />
                <div className="absolute top-0 right-0 h-full w-12 flex items-center justify-center pointer-events-none">
                  <Icon icon="bx:calendar" />
                </div>
              </div>
              {errors?.idIssueDate?.message && (
                <ErrorMessage message={errors?.idIssueDate?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="idIssuingAuthority">
                ID Issuing authority{" "}
                <span
                  className={classNames(
                    idNumber.length ? "text-danger" : "hidden"
                  )}
                >
                  *
                </span>
              </label>
              <input
                {...register("idIssuingAuthority")}
                type="text"
                name="idIssuingAuthority"
                id="idIssuingAuthority"
                className="form-input"
              />
              {errors?.idIssuingAuthority?.message && (
                <ErrorMessage message={errors?.idIssuingAuthority?.message} />
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label htmlFor="idIssuingCountry">
                ID Issuing country{" "}
                <span
                  className={classNames(
                    idNumber.length ? "text-danger" : "hidden"
                  )}
                >
                  *
                </span>
              </label>
              <input
                {...register("idIssuingCountry")}
                type="text"
                name="idIssuingCountry"
                id="idIssuingCountry"
                className="form-input"
              />
              {errors?.idIssuingCountry?.message && (
                <ErrorMessage message={errors?.idIssuingCountry?.message} />
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label className="block mb-1">
                ID Front Image{" "}
                <span
                  className={classNames(
                    idNumber.length ? "text-danger" : "hidden"
                  )}
                >
                  *
                </span>
              </label>
              {idFrontImage.length ? (
                <div className="relative border border-gray-200 rounded h-[200px] overflow-hidden">
                  <img
                    src={idFrontImage}
                    alt=""
                    className="h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 flex items-center justify-center"
                    onClick={() => removeImage("idFrontImage")}
                  >
                    <Icon icon="bx:trash" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="idFrontImageInput"
                  className="flex flex-col items-center justify-center border border-gray-200 bg-gray-100 rounded h-[200px] cursor-pointer"
                >
                  <input
                    type="file"
                    name="idFrontImageInput"
                    id="idFrontImageInput"
                    className="hidden"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={(e) => onChangeImageFile("idFrontImage", e)}
                  />

                  <Icon icon="bx:image" className="h-10 w-10" />
                  <span className="text-xs">Click to upload</span>
                </label>
              )}
            </div>
          </div>

          <div className="col-12 lg:col-6">
            <div className="mb-4">
              <label className="block mb-1">
                ID Back Image{" "}
                <span
                  className={classNames(
                    idNumber.length ? "text-danger" : "hidden"
                  )}
                >
                  *
                </span>
              </label>
              {idBackImage.length ? (
                <div className="relative border border-gray-200 rounded h-[200px] overflow-hidden">
                  <img
                    src={idBackImage}
                    alt=""
                    className="h-full object-cover rounded"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 flex items-center justify-center"
                    onClick={() => removeImage("idBackImage")}
                  >
                    <Icon icon="bx:trash" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="idBackImageInput"
                  className="flex flex-col items-center justify-center border border-gray-200 bg-gray-100 rounded h-[200px] cursor-pointer"
                >
                  <input
                    type="file"
                    name="idBackImageInput"
                    id="idBackImageInput"
                    className="hidden"
                    accept="image/jpeg, image/png, image/jpg"
                    onChange={(e) => onChangeImageFile("idBackImage", e)}
                  />

                  <Icon icon="bx:image" className="h-10 w-10" />
                  <span className="text-xs">Click to upload</span>
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex space-x-3 justify-end">
          <Button type="button" variant="secondary">
            Previous
          </Button>
          <Button type="submit" className="px-10">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default IdentificationInformation;

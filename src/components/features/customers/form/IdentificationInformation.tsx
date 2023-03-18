import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import {
  IStoreCustomerContext,
  StoreCustomerContext,
} from "@/context/customer.context";
import {
  StoreCustomerRequest,
  StoreCustomerRequestGenderEnum,
  StoreCustomerRequestIdTypeEnum,
  StoreCustomerRequestMaritalStatusEnum,
} from "@/openapi/generated";
import { CustomerService } from "@/services/customer.service";
import { FileService } from "@/services/file.service";
import { formatDate, isEmpty } from "@/utils/helpers";
import {
  IdentificationInfoForm,
  identificationValidationSchema,
} from "@/validation/customer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import { isAxiosError } from "axios";
import classNames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-flatpickr";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface IdentificationInformationProps {
  previousStep: () => void;
}

const idTypeOptions = Object.values(StoreCustomerRequestIdTypeEnum);

const IdentificationInformation = ({
  previousStep,
}: IdentificationInformationProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [idIssueDate, setIdIssueDate] = useState<string>("");
  const [idExpiryDate, setIdExpiryDate] = useState<string>("");
  const [idNumber, setIdNumber] = useState<string>("");
  const [idFrontImage, setIdFrontImage] = useState<string>("");
  const [idFrontImageFile, setIdFrontImageFile] = useState<File>();
  const [idBackImage, setIdBackImage] = useState<string>("");
  const [idBackImageFile, setIdBackImageFile] = useState<File>();
  const storeCustomerContext = useContext(StoreCustomerContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<IdentificationInfoForm>({
    resolver: yupResolver(identificationValidationSchema),
  });

  // Methods
  const onSubmit = async (data: IdentificationInfoForm) => {
    try {
      if (storeCustomerContext) {
        const formData = getValues();

        if (!isEmpty(idNumber)) {
          // Set error for idType, idIssueDate, idExpiryDate if idNumber is not empty
          if (isEmpty(data.idType)) {
            setError("idType", {
              type: "manual",
              message: "ID type is required",
            });
          }
          if (isEmpty(idIssueDate)) {
            setError("idIssueDate", {
              type: "manual",
              message: "ID issue date is required",
            });
          }
          if (isEmpty(idExpiryDate)) {
            setError("idExpiryDate", {
              type: "manual",
              message: "ID expiry date is required",
            });
          }
          if (isEmpty(formData?.idIssuingAuthority)) {
            setError("idIssuingAuthority", {
              type: "manual",
              message: "ID issuing authority is required",
            });
          }
          if (isEmpty(formData?.idIssuingCountry)) {
            setError("idIssuingCountry", {
              type: "manual",
              message: "ID issuing country is required",
            });
          }
          if (isEmpty(idFrontImage)) {
            setError("idFrontUrl", {
              type: "manual",
              message: "ID front image is required",
            });
          }
          if (isEmpty(idBackImage)) {
            setError("idBackUrl", {
              type: "manual",
              message: "ID back image is required",
            });
          }
        }

        setIsSubmitting(true);

        storeCustomerContext.updateErrors([]);

        // Uploaded files
        if (idFrontImageFile) {
          const {
            data: { data: response },
          } = await FileService.instance().fileUpload(
            idFrontImageFile,
            "IDENTIFICATION_FRONT"
          );
          data.idFrontUrl = response.url;
          data.idFrontKey = response.key;
        }
        if (idBackImageFile) {
          const {
            data: { data: response },
          } = await FileService.instance().fileUpload(
            idBackImageFile,
            "IDENTIFICATION_BACK"
          );
          data.idBackUrl = response.url;
          data.idBackKey = response.key;
        }

        storeCustomerContext.updateIdentificationInfo({
          ...storeCustomerContext?.customer,
          ...data,
        });

        // Submit form
        if (storeCustomerContext?.customer) {
          let responseMessage = "";

          if (storeCustomerContext?.customer?.id) {
            const {
              data: { message },
            } = await CustomerService.instance().updateCustomer(
              storeCustomerContext?.customer?.id,
              requestData(storeCustomerContext?.customer, data)
            );

            responseMessage = message;
          } else {
            const {
              data: { message },
            } = await CustomerService.instance().createCustomer(
              requestData(storeCustomerContext?.customer, data)
            );

            responseMessage = message;
          }

          toast.success(responseMessage);
          navigate("/customers");
        }
      }
    } catch (error) {
      console.log(error);

      setIsSubmitting(false);

      const errors: Array<string> = [];

      if (isAxiosError(error) && error?.response) {
        const { status, data } = error.response;

        if (status === 422) {
          for (const [_, value] of Object.entries(data?.errors)) {
            const val = (value as Array<string>)[0];

            errors.push(val);
          }
        } else {
          errors.push(data?.message);
        }
      } else {
        errors.push((error as Error).message);
      }

      storeCustomerContext?.updateErrors(errors);
    }
  };
  const requestData = (
    customer: IStoreCustomerContext["customer"],
    formData: IdentificationInfoForm
  ) => {
    const data: StoreCustomerRequest = {
      dateOfBirth: customer?.dateOfBirth,
      email: customer?.email,
      firstName: customer?.firstName as string,
      gender: customer?.gender as StoreCustomerRequestGenderEnum,
      gpAddress: customer?.gpAddress,
      idBackKey: formData?.idBackKey as string | undefined,
      idBackUrl: formData?.idBackUrl,
      idExpiryDate: formData?.idExpiryDate,
      idFrontKey: formData?.idFrontKey as string | undefined,
      idFrontUrl: formData?.idFrontUrl,
      idIssueDate: formData?.idIssueDate,
      idIssuingAuthority: formData?.idIssuingAuthority,
      idIssuingCountry: formData?.idIssuingCountry,
      idNumber: formData?.idNumber,
      idType: formData?.idType as StoreCustomerRequestIdTypeEnum,
      lastName: customer?.lastName as string,
      maritalStatus:
        customer?.maritalStatus as StoreCustomerRequestMaritalStatusEnum,
      occupation: customer?.occupation,
      phoneNumber: customer?.phoneNumber as string,
      postalAddress: customer?.postalAddress,
      secondaryPhone: customer?.secondaryPhone,
      sourceOfIncome: customer?.sourceOfIncome,
    };

    return data;
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

  // Effects
  useEffect(() => {
    if (storeCustomerContext?.customer) {
      const customer = storeCustomerContext?.customer;
      setValue("idNumber", customer?.idNumber ?? "");
      setValue("idType", customer?.idType ?? "");
      setValue("idIssueDate", customer?.idIssueDate ?? "");
      setValue("idExpiryDate", customer?.idExpiryDate ?? "");
      setValue("idIssuingAuthority", customer?.idIssuingAuthority ?? "");
      setValue("idIssuingCountry", customer?.idIssuingCountry ?? "");
      setValue("idFrontUrl", customer?.idFrontUrl ?? "");
      setValue("idBackUrl", customer?.idBackUrl ?? "");
      setValue("idFrontKey", customer?.idFrontKey);
      setValue("idBackKey", customer?.idBackKey);
      setIdFrontImage(customer?.idFrontUrl ?? "");
      setIdBackImage(customer?.idBackUrl ?? "");
      setIdNumber(customer?.idNumber ?? "");
      setIdIssueDate(customer?.idIssueDate ?? "");
      setIdExpiryDate(customer?.idExpiryDate ?? "");
      setIdFrontImage(customer?.idFrontUrl ?? "");
      setIdBackImage(customer?.idBackUrl ?? "");
    }
  }, [storeCustomerContext?.customer]);

  // Template
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
                onInput={(e) => {
                  setIdNumber(e.currentTarget.value);
                  if (e.currentTarget.value.length === 0) clearErrors();
                }}
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
              <div className=" mb-1">
                <label className="block">
                  ID Front Image{" "}
                  <span
                    className={classNames(
                      idNumber.length ? "text-danger" : "hidden"
                    )}
                  >
                    *
                  </span>
                </label>
                {errors?.idFrontUrl?.message && (
                  <ErrorMessage message={errors?.idFrontUrl?.message} />
                )}
              </div>
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
              <div className="mb-1">
                <label className="block">
                  ID Back Image{" "}
                  <span
                    className={classNames(
                      idNumber.length ? "text-danger" : "hidden"
                    )}
                  >
                    *
                  </span>
                </label>
                {errors?.idFrontUrl?.message && (
                  <ErrorMessage message={errors?.idFrontUrl?.message} />
                )}
              </div>

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
          <Button
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={() => previousStep()}
          >
            Previous
          </Button>

          <Button type="submit" className="px-10" disabled={isSubmitting}>
            {isSubmitting
              ? storeCustomerContext?.customer?.id
                ? "Updating..."
                : "Submitting..."
              : storeCustomerContext?.customer?.id
              ? "Update"
              : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default IdentificationInformation;

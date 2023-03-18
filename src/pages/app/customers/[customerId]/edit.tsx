import Alert from "@/components/common/Alert";
import IdentificationInformation from "@/components/features/customers/form/IdentificationInformation";
import PersonalInformation from "@/components/features/customers/form/PersonalInformation";
import Breadcrumb from "@/components/includes/Breadcrumb";
import {
  IStoreCustomerContext,
  StoreCustomerContext,
} from "@/context/customer.context";
import {
  GetCustomer200Response,
  StoreCustomerRequestGenderEnum,
  StoreCustomerRequestIdTypeEnum,
  StoreCustomerRequestMaritalStatusEnum,
} from "@/openapi/generated";
import { BreadcrumbItem } from "@/types";
import {
  IdentificationInfoForm,
  PersonalInfoForm,
} from "@/validation/customer";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

type Steps = "personal information" | "identification information";

const steps: Array<Steps> = [
  "personal information",
  "identification information",
];

const EditCustomer = () => {
  const customerData = (useLoaderData() as GetCustomer200Response).data;
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [stepPercentage, setStepPercentage] = useState<number>(0);
  const [errors, setErrors] = useState<Array<string>>([]);
  const [customer, setCustomer] = useState<
    IStoreCustomerContext["customer"] | null
  >(null);
  const breadcrumbItems: Array<BreadcrumbItem> = [
    { to: "/customers", label: "Customers" },
    { label: `Edit Customer: ${customerData.id}` },
  ];

  // Methods
  const updateStep = () => {
    setErrors([]);

    if (stepNumber < steps.length - 1) {
      setStepNumber(stepNumber + 1);
      setStepPercentage(100);
    }
  };
  const previousStep = () => {
    setErrors([]);

    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
      setStepPercentage(0);
    }
  };
  const updatePersonalInfo = (data: PersonalInfoForm) => {
    setCustomer({ ...customer, ...data });
  };
  const updateIdentificationInfo = (data: IdentificationInfoForm) => {
    if (customer && customer?.firstName) {
      setCustomer({
        ...customer,
        idNumber: data.idNumber,
        idType: data.idType as StoreCustomerRequestIdTypeEnum,
        idExpiryDate: data.idExpiryDate,
        idIssueDate: data.idIssueDate,
        idIssuingAuthority: data.idIssuingAuthority,
        idIssuingCountry: data.idIssuingCountry,
        idBackKey: data.idBackKey,
        idBackUrl: data.idBackUrl,
        idFrontKey: data.idFrontKey,
        idFrontUrl: data.idFrontUrl,
      });
    }
  };

  // Effects
  useEffect(() => {
    if (customerData) {
      setCustomer({
        id: customerData.id,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        phoneNumber: customerData.phoneNumber,
        gender: customerData.gender as StoreCustomerRequestGenderEnum,
        dateOfBirth: customerData.dateOfBirth,
        secondaryPhone: customerData.secondaryPhone ?? "",
        email: customerData.email ?? "",
        occupation: customerData.occupation ?? "",
        gpAddress: customerData.gpAddress ?? "",
        postalAddress: customerData.postalAddress ?? "",
        maritalStatus:
          customerData.maritalStatus as StoreCustomerRequestMaritalStatusEnum,
        sourceOfIncome: customerData.sourceOfIncome ?? "",
        idNumber: customerData.identification?.id ?? "",
        idType:
          (customerData.identification
            ?.type as StoreCustomerRequestIdTypeEnum) ?? undefined,
        idIssueDate: customerData.identification?.issueDate ?? "",
        idExpiryDate: customerData.identification?.expiryDate ?? "",
        idIssuingAuthority: customerData.identification?.issuingAuthority ?? "",
        idIssuingCountry: customerData.identification?.issuingCountry ?? "",
        idFrontUrl: customerData.identification?.front
          ? customerData.identification?.front.url
          : "",
        idFrontKey: customerData.identification?.front
          ? customerData.identification?.front.key
          : undefined,
        idBackUrl: customerData.identification?.back
          ? customerData.identification?.back.url
          : "",
        idBackKey: customerData.identification?.back
          ? customerData.identification?.back.key
          : undefined,
      });
    }
  }, []);

  // Markup
  return (
    <>
      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      <div className="container flex flex-col pb-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className=" mb-10">
            <div className="flex flex-col space-y-1">
              <span className="text-xs text-gray-500">
                Step {stepNumber + 1} of {steps.length}
              </span>
              <h4 className="text-lg mb-0 capitalize">{steps[stepNumber]}</h4>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-success h-1.5 rounded-full"
                  style={{ width: `${stepPercentage}%` }}
                ></div>
              </div>
            </div>

            {errors && errors.length > 0 && (
              <Alert className="flex flex-col mt-2">
                {errors.map((error, index) => (
                  <span key={index}>{error}</span>
                ))}
              </Alert>
            )}
          </div>

          <StoreCustomerContext.Provider
            value={{
              customer,
              errors,
              updateIdentificationInfo: updateIdentificationInfo,
              updatePersonalInfo: updatePersonalInfo,
              updateErrors: setErrors,
            }}
          >
            {stepNumber === 0 && (
              <PersonalInformation updateStep={updateStep} />
            )}
            {stepNumber === 1 && (
              <IdentificationInformation previousStep={previousStep} />
            )}
          </StoreCustomerContext.Provider>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;

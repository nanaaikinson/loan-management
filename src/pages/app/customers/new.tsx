import IdentificationInformation from "@/components/features/customers/form/IdentificationInformation";
import PersonalInformation from "@/components/features/customers/form/PersonalInformation";
import {
  IStoreCustomerContext,
  StoreCustomerContext,
} from "@/context/customer.context";
import {
  IdentificationInfoForm,
  PersonalInfoForm,
} from "@/validation/customer";
import { useState } from "react";

type Steps = "personal information" | "identification information";

const steps: Array<Steps> = [
  "personal information",
  "identification information",
];

const StoreCustomer = () => {
  const [stepNumber, setStepNumber] = useState<number>(1);
  const [stepPercentage, setStepPercentage] = useState<number>(0);
  const [customer, setCustomer] = useState<
    IStoreCustomerContext["customer"] | null
  >(null);
  const updateStep = () => {
    if (stepNumber < steps.length - 1) {
      setStepNumber(stepNumber + 1);
      setStepPercentage((stepNumber + 1) * (100 / steps.length));
    }
  };
  const updateIdentificationInfo = (data: IdentificationInfoForm) => {
    console.log(data);
  };
  const updatePersonalInfo = (data: PersonalInfoForm) => {
    console.log(data);
  };

  return (
    <>
      <div className="container flex flex-col pb-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex flex-col space-y-1 mb-10">
            <h3 className="mb-8">Customer</h3>
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

          <StoreCustomerContext.Provider
            value={{
              customer,
              updateIdentificationInfo: updateIdentificationInfo,
              updatePersonalInfo: setCustomer,
            }}
          >
            {stepNumber === 0 && (
              <PersonalInformation updateStep={updateStep} />
            )}
            {stepNumber === 1 && (
              <IdentificationInformation updateStep={updateStep} />
            )}
          </StoreCustomerContext.Provider>
        </div>
      </div>
    </>
  );
};

export default StoreCustomer;

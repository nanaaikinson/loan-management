import PersonalInformation from "@/components/features/customers/form/PersonalInformation";
import { useState } from "react";

type Steps = "personal information" | "identification information";

const StoreCustomer = () => {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [steps, setSteps] = useState<Array<Steps>>([
    "personal information",
    "identification information",
  ]);
  const [stepPercentage, setStepPercentage] = useState<number>(0);

  return (
    <>
      <div className="container flex flex-col pb-10">
        <div className="mx-auto w-full max-w-2xl">
          <div className="flex flex-col space-y-1 mb-10">
            <h2 className="mb-8">Customer</h2>
            <span className="text-xs text-gray-500">
              Step {stepNumber + 1} of {steps.length}
            </span>
            <h4 className="text-lg font-semibold mb-0 capitalize">
              {steps[stepNumber]}
            </h4>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-success h-1.5 rounded-full"
                style={{ width: `${stepPercentage}%` }}
              ></div>
            </div>
          </div>

          <PersonalInformation />
        </div>
      </div>
    </>
  );
};

export default StoreCustomer;

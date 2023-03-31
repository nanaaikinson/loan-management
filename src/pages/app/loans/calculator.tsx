import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import InputSlider from "@/components/form/InputSlider";
import {
  calculateLoan,
  formatMoney,
  getDurationInMonthsReadable,
} from "@/utils/helpers";
import { useState } from "react";
import { useTitle } from "react-use";

const LoanCalculator = () => {
  useTitle("Loan Calculator | Microlend");

  // State
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [loanTerm, setLoanTerm] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  // Methods
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleRangeChange();
  };

  const handleRangeChange = () => {
    // Calculate loan
    const { monthlyRepayment, totalInterest, totalRepayment } = calculateLoan(
      loanAmount,
      interestRate,
      loanTerm
    );

    // Set state
    setMonthlyPayment(monthlyRepayment);
    setTotalPayment(totalRepayment);
    setTotalInterest(totalInterest);
  };

  return (
    <>
      <div className="container-fluid flex flex-col">
        <div className="mx-auto w-full max-w-4xl">
          <h4 className="mb-8">Loan calculator</h4>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-5 gap-x-8 items-center py-4">
            <div className="col-span-2">
              <form onSubmit={onSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="loanAmount"
                    className="flex mb-2 justify-between items-center"
                  >
                    <span>Loan Amount</span>
                    <span className="font-semibold">
                      GHS {formatMoney(loanAmount)}
                    </span>
                  </label>

                  <InputSlider
                    id="loanAmount"
                    value={loanAmount}
                    min={0}
                    max={10000}
                    onSliderChange={(value) => {
                      setLoanAmount(Number(value));
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="interestRate"
                    className="flex mb-2 justify-between items-center"
                  >
                    <span>Interest Rate</span>
                    <span className="font-semibold">{interestRate}%</span>
                  </label>

                  <InputSlider
                    id="interestRate"
                    value={interestRate}
                    min={0}
                    max={100}
                    step={0.1}
                    onSliderChange={(value) => {
                      setInterestRate(Number(value));
                    }}
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="loanTerm"
                    className="flex mb-2 justify-between items-center"
                  >
                    <span>Duration</span>
                    <span className="font-semibold">
                      {loanTerm} months ({getDurationInMonthsReadable(loanTerm)}
                      )
                    </span>
                  </label>

                  <InputSlider
                    id="loanTerm"
                    value={loanTerm}
                    min={0}
                    max={60}
                    onSliderChange={(value) => {
                      setLoanTerm(Number(value));
                    }}
                  />
                </div>

                <div className="pt-8">
                  <Button type="submit" className="px-10">
                    Calculate
                  </Button>
                </div>
              </form>
            </div>

            <div className="flex flex-col gap-y-4">
              <Card className="p-4">
                <p className="text-gray-500">Monthly Repayment</p>

                <h5 className="mb-0">GHS {formatMoney(monthlyPayment)}</h5>
              </Card>

              <Card className="p-4">
                <p className="text-gray-500">Total Interest</p>

                <h5 className="mb-0">GHS {formatMoney(totalInterest)}</h5>
              </Card>

              <Card className="p-4">
                <p className="text-gray-500">Total Payment</p>

                <h5 className="mb-0">GHS {formatMoney(totalPayment)}</h5>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanCalculator;

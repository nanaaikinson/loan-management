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

  return (
    <>
      <div className="container-fluid flex flex-col">
        <div className="mx-auto w-full max-w-4xl">
          <div className="row">
            <div className="col-12 lg:col-8"></div>

            <div className="col-12 lg:col-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanCalculator;

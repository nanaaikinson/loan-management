import classNames from "classnames";
import { useEffect, useState } from "react";

interface AmountInputProps {
  currency?: string;
  className?: string;
  value?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

const AmountInput = ({
  currency,
  value,
  disabled,
  onChange,
}: AmountInputProps) => {
  // State
  const [amount, setAmount] = useState<number>(0);

  // Methods
  const onInputAmount = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.value = input.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    const value = !isNaN(parseFloat(input.value)) ? parseFloat(input.value) : 0;
    setAmount(value);
    onChange(value);
  };

  // Effects
  useEffect(() => {
    if (value) {
      setAmount(value);
    }
  }, [value]);

  return (
    <>
      <div className="relative">
        {currency && (
          <>
            <div className="absolute w-12 h-full top-0 left-0 flex items-center justify-center">
              {currency}
            </div>
          </>
        )}
        <input
          type="text"
          name="amount"
          id="amount"
          className={classNames("form-input", currency && "pl-14")}
          value={amount}
          onInput={onInputAmount}
          disabled={disabled}
        />
      </div>
    </>
  );
};

export default AmountInput;

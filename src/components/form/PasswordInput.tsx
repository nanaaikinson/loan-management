import { Icon } from "@iconify/react";
import { InputHTMLAttributes, useState } from "react";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = ({
  className,
  id,
  name,
  value,
  onChange,
  onBlur,
}: PasswordInputProps) => {
  // State
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        id={id}
        value={value}
        className="form-input pr-12"
        onChange={onChange}
        onBlur={onBlur}
      />
      <button
        type="button"
        className="absolute top-0 right-0 h-full w-12 flex items-center justify-center"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <Icon icon="bx:hide" /> : <Icon icon="bx:show" />}
      </button>
    </div>
  );
};

export default PasswordInput;

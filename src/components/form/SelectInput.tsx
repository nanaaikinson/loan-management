import { SelectOptions } from "@/types/components";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  error?: string;
  label?: string;
  options?: SelectOptions[];
}

const SelectInput = forwardRef<HTMLSelectElement, InputProps>(function Input(
  {
    error,
    label,
    onChange,
    name,
    required,
    disabled,
    value = "",
    options,
  }: InputProps,
  ref
) {
  return (
    <div>
      {label && (
        <label htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <select
        ref={ref}
        disabled={disabled}
        onChange={onChange}
        className="form-select"
        value={value}
        id={name}
        name={name}
      >
        <option value="">Please select an option</option>
        {options?.map((item) => (
          <option key={item.value} value={item?.value}>
            {item?.label}
          </option>
        ))}
      </select>

      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
});

export default SelectInput;
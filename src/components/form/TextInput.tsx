import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
  label: string;
}

const TextInput = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    error,
    value = "",
    label,
    disabled = false,
    type = "text",
    placeholder,
    name,
    onChange,
    required = false,
  }: InputProps,
  ref
) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block" htmlFor={name}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <input
        ref={ref}
        disabled={disabled}
        onChange={onChange}
        className="form-input"
        value={value}
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
});

export default TextInput;

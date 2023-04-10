import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  rows?: string;
  error?: string;
  name: string;
  label?: string;
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, InputProps>(
  function Input(
    {
      error,
      label,
      placeholder,
      onChange,
      name,
      required,
      value = "",
    }: InputProps,
    ref
  ) {
    return (
      <>
        {label && (
          <label className="block" htmlFor={name}>
            {label} {required && <span className="text-danger">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          rows={5}
          onChange={onChange}
          className="form-input"
          placeholder={placeholder}
          id={name}
          value={value}
          name={name}
        />

        {error && <span className="text-sm text-danger">{error}</span>}
      </>
    );
  }
);

export default TextAreaInput;

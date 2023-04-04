import { InputProps } from "@/types/components";
import { Icon } from "@iconify/react";
import { forwardRef } from "react";
// import SkeletonLoader from "./SkeletonLoader";

const Input = forwardRef(function Input(
  {
    error,
    value,
    label,
    disabled = false,
    type = "text",
    placeholder,
    name,
    onChange,
    variant = "input",
    options,
    fileUrl,
    accept = "image/jpg, image/png, image/jpeg",
    uploading = false,
    required=false
  }: InputProps,
  ref
) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block" htmlFor={name}>
          {label}  {required && <span className="text-danger">*</span> }
        </label>
      )}
      {variant === "input" && (
        <input
          disabled={disabled}
          onChange={onChange}
          className="form-input"
          value={value}
          type={type}
          placeholder={placeholder}
          id={name}
        />
      )}{" "}
      {variant === "date" && (
        <input
          disabled={disabled}
          onChange={onChange}
          className="form-input"
          value={value}
          type={variant}
          placeholder={placeholder}
          id={name}
        />
      )}
      {variant === "textarea" && (
        <textarea
          rows={5}
          disabled={disabled}
          onChange={onChange}
          className="form-input"
          value={value}
          placeholder={placeholder}
          id={name}
        />
      )}
      {variant === "select" && (
        <select
          className="form-select"
          id={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
        >
          <option value={""}>Select an option</option>
          {options?.map((item, idx) => (
            <option
              value={item.value}
              key={`${item.value}-${idx}`}
              className="capitalize"
            >
              {item.label}
            </option>
          ))}
        </select>
      )}
      {variant === "file" &&
        (!fileUrl ? (
          <label
            className="form-input flex h-[150px] cursor-pointer items-center justify-center rounded-md border-dashed"
            htmlFor={name}
          >
            {uploading ? (
              <p>Loading...</p>
            ) : (
              <>
                <input
                  id={name}
                  value={value}
                  onChange={onChange}
                  accept={accept}
                  className="hidden"
                  name={name}
                  type="file"
                />
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <Icon
                    icon={"material-symbols:camera-enhance"}
                    className="icon  text-center text-xl"
                  />
                  <p className="text-affinity-gray-3 text-center text-sm">
                    Upload image
                  </p>
                </div>
              </>
            )}
          </label>
        ) : (
          <div className="flex space-x-2">
            <img
              src={
                typeof fileUrl === "string"
                  ? fileUrl
                  : URL.createObjectURL(fileUrl)
              }
              alt="Front of ID"
              className="h-[120px] border-dashed object-cover"
            />

            <i className="bx bxs-trash cursor-pointer"></i>
          </div>
        ))}
      {error && <span className="text-sm text-danger">{error}</span>}
    </div>
  );
});

export default Input;

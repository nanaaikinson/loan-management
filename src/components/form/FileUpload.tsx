import { Icon } from "@iconify/react";
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

interface FileUploadProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fileUrl?: string | Blob;
  uploading?: boolean;
}

const FileInput = forwardRef(function Input({
  name,
  onChange,
  value,
  fileUrl,
  accept,
  uploading,
}: FileUploadProps) {
  return !fileUrl ? (
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
          typeof fileUrl === "string" ? fileUrl : URL.createObjectURL(fileUrl)
        }
        alt="Front of ID"
        className="h-[120px] border-dashed object-cover"
      />

      <i className="bx bxs-trash cursor-pointer"></i>
    </div>
  );
});

export default FileInput;

import classNames from "classnames";
import { type HTMLAttributes } from "react";

interface ErrorMessageProps extends HTMLAttributes<HTMLElement> {
  message?: string;
}

const ErrorMessage = ({ className, message }: ErrorMessageProps) => {
  return (
    <>
      {message && (
        <span className={classNames(`text-sm text-danger`, className)}>
          {message}
        </span>
      )}
    </>
  );
};

export default ErrorMessage;

import classNames from "classnames";
import { HTMLAttributes } from "react";

interface AlertProps extends HTMLAttributes<HTMLElement> {
  variant?: "success" | "error" | "warning" | "info";
}

const Alert = ({ children, className }: AlertProps) => {
  if (children) {
    return (
      <>
        <div className={classNames("", className)}>{children}</div>
      </>
    );
  }

  return <></>;
};

export default Alert;

import classNames from "classnames";
import { type HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "success"
    | "warning"
    | "info"
    | "outline-primary"
    | "outline-secondary"
    | "outline-danger"
    | "outline-success"
    | "outline-warning"
    | "outline-info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  block = false,
  type = "button",
  className,
  onClick,
}: ButtonProps) => {
  const variantClasses = () => {
    let classes = "";

    switch (variant) {
      case "primary":
        classes = "btn-primary";
        break;
      case "secondary":
        classes = "btn-secondary";
        break;
      case "danger":
        classes = "btn-danger";
        break;
      case "success":
        classes = "btn-success";
        break;
      case "warning":
        classes = "";
        break;
      case "info":
        classes = "btn-info";
        break;
      case "outline-primary":
        classes = "btn-outline-primary";
        break;
      case "outline-secondary":
        classes = "btn-outline-secondary";
        break;
      case "outline-danger":
        classes = "btn-outline-danger";
        break;
      case "outline-success":
        classes = "btn-outline-success";
        break;
      case "outline-warning":
        classes = "btn-outline-warning";
        break;
      case "outline-info":
        classes = "btn-outline-info";
        break;
      default:
        break;
    }

    return classes;
  };

  const sizeClasses = () => {
    let classes = "";

    switch (size) {
      case "xs":
        classes = "btn-xs";
        break;
      case "sm":
        classes = "btn-sm";
        break;
      case "md":
        classes = "btn-md";
        break;
      case "lg":
        classes = "btn-lg";
        break;
      case "xl":
        classes = "btn-xl";
        break;
      default:
        break;
    }

    return classes;
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={loading || disabled}
      className={classNames(
        `btn`,
        block && `w-full`,
        variantClasses(),
        sizeClasses(),
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

import classNames from "classnames";
import { type HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
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

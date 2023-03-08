import classNames from "classnames";

interface BadgeProps {
  children?: React.ReactNode;
  text?: string;
  className?: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "dark";
}

const Badge = ({ children, text, className, variant }: BadgeProps) => {
  const variantClass = () => {
    switch (variant) {
      case "primary":
        return "bg-primary bg-opacity-20 text-primary";
      case "secondary":
        return "bg-secondary bg-opacity-20 text-secondary";
      case "success":
        return "bg-success bg-opacity-20 text-success";
      case "danger":
        return "bg-danger bg-opacity-20 text-danger";
      case "warning":
        return "bg-warning bg-opacity-20 text-warning";
      case "info":
        return "bg-info bg-opacity-20 text-info";
      case "dark":
        return "bg-dark bg-opacity-20 text-dark";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <>
      <span
        className={classNames(
          "px-2.5 py-0.5 rounded text-xs font-medium",
          variantClass(),
          className
        )}
      >
        {children || text}
      </span>
    </>
  );
};

export default Badge;

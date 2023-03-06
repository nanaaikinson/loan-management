import classNames from "classnames";
import { useEffect } from "react";

interface DrawerProps {
  visible: boolean;
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
  position?: "left" | "right" | "top" | "bottom";
}

const Drawer = ({
  visible,
  children,
  className,
  overlayClassName,
  position = "right",
}: DrawerProps) => {
  useEffect(() => {
    if (visible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [visible]);

  const computedPosition = () => {
    switch (position) {
      case "left":
        return "left-0";
      case "right":
        return "right-0";
      case "top":
        return "top-0";
      case "bottom":
        return "bottom-0";
      default:
        return "right-0";
    }
  };

  const computedContentVisibility = () => {
    switch (position) {
      case "left":
        return visible ? "translate-x-0" : "-translate-x-full";
      case "right":
        return visible ? "translate-x-0" : "translate-x-full";
      case "top":
        return visible ? "translate-y-0" : "-translate-y-full";
      case "bottom":
        return visible ? "translate-y-0" : "translate-y-full";
      default:
        return visible ? "translate-x-0" : "translate-x-full";
    }
  };

  const computedOverlayClass = () => {
    return visible ? "opacity-100 block" : "opacity-0 hidden";
  };

  return (
    <>
      <div>
        <div
          className={classNames(
            "fixed top-0 z-[100] h-screen w-full transform overflow-y-auto bg-white transition-all duration-300 ease-in-out sm:w-3/5 lg:w-96",
            computedContentVisibility(),
            computedPosition(),
            className
          )}
        >
          {children}
        </div>

        <div
          className={classNames(
            "fixed inset-0 bg-black bg-opacity-50 z-[90] h-screen",
            computedOverlayClass(),
            overlayClassName
          )}
        ></div>
      </div>
    </>
  );
};

export default Drawer;

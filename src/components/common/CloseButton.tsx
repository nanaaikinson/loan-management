import { Icon } from "@iconify/react";
import classNames from "classnames";
import { HTMLAttributes } from "react";

type CloseButtonProps = HTMLAttributes<HTMLButtonElement>;

const CloseButton = ({ onClick, className }: CloseButtonProps) => {
  return (
    <>
      <button
        className={classNames(
          "flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100",
          className
        )}
        onClick={onClick}
      >
        <Icon icon="bx:bx-x" className="text-xl" />
      </button>
    </>
  );
};

export default CloseButton;

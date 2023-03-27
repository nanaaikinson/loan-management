import classNames from "classnames";
import { type HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = ({ className, children }: CardProps) => {
  return (
    <>
      <div
        className={classNames(
          `w-full rounded-[7px] bg-white border border-gray-100`,
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Card;

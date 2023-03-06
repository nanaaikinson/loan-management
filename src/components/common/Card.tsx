import classNames from "classnames";
import { type HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

const Card = ({ className, children }: CardProps) => {
  return (
    <>
      <div
        className={classNames(
          `w-full rounded-sm bg-white drop-shadow-sm`,
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Card;

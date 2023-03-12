import classNames from "classnames";

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
  initials?: boolean;
}

const Avatar = ({ src, alt, className, initials = false }: AvatarProps) => {
  if (initials) {
    return (
      <div
        className={classNames(
          "relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-primary bg-opacity-10 rounded-full",
          className
        )}
      >
        <span className="font-medium text-primary ">{src}</span>
      </div>
    );
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={classNames("w-10 h-10 rounded-full object-cover", className)}
      />
    </>
  );
};

export default Avatar;

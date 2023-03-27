import classNames from "classnames";
import { Link, To } from "react-router-dom";

interface LogoProps {
  to?: To;
  className?: string;
}

const LogoContent = () => {
  return (
    <>
      <img
        src="https://admin.hugeicons.pro/uploads/huge_icons/6408153a9a23c1678251322.svg"
        alt=""
        className="h-8"
      />
      <h3 className="mb-0">MicroLend</h3>
    </>
  );
};

const Logo = ({ to, className }: LogoProps) => {
  if (to) {
    return (
      <Link
        to={to}
        className={classNames("flex items-center space-x-2 h-16", className)}
      >
        <LogoContent />
      </Link>
    );
  }

  return (
    <>
      <a className={classNames("flex items-center space-x-2 h-16", className)}>
        <LogoContent />
      </a>
    </>
  );
};

export default Logo;

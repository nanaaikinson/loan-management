import { BreadcrumbItem } from "@/types";
import classNames from "classnames";
import { HTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: Array<BreadcrumbItem>;
  content?: React.ReactNode;
}

const Breadcrumb = ({ items, className, content }: BreadcrumbProps) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between border-b border-gray-100 pb-3 px-5",
        className
      )}
    >
      <nav className="flex" aria-label="Breadcrumb">
        <ul className="breadcrumb">
          {items.map((item, index) => (
            <li key={index} className="breadcrumb-item">
              {item.to ? (
                <>
                  <Link
                    to={item.to}
                    className=" transition duration-150 ease-in-out !text-info hover:!text-info-dark "
                  >
                    {item.label}
                  </Link>
                </>
              ) : (
                <>
                  <a aria-current="page" className="">
                    {item.label}
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {content}
    </div>
  );
};

export default Breadcrumb;

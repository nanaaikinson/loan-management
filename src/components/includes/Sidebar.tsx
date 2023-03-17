import { Icon } from "@iconify/react";
import classNames from "classnames";
import { HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";

type SidebarProps = HTMLAttributes<HTMLElement>;

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <>
      <nav
        className={classNames(
          "fixed top-0 left-0 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-white border-r border-gray-100 md:translate-x-0 -translate-x-full",
          className
        )}
      >
        <a className="flex items-center px-4 py-5 mb-10">
          <img
            src="https://kutty.netlify.app/brand/kutty-logo.png"
            alt="Kutty Logo"
            className="w-20"
          />
        </a>

        <nav className="px-4 flex flex-col gap-y-4">
          <NavLink className="sidebar-item" to="/customers">
            <Icon icon="clarity:group-solid-badged" className="icon" />
            <span>Customers</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/loans">
            <Icon icon="clarity:contract-solid" className="icon" />
            <span>Loans</span>
          </NavLink>
        </nav>
      </nav>
    </>
  );
};

export default Sidebar;

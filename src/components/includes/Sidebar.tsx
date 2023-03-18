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
          "fixed top-0 left-0 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-white border-r border-gray-100 lg:translate-x-0 -translate-x-full",
          className
        )}
      >
        <a className="flex items-center px-4 py-5 mb-10">
          <h3>MicroLend</h3>
        </a>

        <nav className="px-4 flex flex-col gap-y-2">
          <NavLink className="sidebar-item" to="/dashboard">
            <Icon icon="ri:home-fill" className="icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/customers">
            <Icon icon="clarity:group-solid-badged" className="icon" />
            <span>Customers</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/loans">
            <Icon icon="clarity:contract-solid" className="icon" />
            <span>Loans</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/transactions">
            <Icon icon="uil:transaction" className="icon" />
            <span>Transactions</span>
          </NavLink>
        </nav>
      </nav>
    </>
  );
};

export default Sidebar;

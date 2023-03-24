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
          "fixed top-0 left-0 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-white border-r border-gray-100 -translate-x-full",
          className
        )}
      >
        <a className="flex items-center px-6 h-16 mb-10 border-b border-gray-50">
          <h3>MicroLend</h3>
        </a>

        <nav className="px-4 flex flex-col gap-y-1">
          <NavLink className="sidebar-item" to="/dashboard">
            <Icon icon="uil:tachometer-fast-alt" className="icon" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/customers">
            <Icon icon="uil:user" className="icon" />
            <span>Customers</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/loans">
            <Icon icon="uil:file-download-alt" className="icon" />
            <span>Loans</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/transactions">
            <Icon icon="uil:transaction" className="icon" />
            <span>Transactions</span>
          </NavLink>

          <NavLink className="sidebar-item" to="/reports">
            <Icon icon="uil:chart-bar" className="icon" />
            <span>Reports</span>
          </NavLink>
        </nav>
      </nav>
    </>
  );
};

export default Sidebar;

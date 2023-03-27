import Header from "@/components/includes/Header";
import Sidebar from "@/components/includes/Sidebar";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  // State
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const location = useLocation();

  // Methods
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Effects
  useEffect(() => {
    document.body.classList.add("pt-20");
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Template
  return (
    <>
      <section className="min-h-screen">
        <Sidebar
          className={classNames(
            "z-[20] w-60 xl:translate-x-0",
            isSidebarOpen && "translate-x-0"
          )}
        />
        <Header className="z-[5] px-5" toggleSidebar={toggleSidebar} />

        <main className="ml-0 transition xl:ml-60 z-[2]">
          <Outlet />
        </main>

        <div
          className="fixed inset-0 z-[10] transition duration-200 w-screen h-screen bg-black bg-opacity-25 xl:hidden"
          style={{ display: isSidebarOpen ? "block" : "none" }}
          onClick={toggleSidebar}
        ></div>
      </section>
    </>
  );
};

export default AppLayout;

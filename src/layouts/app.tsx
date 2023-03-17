import Header from "@/components/includes/Header";
import Sidebar from "@/components/includes/Sidebar";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  useEffect(() => {
    document.body.classList.add("pt-20");
  }, []);

  return (
    <>
      <section className="min-h-screen">
        <Sidebar className="z-[80] w-60" />
        <Header className="z-[70] px-5 lg:pl-60" />

        <main className="ml-0 transition md:ml-60">
          <Outlet />
        </main>
      </section>
    </>
  );
};

export default AppLayout;

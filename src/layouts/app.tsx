import Header from "@/components/includes/Header";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  useEffect(() => {
    document.body.classList.add("pt-20");
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;

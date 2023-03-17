import nprogress from "nprogress";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    nprogress.start();
    nprogress.done();
  }, [location.pathname]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Root;

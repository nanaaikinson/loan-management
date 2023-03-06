import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <section className="flex h-screen w-full">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;

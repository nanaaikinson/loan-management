import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <section className="flex h-screen w-full lg:h-[80vh]">
        <Outlet />
      </section>
    </>
  );
};

export default AuthLayout;

import { Outlet } from "react-router-dom";

const Settings = () => {
  return (
    <>
      <div className="container-fluid flex flex-col">
        <Outlet />
      </div>
    </>
  );
};

export default Settings;

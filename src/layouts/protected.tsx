import { SecureStorage } from "@/utils/storage";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const mlAtName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
const mlAtExpiresAtName = import.meta.env.VITE_ACCESS_TOKEN_EXPIRES_AT_NAME;

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = SecureStorage.instance().getItem(mlAtName);
    const accessTokenExpiresAt =
      SecureStorage.instance().getItem(mlAtExpiresAtName);

    if (!accessToken || !accessTokenExpiresAt) {
      navigate("/");
    }
  }, [pathname]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;

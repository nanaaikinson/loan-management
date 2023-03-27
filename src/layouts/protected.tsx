import { useAuthStore } from "@/stores/auth";
import { SecureStorage } from "@/utils/storage";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const mlAtName = import.meta.env.VITE_ACCESS_TOKEN_NAME;
const mlAtExpiresAtName = import.meta.env.VITE_ACCESS_TOKEN_EXPIRES_AT_NAME;

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  // Check if the access token is expired on page load and page change
  useEffect(() => {
    const accessToken = SecureStorage.instance().getItem(mlAtName);
    const accessTokenExpiresAt =
      SecureStorage.instance().getItem(mlAtExpiresAtName);

    if (!accessToken || !accessTokenExpiresAt) {
      navigate("/");
    }

    if (dayjs().isAfter(dayjs(accessTokenExpiresAt))) {
      logout();
      navigate("/");
    }
  }, [pathname]);

  // Setinterval every 2 minutes to check if the access token is expired
  useEffect(() => {
    const interval = setInterval(() => {
      const accessToken = SecureStorage.instance().getItem(mlAtName);
      const accessTokenExpiresAt =
        SecureStorage.instance().getItem(mlAtExpiresAtName);

      if (!accessToken || !accessTokenExpiresAt) {
        logout();
        navigate("/");
      }

      if (dayjs().isAfter(dayjs(accessTokenExpiresAt))) {
        logout();
        navigate("/");
      }
    }, 1000 * 60 * 2);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoute;

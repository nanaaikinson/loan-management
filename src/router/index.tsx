import { appRoutes } from "./app";
import { authRoutes } from "./auth";
import ProtectedRoute from "@/layouts/protected";
import Root from "@/root";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      ...authRoutes,
      {
        element: <ProtectedRoute />,
        children: [...appRoutes],
      },
    ],
  },
]);

export { router };

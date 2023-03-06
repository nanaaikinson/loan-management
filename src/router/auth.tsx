import AuthLayout from "@/layouts/auth";
import Login from "@/pages/auth/login";
import { RouteObject } from "react-router-dom";

const authRoutes: Array<RouteObject> = [
  {
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
];

export { authRoutes };

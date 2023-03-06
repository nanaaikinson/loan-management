import AppLayout from "@/layouts/app";
import Loans from "@/pages/app/loans";
import { RouteObject } from "react-router-dom";

const appRoutes: Array<RouteObject> = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "loans",
        element: <Loans />,
      },
    ],
  },
];

export { appRoutes };

import AppLayout from "@/layouts/app";
import Customers from "@/pages/app/customers";
import StoreCustomer from "@/pages/app/customers/new";
import Loans from "@/pages/app/loans";
import Transactions from "@/pages/app/transactions";
import { RouteObject } from "react-router-dom";

const appRoutes: Array<RouteObject> = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "customers/new",
        element: <StoreCustomer />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
];

export { appRoutes };

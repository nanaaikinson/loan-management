import AppLayout from "@/layouts/app";
import Customers from "@/pages/app/customers";
import EditCustomer from "@/pages/app/customers/edit";
import StoreCustomer from "@/pages/app/customers/new";
import ViewCustomer from "@/pages/app/customers/view";
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
        path: "customers/:id",
        element: <ViewCustomer />,
      },
      {
        path: "customers/:id/edit",
        element: <EditCustomer />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
    ],
  },
];

export { appRoutes };

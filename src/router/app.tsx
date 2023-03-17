import AppLayout from "@/layouts/app";
import {
  loadCustomer,
  loadCustomerLoans,
  loadCustomers,
} from "@/loaders/customer";
import Customers from "@/pages/app/customers";
import ViewCustomer from "@/pages/app/customers/[customerId]";
import CustomerLoans from "@/pages/app/customers/[customerId]/loans";
import CustomerTransactions from "@/pages/app/customers/[customerId]/transactions";
import EditCustomer from "@/pages/app/customers/edit";
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
        loader: async () => {
          return await loadCustomers();
        },
      },
      {
        path: "customers/new",
        element: <StoreCustomer />,
      },
      {
        path: "customers/:customerId",
        element: <ViewCustomer />,
        loader: async ({ params }) => {
          return await loadCustomer(params.customerId as string);
        },
        children: [
          {
            path: "loans",
            element: <CustomerLoans />,
            loader: async ({ params }) => {
              return await loadCustomerLoans(params.customerId as string);
            },
          },
          {
            path: "transactions",
            element: <CustomerTransactions />,
          },
        ],
      },
      {
        path: "customers/:customerId/edit",
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

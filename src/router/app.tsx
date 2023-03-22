import AppLayout from "@/layouts/app";
import Customers from "@/pages/app/customers";
import ViewCustomer from "@/pages/app/customers/[customerId]";
import EditCustomer from "@/pages/app/customers/[customerId]/edit";
import CustomerLoans from "@/pages/app/customers/[customerId]/loans";
import CustomerTransactions from "@/pages/app/customers/[customerId]/transactions";
import StoreCustomer from "@/pages/app/customers/new";
import Dashboard from "@/pages/app/dashboard";
import Loans from "@/pages/app/loans";
import Reports from "@/pages/app/reports";
import Transactions from "@/pages/app/transactions";
import {
  loadCustomer,
  loadCustomerLoans,
  loadCustomers,
  loadCustomerTransactions,
  loadLoans,
  loadTransactions,
} from "@/utils/loaders";
import { RouteObject } from "react-router-dom";

const appRoutes: Array<RouteObject> = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "loans",
        element: <Loans />,
        loader: async () => {
          return await loadLoans();
        },
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
        path: "customers/:customerId/edit",
        element: <EditCustomer />,
        loader: async ({ params }) => {
          return await loadCustomer(params.customerId as string);
        },
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
            loader: async ({ params }) => {
              return await loadCustomerTransactions(
                params.customerId as string
              );
            },
          },
        ],
      },
      {
        path: "transactions",
        element: <Transactions />,
        loader: async () => {
          return await loadTransactions();
        },
      },
    ],
  },
];

export { appRoutes };

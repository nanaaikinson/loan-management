import Card from "@/components/common/Card";
import Breadcrumb from "@/components/includes/Breadcrumb";
import { GetCustomer200Response } from "@/openapi/generated";
import { BreadcrumbItem } from "@/types";
import { formatDate } from "@/utils/helpers";
import { Icon } from "@iconify/react";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const ViewCustomer = () => {
  const customer = (useLoaderData() as GetCustomer200Response).data;
  const breadcrumbItems: Array<BreadcrumbItem> = [
    {
      label: "Customers",
      to: "/customers",
    },
    {
      label: `${customer?.id}`,
    },
  ];

  useTitle(`${customer.firstName} ${customer.lastName} | Microlend`);

  // Template
  return (
    <>
      <Breadcrumb items={breadcrumbItems} className="" />

      <div className="row">
        <div className="col-12 lg:col-5 xl:col-4">
          <div className="flex flex-col gap-y-8 p-5  h-screen">
            <div className="flex items-center space-x-5">
              <div className="bg-gray-300 h-14 w-14 rounded-full"></div>
              <div className="flex flex-col flex-1 ">
                <span className="text-dark font-semibold">{`${customer?.firstName} ${customer?.lastName}`}</span>
                <span className="text-gray-500 text-sm">
                  Added on{" "}
                  {customer && formatDate(customer?.createdAt, "MMM DD, YYYY")}
                </span>
              </div>
            </div>

            <ul className="flex flex-col divide-y divide-gray-100">
              <li className="flex py-4 items-center">
                <div className="px-2 flex items-center gap-x-5 text-gray-500">
                  <Icon icon="uil:envelope" className="w-5 h-5" />
                  <div className="font-semibold text-sm">{customer?.email}</div>
                </div>
              </li>

              <li className="flex py-4 items-center">
                <div className="px-2 flex items-center gap-x-5 text-gray-500">
                  <Icon icon="ph:hash" className="w-5 h-5" />
                  <div className="font-semibold text-sm">{customer?.id}</div>
                </div>
              </li>

              <li className="flex py-4 items-center">
                <div className="px-2 flex items-center gap-x-5 text-gray-500">
                  <Icon icon="uil:phone-alt" className="w-5 h-5" />
                  <div>
                    <div className="font-semibold text-sm">
                      {customer?.phoneNumber}
                    </div>
                    <div className="font-semibold text-sm">
                      {customer?.secondaryPhone}
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 lg:col-7 xl:col-8">
          <Card className="p-5 h-screen flex flex-col gap-y-8 rounded-none">
            <div>
              <nav className="tab">
                <NavLink
                  to={`/customers/${customer?.id}/loans`}
                  className="tab-link !text-base"
                >
                  Loans
                </NavLink>

                <NavLink
                  to={`/customers/${customer?.id}/transactions`}
                  className="tab-link !text-base"
                >
                  Transactions
                </NavLink>
              </nav>
            </div>

            <Outlet context={{ customer }} />
          </Card>
        </div>
      </div>
    </>
  );
};

export default ViewCustomer;

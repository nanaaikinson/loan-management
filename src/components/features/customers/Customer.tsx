import Avatar from "@/components/common/Avatar";
import Card from "@/components/common/Card";
import { Customer as ICustomer } from "@/openapi/generated";
import { formatDate, generateInitials } from "@/utils/helpers";
import { Menu, Transition } from "@headlessui/react";
import { Icon } from "@iconify/react";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CustomerProps {
  customer: ICustomer;
}

const Customer = ({ customer }: CustomerProps) => {
  const [initials, setInitials] = useState<string>("");

  useEffect(() => {
    setInitials(generateInitials(`${customer.firstName} ${customer.lastName}`));
  }, [customer]);

  return (
    <>
      <Card className="p-4 !rounded-[10px] border border-gray-100 transition duration-300 hover:shadow">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3 border-b border-gray-100 pb-3">
            <Avatar src={initials} initials className="h-12 w-12" />

            <div className="flex justify-between w-full flex-1">
              <div>
                <h6 className="font-semibold mb-0">{`${customer.firstName} ${customer.lastName}`}</h6>
                <span className="text-sm text-gray-500">
                  {customer.phoneNumber}
                </span>
              </div>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button>
                    <Icon icon="tabler:dots-vertical" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
                    <ul className="px-1 py-2 flex flex-col text-sm">
                      <li>
                        <Link
                          className="rounded block py-1 px-1 hover:bg-gray-100"
                          to={`/customers/${customer.id}`}
                        >
                          View
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="rounded block py-1 px-1 hover:bg-gray-100"
                          to={`/customers/${customer.id}/edit`}
                        >
                          Edit
                        </Link>
                      </li>
                    </ul>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <div className="flex space-x-3 items-center">
            <Icon
              icon="material-symbols:android-family-link"
              className="text-gray-500"
            />
            <span className="text-xs text-gray-500 capitalize">
              {customer.maritalStatus}
            </span>
          </div>

          <div className="flex space-x-3 items-center">
            <Icon
              icon="mdi:gender-male-female-variant"
              className="text-gray-500"
            />
            <span className="text-xs text-gray-500 capitalize">
              {customer.gender}
            </span>
          </div>

          <div className="flex space-x-3 items-center">
            <Icon
              icon="material-symbols:calendar-month-outline"
              className="text-gray-500"
            />
            <span className="text-xs text-gray-500">
              {customer.dateOfBirth}
            </span>
          </div>

          <div className="flex space-x-3 items-center">
            <Icon
              icon="material-symbols:create-new-folder"
              className="text-gray-500"
            />
            <span className="text-xs text-gray-500">
              {formatDate(customer.createdAt)}
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Customer;

import Avatar from "@/components/common/Avatar";
import Card from "@/components/common/Card";
import Breadcrumb from "@/components/includes/Breadcrumb";
import { Customer, GetCustomer200Response } from "@/openapi/generated";
import { CustomerService } from "@/services/customer.service";
import { FileService } from "@/services/file.service";
import { BreadcrumbItem } from "@/types";
import { formatDate } from "@/utils/helpers";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const ViewCustomer = () => {
  const customerData = (useLoaderData() as GetCustomer200Response).data;
  const breadcrumbItems: Array<BreadcrumbItem> = [
    {
      label: "Customers",
      to: "/customers",
    },
    {
      label: `${customerData?.id}`,
    },
  ];
  useTitle(`${customerData.firstName} ${customerData.lastName} | Microlend`);

  const [customer, setCustomer] = useState<Customer>(customerData);
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  const [avatarInitials, setAvatarInitials] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Methods
  const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarSrc(url);
      setAvatarInitials(false);

      try {
        const { data: response } = await FileService.instance().fileUpload(
          file,
          "PROFILE"
        );
        await CustomerService.instance().updateAvatar(customer.id, {
          key: response.data.key,
          url: response.data.url,
        });

        setCustomer({ ...customer, avatar: response.data.url });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Effects
  useEffect(() => {
    // Set avatar src
    if (customer?.avatar) {
      setAvatarSrc(customer?.avatar);
      setAvatarInitials(false);
    } else {
      setAvatarSrc(`${customer?.firstName} ${customer?.lastName}`);
      setAvatarInitials(true);
    }
  }, [customer]);

  // Template
  return (
    <>
      <Breadcrumb items={breadcrumbItems} className="" />

      <div className="row">
        <div className="col-12 lg:col-3">
          <div className="flex flex-col gap-y-8 p-5">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <Avatar
                  className="h-20 w-20"
                  src={avatarSrc}
                  initials={avatarInitials}
                />
                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex items-center justify-center h-8 w-8 rounded-full bg-white border border-gray-100"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon
                    icon="uil:camera"
                    className="h-4 w-4 pointer-events-none"
                  />
                </button>
              </div>

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

        <div className="col-12 lg:col-9">
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

      <input
        ref={fileInputRef}
        type="file"
        name="avatarFileInput"
        id="avatarFileInput"
        className="hidden"
        accept="image/jpeg, image/png, image/jpg"
        onChange={uploadAvatar}
      />
    </>
  );
};

export default ViewCustomer;

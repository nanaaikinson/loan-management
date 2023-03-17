import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import {
  Customer as ICustomer,
  GetCustomers200Response,
} from "@/openapi/generated";
import { formatDate } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useTitle } from "react-use";

const Customers = () => {
  useTitle("Customers | Microlend");

  const navigate = useNavigate();
  const customers = (useLoaderData() as GetCustomers200Response).data;
  const [loading, setLoading] = useState<boolean>(false);
  const tableColumns = useMemo<Array<ColumnDef<ICustomer>>>(
    () => [
      {
        header: "Customer",
        cell: (val) => (
          <>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 h-10 w-10 rounded-full"></div>
              <div className="flex flex-col flex-1 ">
                <span className="text-dark font-semibold">
                  {`${val.row.original.firstName} ${val.row.original.lastName}`}
                </span>
                <span className="text-gray-500">
                  {val.row.original.email || "No email"}
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        header: "Phone Number",
        cell: (val) => val.renderValue(),
        accessorKey: "phoneNumber",
      },
      {
        header: "Gender",
        cell: (val) => (
          <span className="capitalize">{val.row.original.gender}</span>
        ),
      },
      {
        header: "Date of Birth",
        cell: (val) => formatDate(val.row.original.dateOfBirth, "MMM DD, YYYY"),
      },
      {
        header: "Occupation",
        cell: (val) => (
          <span className="capitalize">
            {val.row.original.occupation ?? "No occupation"}
          </span>
        ),
      },
      {
        header: "Added On",
        cell: (val) => formatDate(val.row.original.createdAt, "MMM DD, YYYY"),
      },
      {
        header: " ",
        cell: (val) => (
          <>
            <div className="flex space-x-3">
              <Link
                to={`/customers/${val.row.original.id}/loans`}
                className="text-info"
              >
                View
              </Link>
            </div>
          </>
        ),
      },
    ],
    []
  );

  // Methods

  // Template
  return (
    <>
      <div className="container">
        <Card className="rounded-[7px] p-4">
          <div className="flex flex-col space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h3>Customers</h3>
              </div>

              <Button onClick={() => navigate("/customers/new")}>
                Add customer
              </Button>
            </div>

            <Table columns={tableColumns} data={customers} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default Customers;

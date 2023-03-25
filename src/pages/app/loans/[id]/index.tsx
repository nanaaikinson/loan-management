import Breadcrumb from "@/components/includes/Breadcrumb";
import { Loan } from "@/openapi/generated";
import { BreadcrumbItem } from "@/types";
import { useLoaderData } from "react-router-dom";
import { useTitle } from "react-use";

const ViewLoan = () => {
  const loan = useLoaderData() as Loan;
  const breadcrumbItems: Array<BreadcrumbItem> = [
    {
      label: "Loans",
      to: "/loans",
    },
    {
      label: `${loan.id}`,
    },
  ];

  useTitle(`Loan | Microlend`);

  return (
    <>
      <Breadcrumb items={breadcrumbItems} className="" />
    </>
  );
};

export default ViewLoan;

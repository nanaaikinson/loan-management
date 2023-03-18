import Table from "@/components/common/Table";
import NoData from "@/components/misc/NoData";
import {
  CustomerTransactions200Response,
  Transaction,
} from "@/openapi/generated";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useLoaderData } from "react-router-dom";

const CustomerTransactions = () => {
  const transactions = (useLoaderData() as CustomerTransactions200Response)
    .data;
  const tableColumns = useMemo<Array<ColumnDef<Transaction>>>(() => [], []);

  return (
    <>
      {transactions.length > 0 ? (
        <>
          <Table columns={tableColumns} data={transactions} />
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default CustomerTransactions;

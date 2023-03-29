import Card from "@/components/common/Card";
import Table from "@/components/common/Table";
import DashboardSkeleton from "@/components/misc/DashboardSkeleton";
import TransactionStatus from "@/components/misc/TransactionStatus";
import { StatisticsDashboardData, Transaction } from "@/openapi/generated";
import { StatisticsService } from "@/services/statistics.service";
import { formatDate, formatMoney } from "@/utils/helpers";
import { ColumnDef } from "@tanstack/react-table";
import { isAxiosError } from "axios";
import { useState, useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useTitle } from "react-use";

const Dashboard = () => {
  useTitle("Dashboard | Microlend");

  // State
  const [data, setData] = useState<StatisticsDashboardData>({
    recentTransactions: [],
    dashboard: {
      totalNumberOfLoans: 0,
      totalLoanAmount: 0,
      totalAmountPaid: 0,
      loanStatusesCount: [],
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const tableColumns = useMemo<Array<ColumnDef<Transaction>>>(
    () => [
      {
        header: "Reference",
        cell: (val) => val.renderValue(),
        accessorKey: "reference",
      },
      {
        header: "Amount",
        cell: (val) => (
          <span className="">{`${val.row.original.currency} ${formatMoney(
            val.row.original.amount
          )}`}</span>
        ),
      },
      {
        header: "Customer",
        cell: (val) => (
          <>
            <Link to={`/customers/${val.row.original?.customer?.id}/loans`}>
              <span className="transition-all duration-300 text-info hover:text-info-dark">
                {`${val.row.original?.customer?.firstName} ${val.row.original?.customer?.lastName}`}
              </span>
            </Link>
          </>
        ),
      },
      {
        header: "Loan",
        cell: (val) =>
          val.row.original.loan ? (
            <>
              <Link to={`/loans/${val.row.original?.loan.id}`}>
                <span className="transition-all duration-300 text-info hover:text-info-dark">
                  {val.row.original?.loan.id}
                </span>
              </Link>
            </>
          ) : (
            <span className="text-gray-300">None</span>
          ),
      },
      {
        header: "Status",
        cell: (val) => <TransactionStatus status={val.row.original.status} />,
      },
      {
        header: "Transaction Date",
        cell: (val) => (
          <span>
            {formatDate(
              val.row.original.createdAt,
              "dddd, MMMM DD, YYYY h:mm A"
            )}
          </span>
        ),
      },
    ],
    []
  );

  // Methods
  const fetchData = async () => {
    setLoading(true);

    try {
      const { data: response } =
        await StatisticsService.instance().getDashboardAnalytics();
      setData(response.data);

      // setLoans(response.data);
    } catch (error) {
      if (isAxiosError(error) && error?.response) {
        toast.error(error?.response?.data.message);
      } else {
        toast.error((error as Error).message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
  }, []);

  // Template
  return (
    <>
      {loading ? (
        <DashboardSkeleton />
      ) : (
        <div className="container-fluid">
          <div className="flex flex-col gap-y-8">
            <div>
              <h4>Statistics</h4>
              <div className="row">
                <div className="col-12 sm:col-6 md:col-4 lg:col-3">
                  <div className="mb-4">
                    <Card className="p-4">
                      <p className="text-gray-500">Total loans</p>

                      <h5>{data.dashboard.totalNumberOfLoans}</h5>
                    </Card>
                  </div>
                </div>

                <div className="col-12 sm:col-6 md:col-4 lg:col-3">
                  <div className="mb-4">
                    <Card className="p-4">
                      <p className="text-gray-500">Total invested</p>

                      <h5>GHS {formatMoney(data.dashboard.totalLoanAmount)}</h5>
                    </Card>
                  </div>
                </div>

                <div className="col-12 sm:col-6 md:col-4 lg:col-3">
                  <div className="mb-4">
                    <Card className="p-4">
                      <p className="text-gray-500">Total paid</p>

                      <h5>
                        GHS{" "}
                        {formatMoney(
                          data.dashboard.totalAmountPaid as unknown as number
                        )}
                      </h5>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4>Recent repayments</h4>
              <Card className="p-4">
                <Table columns={tableColumns} data={data.recentTransactions} />
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;

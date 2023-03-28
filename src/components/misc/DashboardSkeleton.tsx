import Card from "../common/Card";
import TableSkeleton from "./TableSkeleton";

const DashboardSkeleton = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="flex flex-col gap-y-8 animate-pulse">
          <div className="">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <div className="row">
              <div className="col-12 sm:col-6 md:col-4 lg:col-3">
                <div className="w-full h-28 bg-gray-300 rounded"></div>
              </div>
              <div className="col-12 sm:col-6 md:col-4 lg:col-3">
                <div className="w-full h-28 bg-gray-300 rounded"></div>
              </div>
              <div className="col-12 sm:col-6 md:col-4 lg:col-3">
                <div className="w-full h-28 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>

          <div className="">
            <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
            <Card className="p-4">
              <TableSkeleton rows={5} />
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSkeleton;

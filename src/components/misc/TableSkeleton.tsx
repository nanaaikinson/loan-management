import classNames from "classnames";

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  animate?: boolean;
}

const TableSkeleton = ({
  columns = 5,
  rows = 10,
  animate = false,
}: TableSkeletonProps) => {
  return (
    <>
      <div
        className={classNames(
          "py-2 w-full overflow-auto",
          animate && "animate-pulse"
        )}
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {[...Array(columns).keys()].map((i) => (
                <th className="px-3 py-3.5" key={i}>
                  <div className="h-2.5 bg-gray-200 w-full rounded"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {[...Array(rows).keys()].map((i) => (
              <tr key={i}>
                {[...Array(columns).keys()].map((j) => (
                  <td className="whitespace-nowrap px-3 py-4" key={j}>
                    <div className="h-3.5 bg-gray-300 w-full rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableSkeleton;

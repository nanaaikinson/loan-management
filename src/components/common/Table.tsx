import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

interface TableProps<T> {
  columns: Array<ColumnDef<T>>;
  data: Array<T>;
  tableClassName?: string;
  tableHeadClassName?: string;
  tableHeaderClassName?: string;
  tableBodyClassName?: string;
  tableHeadRowClassName?: string;
  tableBodyRowClassName?: string;
  tableCellClassName?: string;
  tableContainerClassName?: string;
}

const Table = <T,>({
  columns,
  data,
  tableHeadClassName,
  tableBodyClassName,
  tableCellClassName,
  tableClassName,
  tableContainerClassName,
  tableHeaderClassName,
  tableBodyRowClassName,
  tableHeadRowClassName,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className={classNames("py-2", tableContainerClassName)}>
        <table
          className={classNames(
            "min-w-full divide-y divide-gray-200",
            tableClassName
          )}
        >
          <thead className={classNames("bg-white", tableHeadClassName)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={classNames("", tableHeadRowClassName)}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    scope="col"
                    key={header.id}
                    className={classNames(
                      "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                      tableHeaderClassName
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody
            className={classNames(
              "divide-y divide-gray-100 bg-white",
              tableBodyClassName
            )}
          >
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={classNames("", tableBodyRowClassName)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={classNames(
                      "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                      tableCellClassName
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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

export default Table;

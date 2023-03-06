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
      <div className={classNames("p-2", tableContainerClassName)}>
        <table className={classNames("", tableClassName)}>
          <thead className={classNames("", tableHeadClassName)}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className={classNames("", tableHeadRowClassName)}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={classNames("", tableHeaderClassName)}
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

          <tbody className={classNames("", tableBodyClassName)}>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className={classNames("", tableBodyRowClassName)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={classNames("", tableCellClassName)}
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

import { act, ChangeEvent, useState } from "react";
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ChevronsUpDown, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { Input } from "./ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: keyof TData & string;
  initialSort?: SortingState;
  tableContainerClassName?: string;
  actions?: React.ReactNode;
  mobileCell?: (data: TData) => React.ReactNode;
};

type DataTableColumnHeaderProps<TData, TValue> =
  React.HTMLAttributes<HTMLDivElement> & {
    column: Column<TData, TValue>;
    title: string;
  };

const DataTable = <TData, TValue>({
  columns,
  data,
  searchKey,
  initialSort,
  tableContainerClassName,
  actions,
  mobileCell,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>(initialSort || []);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const isMobile = useIsMobile();

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const onSearchChange = (
    event: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    table.getColumn(searchKey)?.setFilterValue(event.target.value);
  };

  const onSortChange = (value: string | null) => {
    if (!value) return;
    const column = table.getColumn(value);
    if (!column) return;
    column.toggleSorting();
  };

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center @max-sm:flex-col @max-sm:gap-3 @max-sm:sticky @max-sm:top-5 @max-sm:bg-background @max-sm:z-10">
        <ButtonGroup className="@max-sm:w-full @max-sm:order-3">
          <Button variant="outline" aria-label="Buscar">
            <SearchIcon />
          </Button>
          <Input
            placeholder="Buscar..."
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={onSearchChange}
          />
        </ButtonGroup>
        {isMobile && mobileCell && (
          <div className="w-full flex justify-between @max-sm:order-2">
            <Select
              items={columns.map((col: any) => ({
                label: col.footer as string,
                value: col.accessorKey as string,
              }))}
              onValueChange={onSortChange}
            >
              <SelectTrigger className="w-full" aria-invalid={false}>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {columns.map((header: any) => {
                    const id = header.accessorKey;
                    if (id === "actions") return null;
                    return (
                      <SelectItem key={id} value={id}>
                        {header.footer}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        {actions && (
          <div className="ml-auto @max-sm:w-full @max-sm:order-1">
            {actions}
          </div>
        )}
      </div>
      {isMobile && mobileCell ? (
        table.getRowModel().rows?.map((row) => {
          return mobileCell(row.original);
        })
      ) : (
        <div className={cn("rounded-md border", tableContainerClassName)}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => {
                return (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Sin resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const onSort = () => {
    column.toggleSorting(column.getIsSorted() === "asc");
  };

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span>{title}</span>
      <Button variant="ghost" size="icon" className="size-6" onClick={onSort}>
        {column.getIsSorted() === "desc" ? (
          <ArrowDown />
        ) : column.getIsSorted() === "asc" ? (
          <ArrowUp />
        ) : (
          <ChevronsUpDown />
        )}
      </Button>
    </div>
  );
}

export default DataTable;

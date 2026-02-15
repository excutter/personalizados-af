import DataTable, { DataTableColumnHeader } from "@/components/data-table";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatDate } from "@/lib/date-utils";
import { formatCurrency } from "@/lib/number-utils";
import { Plus, ScanBarcode } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

type Transaction = {
  id: string;
  createdAt: Date;
  amount: number;
  description: string;
};

const mockTransactions: Transaction[] = [
  {
    id: "txn-001",
    createdAt: new Date("2026-02-10"),
    amount: 15,
    description: "Botella de agua",
  },
  {
    id: "txn-002",
    createdAt: new Date("2026-02-08"),
    amount: 720,
    description: "Renovación de membresía - Mes",
  },
  {
    id: "txn-003",
    createdAt: new Date("2026-02-05"),
    amount: 15,
    description: "Botella de agua",
  },
  {
    id: "txn-004",
    createdAt: new Date("2026-02-01"),
    amount: 15,
    description: "Botella de agua",
  },
  {
    id: "txn-005",
    createdAt: new Date("2026-01-15"),
    amount: 720,
    description: "Renovación de membresía - Mes",
  },
  {
    id: "txn-006",
    createdAt: new Date("2026-01-12"),
    amount: 15,
    description: "Botella de agua",
  },
  {
    id: "txn-007",
    createdAt: new Date("2026-01-08"),
    amount: 15,
    description: "Botella de agua",
  },
  {
    id: "txn-008",
    createdAt: new Date("2026-01-03"),
    amount: 15,
    description: "Botella de agua",
  },
];

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ getValue }) =>
      formatDate({ date: getValue() as Date, format: "P" }) || "",
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ getValue }) => formatCurrency(getValue() as number) || "",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
];

const TransactionsTable = () => {
  if (mockTransactions.length === 0) {
    return <EmptyTransactions />;
  }

  return (
    <DataTable
      tableContainerClassName="border-x-0 border-b-0 rounded-none"
      searchKey="description"
      initialSort={[{ id: "createdAt", desc: true }]}
      data={mockTransactions}
      columns={columns}
    />
  );
};

const EmptyTransactions = () => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ScanBarcode />
        </EmptyMedia>
        <EmptyTitle>Sin Transacciones</EmptyTitle>
        <EmptyDescription>
          No hay transacciones registradas para este usuario.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <Button variant="outline" size="sm">
          <Plus />
          Registrar Transacción
        </Button>
      </EmptyContent>
    </Empty>
  );
};

export default TransactionsTable;

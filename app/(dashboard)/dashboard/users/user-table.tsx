import DataTable, { DataTableColumnHeader } from "@/components/data-table";
import ExpireDate from "@/components/expire-date";
import { ColumnDef } from "@tanstack/react-table";

type UserTableProps = {
  actions?: React.ReactNode;
};

type User = {
  id: number;
  name: string;
  group: string;
  water: number;
  expirationDate: Date;
};

const users: User[] = [
  {
    id: 1,
    name: "Juan García",
    group: "Grupo A",
    water: 5,
    expirationDate: new Date("2024-12-31"),
  },
  {
    id: 2,
    name: "María López",
    group: "Grupo B",
    water: 3,
    expirationDate: new Date("2024-11-15"),
  },
  {
    id: 3,
    name: "Carlos Rodríguez",
    group: "Grupo A",
    water: 8,
    expirationDate: new Date("2025-01-20"),
  },
];

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "group",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grupo" />
    ),
  },
  {
    accessorKey: "water",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agua" />
    ),
  },
  {
    accessorKey: "expirationDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vencimiento" />
    ),
    cell: (props) => {
      const date = props.getValue() as Date;
      return <ExpireDate date={date} />;
    },
  },
  { accessorKey: "actions", header: "Acciones" },
];

const UserTable: React.FC<UserTableProps> = ({ actions }) => {
  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      actions={actions}
    />
  );
};

export default UserTable;

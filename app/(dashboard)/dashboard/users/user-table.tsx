import DataTable, { DataTableColumnHeader } from "@/components/data-table";
import ExpireDate from "@/components/expire-date";
import { Card } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { GlassWater, Users } from "lucide-react";

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
    name: "Juan García Castellano",
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
    footer: "Nombre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
  },
  {
    accessorKey: "group",
    footer: "Grupo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Grupo" />
    ),
  },
  {
    accessorKey: "water",
    footer: "Agua",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Agua" />
    ),
  },
  {
    accessorKey: "expirationDate",
    footer: "Vencimiento",
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
      mobileCell={(data) => <MobileCell key={data.id} user={data} />}
    />
  );
};

const MobileCell: React.FC<{ user: User }> = ({ user }) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase().slice(0, 2);
  };

  return (
    <Card className="flex flex-row items-center gap-3 px-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 font-semibold text-white">
        {getInitials(user.name)}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p>{user.name}</p>
        <div className="flex gap-4">
          <p className="flex items-center gap-1">
            <Users size={14} strokeWidth={2.5} />
            {user.group}
          </p>
          <p className="flex items-center gap-1 flex-1">
            <GlassWater size={14} strokeWidth={2.5} />
            {user.water}
          </p>
          <ExpireDate date={user.expirationDate} />
        </div>
      </div>
    </Card>
  );
};

export default UserTable;

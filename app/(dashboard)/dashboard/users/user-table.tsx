import DataTable, { DataTableColumnHeader } from "@/components/data-table";
import ExpireDate from "@/components/expire-date";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { GlassWater, NotebookText, Trash2, UserPen, Users } from "lucide-react";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Alert from "@/components/alert";

import { ColumnDef } from "@tanstack/react-table";
import { User, users } from "@/types/User";
import { getInitials } from "@/lib/user-utils";

type UserTableProps = {
  actions?: React.ReactNode;
};

const UserTable: React.FC<UserTableProps> = ({ actions }) => {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      footer: "Nombre",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => `${row.original.name} ${row.original.lastName}`,
      filterFn: (row, _, filterValue) => {
        const normalizeString = (str: string) =>
          str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const name = normalizeString(row.original.name || "");
        const lastName = normalizeString(row.original.lastName || "");
        const searchValue = normalizeString(filterValue);
        return name.includes(searchValue) || lastName.includes(searchValue);
      },
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
      accessorKey: "enrollmentDate",
      footer: "Vencimiento",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Vencimiento" />
      ),
      cell: (props) => {
        const date = props.getValue() as Date;
        return <ExpireDate date={date} />;
      },
    },
    {
      accessorKey: "notes",
      header: "Notas",
      footer: "Notas",
      cell: (props) => {
        if (!props.row.original.notes) return null;
        return (
          <HoverCard>
            <HoverCardTrigger>
              <NotebookText size={16} strokeWidth={2} />
            </HoverCardTrigger>
            <HoverCardContent>
              <Label className="text-sm">{props.row.original.notes}</Label>
            </HoverCardContent>
          </HoverCard>
        );
      },
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: (props) => {
        const user = props.row.original;
        return (
          <div>
            <Link href={`/dashboard/users/${user.id}`}>
              <Button variant="outline" size="sm">
                <UserPen size={14} strokeWidth={2.5} />
                Editar
              </Button>
            </Link>
            <Alert
              variant="destructive"
              title="Eliminar alumno"
              description={`¿Estás seguro de que quieres eliminar a ${user.name} ${user.lastName}?`}
              onConfirm={() => onDeleteUser(user)}
              trigger={
                <Button variant="destructive" size="sm" className="ml-2">
                  <Trash2 size={14} strokeWidth={2.5} />
                  Eliminar
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

  const onDeleteUser = (user: User) => {
    // Lógica para manejar la eliminación de un usuario
    console.log("Deleted user:", user);
  };

  return (
    <DataTable
      columns={columns}
      data={users}
      searchKey="name"
      initialSort={[{ id: "name", desc: false }]}
      actions={actions}
      mobileCell={(data) => <UserCell key={data.id} user={data} />}
    />
  );
};

const UserCell: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card className="flex flex-row items-center gap-3 px-2">
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 font-semibold text-white">
        {getInitials(user)}
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p>
          {user.name} {user.lastName}
        </p>
        <div className="flex gap-4">
          <p className="flex items-center gap-1">
            <Users size={14} strokeWidth={2.5} />
            {user.group}
          </p>
          <p className="flex items-center gap-1 flex-1">
            <GlassWater size={14} strokeWidth={2.5} />
            {user.water}
          </p>
          {user.enrollmentDate && <ExpireDate date={user.enrollmentDate} />}
        </div>
      </div>
    </Card>
  );
};

export default UserTable;

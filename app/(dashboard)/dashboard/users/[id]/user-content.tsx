"use client";

import { useState } from "react";
import { Page, PageContent, PageHeader, PageSubtitle } from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import { formatDate } from "@/lib/date-utils";
import { User } from "@/types/User";
import { Pencil, Save, Trash2 } from "lucide-react";
import TransactionsTable from "./transactions-table";
import Alert from "@/components/alert";

type UserPageProps = {
  user?: User;
  isNew: boolean;
};

type NewUser = Omit<User, "id" | "water" | "enrollmentDate"> & {
  enrollmentDate: Date | undefined;
};

const groups = [
  { label: "Grupo A", value: "grupo_a" },
  { label: "Grupo B", value: "grupo_b" },
  { label: "Grupo C", value: "grupo_c" },
];

const UserPageContent: React.FC<UserPageProps> = ({
  user: fetchedUser,
  isNew,
}) => {
  const newUserTemplate: NewUser = {
    name: "",
    lastName: "",
    group: "",
    enrollmentDate: undefined,
    notes: "",
  };
  const [user, setUser] = useState<NewUser>(() => {
    if (isNew) {
      return newUserTemplate;
    } else if (fetchedUser) {
      return {
        name: fetchedUser.name,
        lastName: fetchedUser.lastName,
        group: fetchedUser.group,
        enrollmentDate: fetchedUser.enrollmentDate,
        notes: fetchedUser.notes,
      };
    } else {
      return newUserTemplate;
    }
  });
  const [canEdit, setCanEdit] = useState(isNew);

  const onEditClick = () => {
    setCanEdit((prevState) => !prevState);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUser((prev) => (prev ? { ...prev, [id]: value } : prev));
  };

  const onGroupChange = (value: string | null) => {
    setUser((prev) => (prev ? { ...prev, group: value || "" } : prev));
  };

  const onDateChange = (date: Date | undefined) => {
    setUser((prev) => (prev ? { ...prev, enrollmentDate: date } : prev));
  };

  const onNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setUser((prev) => (prev ? { ...prev, notes: value } : prev));
  };

  const onDeleteUser = (user?: User) => {
    // Lógica para manejar la eliminación de un usuario
    if (!user) return;
    console.log("Deleted user:", user);
  };

  const submitIsDisabled =
    user.name && user.lastName && user.group && user.enrollmentDate;

  return (
    <Page id="user-page" className="w-full h-full flex flex-col">
      <PageSubtitle>Alumno</PageSubtitle>
      <PageHeader>
        {isNew ? "Crear nuevo" : `${user.name} ${user.lastName}`}
      </PageHeader>
      <PageContent className="w-full mb-8 flex-1 grid grid-cols-[45%_1fr] gap-4 max-[1020px]:grid-cols-1">
        <Card
          className={`flex-1 ${isNew ? "h-full" : "h-fit"} sticky top-10 max-[1020px]:relative max-[1020px]:top-0`}
        >
          {!isNew && (
            <CardAction className="w-full flex justify-end px-4">
              <Button
                variant={canEdit ? "default" : "outline"}
                size="icon"
                className={
                  canEdit ? "bg-blue-500 hover:bg-blue-600 text-white" : ""
                }
                onClick={onEditClick}
              >
                <Pencil />
              </Button>
            </CardAction>
          )}
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nombre(s)</FieldLabel>
                <Input
                  id="name"
                  required
                  placeholder="Angel"
                  value={user.name}
                  disabled={!canEdit}
                  onChange={onInputChange}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="lastName">Apellidos</FieldLabel>
                <Input
                  id="lastName"
                  required
                  placeholder="Flores"
                  value={user.lastName}
                  disabled={!canEdit}
                  onChange={onInputChange}
                />
              </Field>
              <FieldGroup>
                <Field data-invalid={false}>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Grupo
                  </FieldLabel>
                  <Select
                    required
                    value={user.group}
                    items={groups}
                    disabled={!canEdit}
                    onValueChange={onGroupChange}
                  >
                    <SelectTrigger aria-invalid={false}>
                      <SelectValue placeholder="Selecciona un grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {groups.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>
              <Field>
                <FieldLabel htmlFor="expirationDate">
                  Fecha de Inscripción
                </FieldLabel>
                <Popover>
                  <PopoverTrigger
                    className="disabled:cursor-not-allowed"
                    disabled={!canEdit}
                    render={
                      <Button
                        variant="outline"
                        id="expirationDate"
                        className="justify-start font-normal disabled:cursor-not-allowed"
                        disabled={!canEdit}
                      >
                        {user.enrollmentDate ? (
                          formatDate({ date: user.enrollmentDate })
                        ) : (
                          <span className="text-gray-500">
                            Selecciona una fecha
                          </span>
                        )}
                      </Button>
                    }
                  />
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={user.enrollmentDate}
                      disabled={!canEdit}
                      onSelect={onDateChange}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field>
                <FieldLabel htmlFor="notes">Notas</FieldLabel>
                <Textarea
                  id="notes"
                  value={user.notes}
                  disabled={!canEdit}
                  onChange={onNotesChange}
                />
              </Field>
            </FieldGroup>
          </CardContent>
          <CardFooter
            className={`mt-auto ${isNew ? "justify-end" : "justify-between"}`}
          >
            {!isNew && (
              <Alert
                variant="destructive"
                title="Eliminar alumno"
                description={`¿Estás seguro de que quieres eliminar a ${user.name} ${user.lastName}?`}
                onConfirm={() => onDeleteUser(fetchedUser)}
                trigger={
                  <Button variant="destructive">
                    <Trash2 size={14} strokeWidth={2.5} />
                    Eliminar
                  </Button>
                }
              />
            )}
            <Button type="submit" disabled={!submitIsDisabled || !canEdit}>
              <Save />
              Guardar
            </Button>
          </CardFooter>
        </Card>
        {!isNew && <TransactionsTable />}
      </PageContent>
    </Page>
  );
};

export default UserPageContent;

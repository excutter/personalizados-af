"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { User } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { Textarea } from "@/components/ui/textarea";

type UserDrawerProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const groups = [
  { label: "Grupo A", value: "grupo_a" },
  { label: "Grupo B", value: "grupo_b" },
  { label: "Grupo C", value: "grupo_c" },
];

type User = {
  name: string;
  lastName: string;
  group: string;
  enrollmentDate?: Date;
  notes?: string;
};

const UserDrawer: React.FC<UserDrawerProps> = ({ isOpen, onOpenChange }) => {
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User>({
    name: "",
    lastName: "",
    group: "",
    enrollmentDate: undefined,
    notes: "",
  });

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

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

  const submitIsDisabled =
    user.name && user.lastName && user.group && user.enrollmentDate;

  return (
    <Sheet disablePointerDismissal open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader className="pb-0">
          <SheetTitle>Agregar Alumno</SheetTitle>
          <SheetDescription>
            Completa los campos para agregar un nuevo alumno al sistema.
          </SheetDescription>
        </SheetHeader>
        <form
          className="px-4 h-full flex flex-col overflow-y-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre(s)</FieldLabel>
              <Input
                id="name"
                required
                placeholder="Angel"
                onChange={onInputChange}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Apellidos</FieldLabel>
              <Input
                id="lastName"
                required
                placeholder="Flores"
                onChange={onInputChange}
              />
            </Field>
            <FieldGroup>
              <Field data-invalid={false}>
                <FieldLabel htmlFor="checkout-exp-month-ts6">Grupo</FieldLabel>
                <Select required items={groups} onValueChange={onGroupChange}>
                  <SelectTrigger
                    id="checkout-7j9-exp-year-f59"
                    aria-invalid={false}
                  >
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
                  render={
                    <Button
                      variant="outline"
                      id="expirationDate"
                      className="justify-start font-normal"
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
                    timeZone={timeZone}
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
                onChange={onNotesChange}
              />
            </Field>
          </FieldGroup>
          <SheetFooter className="px-0">
            <Button type="submit" disabled={!submitIsDisabled}>
              Agregar
            </Button>
            <SheetClose render={<Button variant="outline">Cerrar</Button>} />
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UserDrawer;

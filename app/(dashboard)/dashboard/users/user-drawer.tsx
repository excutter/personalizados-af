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

type UserDrawerProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const groups = [
  { label: "Grupo A", value: "grupo_a" },
  { label: "Grupo B", value: "grupo_b" },
  { label: "Grupo C", value: "grupo_c" },
];

const UserDrawer: React.FC<UserDrawerProps> = ({ isOpen, onOpenChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeZone, setTimeZone] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <Sheet disablePointerDismissal open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Agregar Alumno</SheetTitle>
          <SheetDescription>
            Completa los campos para agregar un nuevo alumno al sistema.
          </SheetDescription>
        </SheetHeader>
        <div className="w-15 h-15 mx-4 flex justify-center items-center bg-gray-100 rounded-full">
          <User strokeWidth={2.5} />
        </div>
        <form className="px-4 h-full flex flex-col">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre(s)</FieldLabel>
              <Input id="name" required placeholder="Angel" />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Apellidos</FieldLabel>
              <Input id="lastName" required placeholder="Flores" />
            </Field>
            <FieldGroup>
              <Field data-invalid={false}>
                <FieldLabel htmlFor="checkout-exp-month-ts6">Grupo</FieldLabel>
                <Select required items={groups}>
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
                      {selectedDate ? (
                        formatDate({ date: selectedDate })
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
                    selected={selectedDate}
                    defaultMonth={selectedDate}
                    onSelect={setSelectedDate}
                    timeZone={timeZone}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </FieldGroup>
          <SheetFooter className="px-0">
            <Button type="submit">Agregar</Button>
            <SheetClose render={<Button variant="outline">Cerrar</Button>} />
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default UserDrawer;

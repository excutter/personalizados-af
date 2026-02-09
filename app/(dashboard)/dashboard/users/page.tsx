"use client";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import UserTable from "./user-table";
import UserDrawer from "./user-drawer";

const UsersPage = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "waitlist">("all");
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold dark:text-white">Alumnos</h1>
      <div className="flex flex-col gap-5 mt-5">
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList
            className="w-full justify-start gap-2"
            style={{ height: "38px" }}
          >
            <TabsTrigger value="all" className="grow-0">
              Todos
              <Badge variant="default">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="waitlist" className="grow-0">
              Lista de Espera
              <Badge variant="default">10</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <UserTable
          actions={
            <Button
              variant="default"
              aria-label="Agregar Alumno"
              onClick={() => setIsUserFormOpen(true)}
            >
              <Plus /> Agregar Alumno
            </Button>
          }
        />
        <UserDrawer isOpen={isUserFormOpen} onOpenChange={setIsUserFormOpen} />
      </div>
    </div>
  );
};

export default UsersPage;

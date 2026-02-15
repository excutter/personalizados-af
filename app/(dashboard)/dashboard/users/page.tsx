"use client";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import UserTable from "./user-table";
import UserDrawer from "./user-drawer";
import { Page, PageHeader } from "@/components/page";

const UsersPage = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "waitlist">("all");
  const [createUser, setCreateUser] = useState<boolean>(false);

  return (
    <Page id="users-page">
      <PageHeader>Alumnos</PageHeader>
      <div className="@container flex flex-col gap-5 mt-5">
        <Tabs
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
        >
          <TabsList
            className="w-full justify-start gap-2"
            style={{ height: "38px" }}
          >
            <TabsTrigger
              value="all"
              className="grow-0 @max-sm/users-page:flex-1 @max-md/users-page:flex-1"
            >
              Todos
              <Badge variant="default">3</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="waitlist"
              className="grow-0 @max-sm/users-page:flex-1 @max-md/users-page:flex-1"
            >
              Lista de Espera
              <Badge variant="default">10</Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <UserTable
          actions={
            <Button
              className="@max-sm/users-page:w-full"
              variant="default"
              aria-label="Agregar Alumno"
              onClick={() => setCreateUser(true)}
            >
              <Plus /> Agregar Alumno
            </Button>
          }
        />
        <UserDrawer isOpen={createUser} onOpenChange={setCreateUser} />
      </div>
    </Page>
  );
};

export default UsersPage;

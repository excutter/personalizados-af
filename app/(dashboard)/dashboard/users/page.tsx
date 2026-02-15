"use client";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import UserTable from "./user-table";
import { Page, PageHeader } from "@/components/page";
import Link from "next/link";

const UsersPage = () => {
  const [selectedTab, setSelectedTab] = useState<"all" | "waitlist">("all");

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
            >
              <Link
                href="/dashboard/users/new"
                className="inline-flex items-center gap-1"
              >
                <Plus strokeWidth={2.5} />
                Agregar Alumno
              </Link>
            </Button>
          }
        />
      </div>
    </Page>
  );
};

export default UsersPage;

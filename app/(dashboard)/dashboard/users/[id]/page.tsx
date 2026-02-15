import Link from "next/link";
import { Page, PageContent } from "@/components/page";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

import { ArrowUpRightIcon, UserX } from "lucide-react";

import { users } from "@/types/User";
import UserPageContent from "./user-content";

const UserPage: React.FC<{ params: Promise<{ id: string }> }> = async ({
  params,
}) => {
  const id = (await params).id;
  const user = users.find((u) => u.id === id);
  const isNewUser = id === "new";

  if (!user && !isNewUser) {
    return <UserNotFound />;
  }

  return <UserPageContent isNew={isNewUser} user={user} />;
};

const UserNotFound: React.FC = () => {
  return (
    <Page id="user-page" className="w-full h-full">
      <PageContent className="w-full h-full flex items-center justify-center">
        <Empty className="border border-dashed w-2.5">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserX />
            </EmptyMedia>
            <EmptyTitle>Alumno no encontrado</EmptyTitle>
            <EmptyDescription>
              El alumno que estás buscando no existe.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link
              href="/dashboard/users"
              className="inline-flex items-center gap-2"
            >
              <Button variant="link">
                Volver a la lista de alumnos <ArrowUpRightIcon />
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      </PageContent>
    </Page>
  );
};

export default UserPage;

import ExpireDate from "@/components/expire-date";
import { Page, PageHeader } from "@/components/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserItem from "@/components/user-item";
import { formatDate, getDayPeriod } from "@/lib/date-utils";
import {
  Clock9,
  GlassWater,
  MessageCircle,
  Plus,
  RefreshCcw,
  UserPlus,
  Users,
  X,
} from "lucide-react";

const DashboardPage = () => {
  const currentDate = new Date();
  return (
    <Page id="dashboard-page">
      <PageHeader>{getDayPeriod({ date: currentDate })}, Angel</PageHeader>
      <h2 className="text-xl text-gray-500 dark:text-gray-400 font-semibold">
        {formatDate({ date: currentDate })}
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-6 max-[1020px]:grid-cols-1">
        <InThisMomentCard />
        <ExpireSoonCard />
      </div>
    </Page>
  );
};

const InThisMomentCard: React.FC = () => {
  return (
    <Card className="@container py-0 gap-3">
      <CardHeader className="px-0">
        <CardTitle className="py-2 px-4 text-xs uppercase font-medium text-gray-500 bg-neutral-50 dark:bg-card dark:text-gray-100">
          En este momento
        </CardTitle>
        <CardDescription className="px-4">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              Grupo 2
            </h3>
            <Button
              variant="outline"
              size="icon-sm"
              className="rounded-full text-black dark:text-white"
            >
              <Plus strokeWidth={3} />
            </Button>
          </div>
          <div className="flex items-center @max-sm:flex-wrap gap-4 dark:text-gray-300">
            <p className="flex gap-1 items-center">
              <Clock9 size={14} strokeWidth={2.5} />
              6:00 - 7:00
            </p>
            <p className="flex gap-1 items-center">
              <Users size={14} strokeWidth={2.5} />8 de 15
            </p>
            <p className="flex gap-1 items-center">
              <UserPlus size={14} strokeWidth={2.5} />3 disponibles
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <UserItem
            key={i}
            actions={
              <Button
                variant="ghost"
                size="icon-sm"
                className="rounded-full bg-blue-100 hover:bg-blue-300 dark:bg-blue-300 dark:hover:bg-blue-400"
              >
                <GlassWater
                  size={12}
                  strokeWidth={2.5}
                  className="text-blue-600 dark:text-blue-800"
                />
              </Button>
            }
          />
        ))}
      </CardContent>
    </Card>
  );
};

const ExpireSoonCard: React.FC = () => {
  return (
    <Card className="py-0 gap-0">
      <CardHeader className="px-0">
        <CardTitle className="flex justify-between items-center py-2 px-4 text-xs uppercase font-medium text-gray-500 bg-neutral-50 dark:bg-card dark:text-gray-100">
          <span>Membresías vencidas/por vencer</span>
          <Badge className="bg-gray-200 text-black rounded-sm">3</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <UserItem
            key={i}
            actions={
              <>
                <ExpireDate date={new Date()} />
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full text-black dark:text-white"
                >
                  <MessageCircle size={12} strokeWidth={2.5} />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full hover:bg-green-100 dark:hover:bg-green-100"
                >
                  <RefreshCcw
                    size={12}
                    strokeWidth={2.5}
                    className="text-green-500 dark:text-green-600"
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-full hover:bg-red-100 dark:hover:bg-red-100"
                >
                  <X
                    size={12}
                    strokeWidth={2.5}
                    className="text-red-500 dark:text-red-600"
                  />
                </Button>
              </>
            }
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardPage;

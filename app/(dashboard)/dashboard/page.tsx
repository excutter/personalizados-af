import ExpireDate from "@/components/expire-date";
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
    <div className="w-full">
      <h1 className="text-2xl font-bold dark:text-white">
        {getDayPeriod({ date: currentDate })}, Angel
      </h1>
      <h2 className="text-xl text-gray-500 font-semibold">
        {formatDate({ date: currentDate })}
      </h2>
      <div className="columns-2 md:columns-2 sm:columns-1 gap-4 mt-6">
        <InThisMomentCard />
        <ExpireSoonCard />
      </div>
    </div>
  );
};

const InThisMomentCard: React.FC = () => {
  return (
    <Card className="py-0 gap-3">
      <CardHeader className="px-0">
        <CardTitle className="py-2 px-4 text-xs uppercase font-medium text-gray-500 bg-gray-100">
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
              className="rounded-full text-black"
            >
              <Plus strokeWidth={3} />
            </Button>
          </div>
          <div className="flex items-center gap-4">
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
                className="rounded-full bg-blue-100 hover:bg-blue-300"
              >
                <GlassWater
                  size={12}
                  strokeWidth={2.5}
                  className="text-blue-600"
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
        <CardTitle className="flex justify-between items-center py-2 px-4 text-xs uppercase font-medium text-gray-500 bg-gray-100">
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
                  variant="secondary"
                  size="icon-sm"
                  className="rounded-full"
                >
                  <MessageCircle size={12} strokeWidth={2.5} />
                </Button>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="rounded-full hover:bg-green-100"
                >
                  <RefreshCcw
                    size={12}
                    strokeWidth={2.5}
                    className="text-green-500"
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="icon-sm"
                  className="rounded-full hover:bg-red-100"
                >
                  <X size={12} strokeWidth={2.5} className="text-red-500" />
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

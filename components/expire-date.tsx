import { formatDate } from "@/lib/date-utils";

type Status = "active" | "expired" | "expiring_soon";

const ExpireDate = ({ date }: { date: Date }) => {
  const getStatus = (): Status => {
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < 0) {
      return "expired";
    } else if (daysDiff <= 7) {
      return "expiring_soon";
    } else {
      return "active";
    }
  };
  const status = getStatus();
  const statusClasses: { [key in Status]: string } = {
    active:
      "bg-green-100 text-green-800 border-green-500 dark:bg-green-200 dark:text-green-900 dark:border-green-600",
    expired:
      "bg-red-100 text-red-900 border-red-500 dark:bg-red-200 dark:text-red-900 dark:border-red-600",
    expiring_soon:
      "bg-yellow-100 text-yellow-800 border-yellow-500 dark:bg-yellow-200 dark:text-yellow-900 dark:border-yellow-600",
  };

  return (
    <div
      className={`w-fit min-w-25 py-0.5 px-3 rounded-sm text-sm border ${statusClasses[status]}`}
    >
      {formatDate({ date, format: "P" })}
    </div>
  );
};

export default ExpireDate;

type Status = "active" | "expired" | "expiring_soon";

const ExpireDate = ({ date, status }: { date: Date; status: Status }) => {
  const statusClasses: { [key in Status]: string } = {
    active: "bg-green-100 text-green-800 border-green-500",
    expired: "bg-red-100 text-red-900 border-red-500",
    expiring_soon: "bg-yellow-100 text-yellow-800 border-yellow-500",
  };

  return (
    <div
      className={`py-0.5 px-3 rounded-sm text-sm border ${statusClasses[status]}`}
    >
      {date.toLocaleDateString("es-MX")}
    </div>
  );
};

export default ExpireDate;

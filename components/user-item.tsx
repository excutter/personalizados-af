import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserItemProps = {
  name?: string;
  avatarUrl?: string;
  actions?: React.ReactNode;
};

const UserItem: React.FC<UserItemProps> = async ({
  name = "Alumno",
  avatarUrl = "https://github.com/shadcn.png",
  actions,
}) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-b border-b-gray-200 last:border-0 dark:border-b-gray-800">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>
          <User size={16} strokeWidth={2.5} />
        </AvatarFallback>
      </Avatar>
      <p className="text-sm text-black dark:text-white">{name}</p>
      {actions && (
        <div className="flex items-center gap-2 ml-auto">{actions}</div>
      )}
    </div>
  );
};

export default UserItem;

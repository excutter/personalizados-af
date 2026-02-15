import { User } from "@/types/User";

const getInitials = (user: User) => {
    const names = `${user.name} ${user.lastName}`.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.toUpperCase().slice(0, 2);
  };

  export { getInitials };
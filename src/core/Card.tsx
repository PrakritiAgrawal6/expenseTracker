import { ReactNode } from "react";

const UserCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[300px] overflow-hidden border border-gray-400">
      {children}
    </div>
  );
};

export default UserCard;

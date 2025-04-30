import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { IStore } from "../interfaces/store";

const ProtectedRoute: React.FC = () => {
  const { data: currentUser } = useSelector((store: IStore) => store.user);

  if (!currentUser?.email) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoute;

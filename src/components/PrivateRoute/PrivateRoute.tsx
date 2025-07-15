import { Navigate, Outlet } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuth, isAuthLoading } = useAuth();
  if (isAuthLoading) {
    return <>Loading</>;
  }

  return isAuth ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoute;

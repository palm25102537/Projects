import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = () => {
  const { state } = useAuth();
  return state.authen ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

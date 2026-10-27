import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/Auth/AuthContext";

const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

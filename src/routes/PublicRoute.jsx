import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { authenticated } = useAuth();

  return authenticated ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    children
  );
};

export default PublicRoute;
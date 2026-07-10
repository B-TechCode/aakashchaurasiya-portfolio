import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuth();

  return authenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
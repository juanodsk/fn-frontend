import { Navigate, Outlet } from "react-router";
import { useAuth } from "./context/AuthContext";
function ProtectedRoutes() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;
  return <Outlet />;
}

export default ProtectedRoutes;

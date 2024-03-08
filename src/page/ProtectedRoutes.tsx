import {  useAuth } from "@/context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
export type TSession = {
  isAuthenticated: boolean | undefined,
  sessionId: string | undefined,
}

const ProtectedRoutes = () => {
  const { state } = useAuth();
  const location = useLocation();
  return state.isAuthenticated  ? <Outlet context={state.isAuthenticated}  /> : <Navigate to="/auth/login" state={{from:location}}  replace />;
}
export default ProtectedRoutes
import {  useAuth } from "@/context/AuthContext";

import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRoutes = () => {
  const {state} = useAuth()
  const location = useLocation();
  return state.isAuthenticated  ? <Outlet context={state.isAuthenticated}  /> : <Navigate to="/auth/login" state={{from:location}}  replace />;
}
export default ProtectedRoutes
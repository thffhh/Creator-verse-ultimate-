import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { CircularProgress, Box } from "@mui/material";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Box sx={{p:4,display:"flex",justifyContent:"center"}}><CircularProgress/></Box>;
  return user ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

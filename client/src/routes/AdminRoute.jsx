import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert, Box } from "@mui/material";

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) return <Box sx={{p:4}}>Loading...</Box>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin()) return <Box sx={{p:4}}><Alert severity="error">🔒 Admin only</Alert></Box>;
  return children;
}

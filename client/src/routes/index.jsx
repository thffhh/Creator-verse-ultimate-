import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/admin/Dashboard";
import AIControl from "../pages/admin/AIControl";
import Feed from "../pages/dashboard/Feed";
import TeacherApply from "../pages/teacher/Apply";

export default createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <ProtectedRoute><Feed /></ProtectedRoute> },
  { path: "/apply-teacher", element: <ProtectedRoute><TeacherApply /></ProtectedRoute> },
  { path: "/admin", element: <AdminRoute><Dashboard /></AdminRoute> },
  { path: "/admin/ai", element: <AdminRoute><AIControl /></AdminRoute> },
  { path: "*", element: <Navigate to="/dashboard" replace /> }
]);

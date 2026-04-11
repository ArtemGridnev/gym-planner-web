import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../features/auth/context/AuthProvider";
import { Box } from "@mui/material";

export default function ProtectedRoute() {
    const { user, loading } = useAuthContext();

    if (loading) return <Box>Loading...</Box>;

    if (!user) return <Navigate to="/login" />;

    return <Outlet />;
}
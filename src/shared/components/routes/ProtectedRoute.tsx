import { Outlet } from "react-router-dom";
import { useAuthContext } from "../../../features/auth/context/AuthProvider";
import LoginPage from "../../../features/auth/components/Login";
import { Box } from "@mui/material";

export default function ProtectedRoute() {
    const { user, loading } = useAuthContext();

    if (loading) return <Box>Loading...</Box>;

    if (!user) return <LoginPage />;

    return <Outlet />;
}
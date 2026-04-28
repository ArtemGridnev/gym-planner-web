import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../../features/auth/context/AuthProvider";
import SplashScreen from "../layout/SplashScreen";
import useDelayedVisibility from "../../hooks/useDelayedVisibility";

export default function PublicRoute() {
    const { user, loading } = useAuthContext();
    const showSplash = useDelayedVisibility(loading, 200);

    if (loading && showSplash) return <SplashScreen />;
    if (loading) return null;

    if (user) return <Navigate to="/managment/trains" />

    return <Outlet />;
}
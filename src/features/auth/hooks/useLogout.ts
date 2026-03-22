import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export default function useLogout() {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    return async () => {
        await logout();
        navigate('/login', { replace: true });
    };
}
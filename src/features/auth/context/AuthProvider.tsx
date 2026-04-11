import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { User } from "../../users/types/user"
import { logout as logoutService } from "../services/authService";
import { getCurrentUser } from "../../users/services/usersService";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthProvider({ children } : { children: React.ReactNode }) {
    const [ user, setUser ] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const userRef = useRef<User | null>(null);

    const queryClient = useQueryClient();

    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const clearAuthData = () => {
        queryClient.clear();
        setUser(null);
    };

    const logout = async () => {
        try {
            await logoutService();

            clearAuthData();
            localStorage.setItem('logout', Date.now().toString());
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUser = async () => {
        try {
            const user = await getCurrentUser();
          
            setUser(user);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const handleStorage = (e: StorageEvent) => {
        if (e.newValue === e.oldValue) return;

        if (e.key === "logout") {
            clearAuthData();
        } 
        
        // else if (e.key === "login") {
        //     if (!userRef.current) {
        //         fetchUser();
        //     }
        // } 
    };

    useEffect(() => {
        fetchUser();

        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <AuthContext value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) throw new Error("useAuthContext must be used inside AuthProvider");

    return context;
}


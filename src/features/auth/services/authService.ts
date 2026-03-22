import api from '../../../shared/api/apiClient.ts';

export const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

type RegisterData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

export const register = async (data: RegisterData) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

export const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};
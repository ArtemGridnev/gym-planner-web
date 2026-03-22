import api from '../../../shared/api/apiClient.ts';

export const getCurrentUser = async () => {
    const response = await api.get("/users/me");
    return response.data;
};
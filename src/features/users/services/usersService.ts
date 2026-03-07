import api from '../../../shared/api/apiClient.ts';
import { handleApiError } from '../../../shared/utils/handleApiError.ts';

export const getCurrentUser = async () => {
    try {
        const response = await api.get("/users/me");
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
};
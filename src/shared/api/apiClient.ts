import axios from "axios";

export type ApiError = {
  message: string;
  statusCode?: number;
  error?: string;
};

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message ?? error.message ?? "Request failed",
        statusCode: error.response?.data?.statusCode ?? error.response?.status,
        error: error.response?.data?.error,
      } satisfies ApiError;
    }

    throw {
      message: "Unexpected error",
    } satisfies ApiError;
  }
);

export default api;
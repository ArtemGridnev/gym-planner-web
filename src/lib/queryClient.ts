import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                console.log('error', error.response);

                if (error?.response?.status === 404) {
                    return false;
                }

                return failureCount < 3;
            },
        },
    },
});
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: (failureCount, error: any) => {
                console.log('error', error);

                if (error?.statusCode === 404) {
                    return false;
                }

                return failureCount < 3;
            },
        },
    },
});
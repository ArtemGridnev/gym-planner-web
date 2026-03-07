import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

export function renderHookWithQueryClient(hook: () => any) {
    const Wrapper = ({ children }: { children: React.ReactNode }) => {
        const queryClient = new QueryClient({
            defaultOptions: {
                queries: {
                    retry: false,
                },
            },
        });

        return (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        );
    };

    return renderHook(hook, { wrapper: Wrapper });
}
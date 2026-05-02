import { Box } from "@mui/material";
import AlertsStack from "../alerts/AlertsStack";
import ListNoDataMessage from "./ListNoDataMessage";

type InfiniteListStateProps = {
    isInitialLoading: boolean;
    isFetchingNextPage?: boolean;
    hasNextPage?: boolean;
    loadMoreRef?: React.RefObject<HTMLDivElement | null>;
    errors?: string[];
    isEmpty: boolean;
    skeleton: React.ReactNode;
    emptyMessage?: string;
    children: React.ReactNode;
};

export default function InfiniteListState({
    isInitialLoading,
    isFetchingNextPage,
    hasNextPage,
    loadMoreRef,
    errors,
    isEmpty,
    skeleton,
    emptyMessage = "No items here… yet.",
    children,
}: InfiniteListStateProps) {
    return (
        <Box 
            sx={{ 
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            {errors && errors.length > 0 && (
                <AlertsStack alerts={errors.map(e => ({ message: e, severity: 'error' }))} />
            )}

            {isInitialLoading && skeleton}

            {!isInitialLoading && isEmpty && (
                <ListNoDataMessage message={emptyMessage} />
            )}

            {!isInitialLoading && !isEmpty && children}

            {!isInitialLoading && !isEmpty && hasNextPage && (
                isFetchingNextPage ? skeleton : (
                    <Box ref={loadMoreRef} sx={{ height: 1 }} />
                )
            )}
        </Box>
    );
}
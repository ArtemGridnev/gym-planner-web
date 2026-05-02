import { Box } from "@mui/material";
import AlertsStack from "../alerts/AlertsStack";
import ListNoDataMessage from "./ListNoDataMessage";

type ListStateProps = {
    errors?: string[];
    emptyMessage?: string;
    isLoading: boolean;
    skeleton: React.ReactNode;
    children: React.ReactNode;
    isEmpty: boolean;
};

export default function ListState({
    errors,
    emptyMessage = "No items here… yet.",
    isLoading,
    skeleton,
    children,
    isEmpty,
}: ListStateProps) {
    return (
        <Box>
            {errors && errors.length > 0 && (
                <AlertsStack 
                    alerts={errors.map(e => ({ message: e, severity: 'error' }))} 
                    sx={{ marginBottom: 2 }}
                />
            )}
            
            {!isLoading && isEmpty && (<ListNoDataMessage message={emptyMessage} />)}

            {isLoading && skeleton}
            
            {!isLoading && !isEmpty && children}
        </Box>
    );
}
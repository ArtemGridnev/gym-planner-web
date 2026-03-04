import { Alert, Stack, type StackProps } from "@mui/material";

type AlertsProps = StackProps &{
    success?: string | null;
    error?: string | null;
};

export default function Alerts({ success = null, error = null, sx, ...props }: AlertsProps) {
    return (
        <>
            {(success || error) &&
                <Stack 
                    spacing={1} 
                    {...props}
                    sx={{ 
                        "& .MuiAlert-message": {
                            whiteSpace: "pre-wrap"
                        },
                        ...sx
                    }} 
                >
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Stack>
            }
        </>
    );
}
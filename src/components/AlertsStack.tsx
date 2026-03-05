import { Alert, type AlertProps as MUIAlertProps, Stack, type StackProps } from "@mui/material";

type AlertProps = {
    message: string;
    severity: MUIAlertProps["severity"];
}

type AlertsProps = StackProps & {
    alerts: AlertProps[];
};

export default function AlertsStack({ alerts, sx, ...props }: AlertsProps) {
    return (
        <>
            {(alerts.length > 0) &&
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
                    {alerts.map((alert, index) => (
                        <Alert key={index} severity={alert.severity}>
                            {alert.message}
                        </Alert>
                    ))}
                </Stack>
            }
        </>
    );
}
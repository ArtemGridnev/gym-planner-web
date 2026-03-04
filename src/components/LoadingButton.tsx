import { Button, CircularProgress, type ButtonProps } from "@mui/material";

type LoadingButtonProps = ButtonProps & {
    isLoading?: boolean;
    children: React.ReactNode;
}

export default function LoadingButton({ isLoading, children, ...props }: LoadingButtonProps) {
    return (
        <Button {...props} disabled={isLoading || props.disabled} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            {children}
            {isLoading && (
                <CircularProgress 
                    size={16} 
                    color="inherit" 
                    sx={{ position: 'absolute', right: 10 }}
                />
            )}
        </Button>
    );
}
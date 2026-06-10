import { Box, type BoxProps } from "@mui/material";

export default function DataCardBase({
    children,
    sx,
    ...props
}: BoxProps) {
    return (
        <Box
            sx={{
                overflow: 'hidden',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                bgcolor: 'background.paper',
                ...sx,
            }}
            {...props}
        >
            {children}
        </Box>
    );
}

import { Box, type BoxProps } from "@mui/material";

type ToolbarProps = BoxProps;

export default function Toolbar({ children, sx, ...props }: ToolbarProps) {
    return (
        <Box
            sx={{
                position: 'sticky',
                display: 'flex',
                background: 'white',
                px: 2,
                py: 1,
                gap: 2,
                top: 0,
                left: 0,
                zIndex: 1,
                flexShrink: 0,
                ...(sx || {})
            }}
            {...props}
        >
            {children}
        </Box>
    );
}
import { Box, type BoxProps } from "@mui/material";

export default function DataCardListBase({ children, ...props }: BoxProps) {
    return (
        <Box 
            sx={{
                containerName: 'CardListContainer',
                containerType: 'inline-size'
            }}
            {...props}
        >
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    '@container CardListContainer (max-width: 1200px)': {
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    },
                    '@container CardListContainer (max-width: 700px)': {
                        gridTemplateColumns: '1fr',
                    },
                }}
            >
                {children}
            </Box>
        </Box>
    );
}
import { Box } from "@mui/material";

type ContentCardProps = {
    children: React.ReactNode;
    width?: string;
};

export default function ContentCard({ children, width = '100%' }: ContentCardProps) {
    return (
        <Box 
            sx={{ 
                display: 'flex',
                width,
                height: '100%',
                background: 'white',
                borderRadius: 3,
                flexDirection: 'column'
            }}
        >
            {children}
        </Box>
    );
}
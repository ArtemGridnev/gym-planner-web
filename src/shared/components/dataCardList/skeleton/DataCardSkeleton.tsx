import { Box, Skeleton, Typography } from "@mui/material";

import { getRandomInt } from "../../../utils/random";
import DataCardBase from "../DataCardBase";

export type DataCardProps = {
    icon?: boolean;
    children?: React.ReactNode;
    menuItems?: boolean;
};

export default function DataCardSkeleton({ icon, children, menuItems }: DataCardProps) {
    return (
        <DataCardBase data-testid="card-data-skeleton">
            {icon && (
                <Skeleton 
                    variant="circular"  
                    sx={{
                        width: 24,
                        height: 24,
                    }}
                />
            )}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <Skeleton sx={{
                        width: `${getRandomInt(25, 50)}%`
                    }} />
                </Typography>
                {children}
            </Box>
            {menuItems && (
                <Skeleton 
                    variant="circular"  
                    sx={{
                        width: 32,
                        height: 32,
                    }}
                />
            )}
        </DataCardBase>
    );
}
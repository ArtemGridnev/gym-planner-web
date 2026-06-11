import { Box, Skeleton } from "@mui/material";
import DataCardBase from "../DataCardBase";
import { getRandomInt } from "../../../utils/random";

export type DataCardSkeletonProps = {
    icon?: boolean;
    chip?: boolean;
    children?: React.ReactNode;
    menuItems?: boolean;
};

export default function DataCardSkeleton({ icon, chip, children, menuItems }: DataCardSkeletonProps) {
    return (
        <DataCardBase data-testid="card-data-skeleton">
            <Box sx={{ display: 'flex', height: '100%' }}>
                <Box sx={{ width: '3px', bgcolor: 'grey.200', flexShrink: 0 }} />
                <Box sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0.75,
                    p: '13px 13px 13px 16px',
                    minWidth: 0,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, minWidth: 0 }}>
                            {icon && (
                                <Skeleton variant="circular" sx={{ width: 18, height: 18, flexShrink: 0 }} />
                            )}
                            <Skeleton variant="text" width={`${getRandomInt(25, 50)}%`} sx={{ fontSize: '1rem', flex: '0 1 auto' }} />
                            {chip && (
                                <Skeleton variant="rounded" width={54} height={20} sx={{ borderRadius: 1, flexShrink: 0 }} />
                            )}
                        </Box>
                        {menuItems && (
                            <Skeleton variant="circular" sx={{ width: 28, height: 28, flexShrink: 0 }} />
                        )}
                    </Box>
                    {children}
                </Box>
            </Box>
        </DataCardBase>
    );
}

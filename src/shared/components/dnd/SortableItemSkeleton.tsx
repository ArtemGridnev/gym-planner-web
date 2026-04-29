import { Box, Skeleton } from '@mui/material';
import type { ReactNode } from 'react';

type SortableItemProps = {
    children: ReactNode
};

export function SortableItemSkeleton({ children }: SortableItemProps) {

  return (
    <Box 
        sx={{
            position: 'relative',
            display: 'flex',
            gap: 1,
            alignItems: 'center'
        }} 
    >
        <Box>
            <Skeleton 
                variant="rectangular"
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 1,
                }} 
            />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
            {children}
        </Box>
    </Box>
  );
}
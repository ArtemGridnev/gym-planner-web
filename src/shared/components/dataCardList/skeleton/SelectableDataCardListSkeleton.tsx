import { Box, Skeleton, type BoxProps } from "@mui/material";
import DataCardListItemSkeleton from "./DataCardListItemSkeleton";

type SelectableDataCardListSkeletonProps = BoxProps &{
    columns: number | { min: number, max: number };
    rows: number;
    icon?: boolean;
    menuItems?: boolean;
};

export default function SelectableDataCardListSkeleton({ columns, rows, icon, menuItems, ...props }: SelectableDataCardListSkeletonProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column'
            }}
            {...props}
        >
            {Array.from({ length: rows }).map((_, index) => (
                <Box 
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ padding: 1 }}>
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
                        <DataCardListItemSkeleton columns={columns} key={index} icon={icon} menuItems={menuItems} />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
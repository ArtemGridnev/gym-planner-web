import { Box, type BoxProps } from "@mui/material";
import DataCardListItemSkeleton from "./DataCardListItemSkeleton";
import SelectableDataCardWrapSkeleton from "./SelectableDataCardWrapSkeleton";

type SelectableDataCardListSkeletonProps = BoxProps & {
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
                <SelectableDataCardWrapSkeleton key={index}>
                    <DataCardListItemSkeleton columns={columns} icon={icon} menuItems={menuItems} />
                </SelectableDataCardWrapSkeleton>
            ))}
        </Box>
    );
}
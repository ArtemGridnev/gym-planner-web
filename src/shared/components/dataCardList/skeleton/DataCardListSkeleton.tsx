import { type BoxProps } from "@mui/material";
import DataCardListItemSkeleton from "./DataCardListItemSkeleton";
import DataCardListBase from "../DataCardListBase";

export type DataCardListSkeletonProps = BoxProps &{
    columns: number | { min: number, max: number };
    rows: number;
    icon?: boolean;
    menuItems?: boolean;
};

export default function DataCardListSkeleton({ columns, rows, icon, menuItems, ...props }: DataCardListSkeletonProps) {
    return (
        <DataCardListBase {...props}>
            {Array.from({ length: rows }).map((_, index) => (
                <DataCardListItemSkeleton columns={columns} key={index} icon={icon} menuItems={menuItems} />
            ))}
        </DataCardListBase>
    );
}
import { type BoxProps } from "@mui/material";
import DataCardListItem from "./DataCardListItem";
import type { DataCardProps } from "./DataCard";
import DataCardListBase from "./DataCardListBase";

export type DataCardListColumnProps = {
    field: string;
    name?: string;
    fullWidth?: boolean;
};

export type DataCardListRowProps = DataCardProps & {
    data: Record<string, null | string | number>;
};

export type DataCardListProps = BoxProps & {
    columns: DataCardListColumnProps[];
    rows: DataCardListRowProps[];
};

export default function DataCardList({ columns, rows, ...props }: DataCardListProps) {
    return (
        <>
            <DataCardListBase {...props}>
                {rows.map((row, index) => (
                    <DataCardListItem data-testid="" columns={columns} row={row} key={index} />
                ))}
            </DataCardListBase>
        </>
    );
}
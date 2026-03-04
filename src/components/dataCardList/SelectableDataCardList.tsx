import type { DataCardListProps, DataCardListRowProps } from "./DataCardList";
import DataCardListItem from "./DataCardListItem";
import { Box, Checkbox, Typography } from "@mui/material";

export type SelectableDataCardListRowProps = DataCardListRowProps & {
    id: string
};

export type SelectableDataCardListProps = Omit<DataCardListProps, 'rows' | 'onChange'> & {
    rows: SelectableDataCardListRowProps[];
    selected: string[];
    onChange: (id: string, checked: boolean) => void;
};

export default function SelectableDataCardList({ columns, rows, selected, onChange, noDataMessage = "No items here… yet.", ...props }: SelectableDataCardListProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'column'
            }}
            {...props}
        >
            {rows.length === 0 && <Typography variant="h6" sx={{ textAlign: 'center'}}>{noDataMessage}</Typography>}
            {rows.map((row) => (
                <Box 
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                    }}
                    key={row.id}
                >
                    <Checkbox 
                        value={row.id} 
                        checked={selected.includes(row.id)}
                        onChange={(e) => onChange(row.id, e.target.checked)} 
                        slotProps={{ 
                            input: { 'aria-label': `Select Card ${row.id}` } 
                        }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <DataCardListItem columns={columns} row={row} />
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
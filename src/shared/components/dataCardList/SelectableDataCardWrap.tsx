import { Box, Checkbox } from "@mui/material";
import type { ReactNode } from "react";

type SelectableDataCardWrapProps = {
    value: string;
    checked: boolean;
    label?: string;
    onChange: (checked: boolean) => void;
    children: ReactNode;
};

export default function SelectableDataCardWrap({ value, checked, label, onChange, children }: SelectableDataCardWrapProps) {
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'flex',
                gap: 1,
                alignItems: 'center',
            }}
        >
            <Checkbox
                value={value}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                slotProps={{
                    input: { 'aria-label': label ?? `Select ${value}` }
                }}
            />
            <Box sx={{ flexGrow: 1 }}>
                {children}
            </Box>
        </Box>
    );
}

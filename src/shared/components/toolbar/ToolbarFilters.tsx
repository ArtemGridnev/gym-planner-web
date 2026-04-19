import { Box, CircularProgress, InputAdornment, type BoxProps } from "@mui/material";
import type { FilterFieldSchema } from "../../types/filter/filterFieldSchema";
import FilterField from "../filters/FilterField";
import { SearchOutlined } from "@mui/icons-material";

type ToolbarFiltersProps = BoxProps & {
    fields: FilterFieldSchema[];
    filters: Record<string, string>;
    handleChange: (field: string, value: string) => void,
    isLoading?: boolean
};

export default function ToolbarFilters({
    fields,
    filters,
    handleChange,
    sx,
    ...props
}: ToolbarFiltersProps) {
    return (
        <Box
            sx={{
                display: "flex",
                width: '100%',
                minHeight: 32,
                gap: 2,
                flexWrap: 'wrap',
                ...sx
            }}
            {...props}
        >
            {fields.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                fields.map((field, index) => (
                    <FilterField
                        {...{
                            ...field,
                            value: filters[field.name],
                            onChange: handleChange
                        }} 
                        key={index}
                        textFieldProps={{
                            placeholder: field.label,
                            variant: 'outlined',
                            size: 'small',
                            ...(field.type === 'search' ? {
                                slotProps: {
                                    input: {
                                        endAdornment: <InputAdornment position="end"><SearchOutlined /></InputAdornment> 
                                    }
                                }
                            } : {}),
                            sx: {
                                width: { xs: '100%', sm: 'auto' },
                            }
                        }}
                    ></FilterField>
                ))
            )}
        </Box>
    );
}
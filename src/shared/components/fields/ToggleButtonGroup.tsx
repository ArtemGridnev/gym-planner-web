import {
    FormControl,
    FormHelperText,
    FormLabel,
    ToggleButtonGroup as MuiToggleButtonGroup,
    type ToggleButtonGroupProps as MuiToggleButtonGroupProps,
    ToggleButton,
} from "@mui/material";
import type { BaseFieldProps } from "../../types/field/baseFieldProps";

type ToggleButtonGroupOption = {
    value: string;
    name: string;
};

type ToggleButtonGroupProps = BaseFieldProps<string[]> & {
    options: ToggleButtonGroupOption[];
} & Omit<
    MuiToggleButtonGroupProps,
    "value" | "onChange" | "exclusive"
>;

export default function ToggleButtonGroup({
    name,
    label,
    options,
    value,
    onChange,
    onBlur,
    disabled,
    error,
    helperText,
    ...props
}: ToggleButtonGroupProps) {
    return (
        <FormControl fullWidth error={error} disabled={disabled} sx={{ mb: 2 }}>
            {label && <FormLabel sx={{ mb: 1 }}>{label}</FormLabel>}

            <MuiToggleButtonGroup
                {...props}
                value={value}
                onChange={(_, values: string[]) => {
                    onChange(values ?? []);
                    onBlur?.();
                }}
                onBlur={onBlur}
                size="small"
                sx={{
                    flexWrap: "wrap",
                    ...props.sx,
                }}
            >
                {options.map((option) => (
                    <ToggleButton
                        key={option.value}
                        value={option.value}
                        sx={{ px: 2 }}
                        aria-label={option.name}
                    >
                        {option.name}
                    </ToggleButton>
                ))}
            </MuiToggleButtonGroup>

            {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
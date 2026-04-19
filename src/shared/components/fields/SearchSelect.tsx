import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import type { SearchSelectOption } from "../../types/form/formFieldSchema";
import type { BaseFieldProps } from "../../types/field/baseFieldProps";
import type { FieldTextUiProps } from "../../types/field/fieldTextUiProps";

type SearchSelectProps =
    BaseFieldProps<number | null> &  {
        options: SearchSelectOption[];
        textFieldProps?: FieldTextUiProps;
    };

export default function SearchSelect({ 
    value,
    onChange,
    onBlur,
    options,
    textFieldProps,
    name,
    label,
    required,
    disabled,
    error,
    helperText,
    ...props
 }: SearchSelectProps) {
    const selectedOption = useMemo(
        () =>
            value
                ? options.find((option) => option.id === value) ?? null
                : null,
        [options, value]
    );

    const handleChange = (
        _: React.SyntheticEvent,
        option: SearchSelectOption | null
    ) => {
        onChange(option ? option.id : null);
    };

    return (
        <Autocomplete<SearchSelectOption>
            {...props}
            disablePortal
            options={options}
            onChange={handleChange}
            value={selectedOption}
            disabled={disabled}
            onBlur={onBlur}
            renderInput={(params) => (
                <TextField 
                    {...params}
                    {...textFieldProps}
                    name={name}
                    label={label}
                    required={required}
                    error={error}
                    helperText={helperText}
                />
            )}
        />
    );
}

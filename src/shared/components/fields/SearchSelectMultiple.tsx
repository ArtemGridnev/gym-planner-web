import {
  Autocomplete,
  Chip,
  TextField,
} from "@mui/material";
import { useMemo } from "react";
import type { SearchSelectOption } from "../../types/form/formFieldSchema";
import type { BaseFieldProps } from "../../types/field/baseFieldProps";
import type { FieldTextUiProps } from "../../types/field/fieldTextUiProps";

type SearchSelectMultipleProps =
  BaseFieldProps<string[]> & {
    options: SearchSelectOption[];
    textFieldProps?: FieldTextUiProps;
  };

export default function SearchSelectMultiple({
  value,
  onChange,
  onBlur,
  options,
  textFieldProps,
  ...props
}: SearchSelectMultipleProps) {
  const selectedOptions = useMemo(
    () => options.filter((option) => value.includes(option.id.toString())),
    [options, value]
  );

  return (
    <Autocomplete<SearchSelectOption, true, false, false>
      {...props}
      multiple
      options={options}
      value={selectedOptions}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      onChange={(_, selected) => onChange(selected.map((option) => option.id.toString()))}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          name={props.name}
          label={props.label}
          required={props.required}
          disabled={props.disabled}
          error={props.error}
          helperText={props.helperText}
          onBlur={onBlur}
        />
      )}
      renderValue={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option.id}
            label={option.label}
            size={textFieldProps?.size || "medium"}
          />
        ))
      }
      sx={{
        "& .MuiAutocomplete-input": {
          width: "auto !important",
        },
      }}
    />
  );
}
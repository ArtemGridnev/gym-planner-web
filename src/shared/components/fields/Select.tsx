import { MenuItem, TextField } from "@mui/material";
import type { SelectOption } from "../../types/form/formFieldSchema";
import type { BaseFieldProps } from "../../types/field/baseFieldProps";
import type { FieldTextUiProps } from "../../types/field/fieldTextUiProps";

type SelectFieldProps =
  BaseFieldProps<string> & {
    options: SelectOption[];
    textFieldProps?: FieldTextUiProps;
  };

export default function Select({
  value,
  onChange,
  onBlur,
  options,
  textFieldProps,
  ...props
}: SelectFieldProps) {
  return (
    <TextField
      {...textFieldProps}
      {...props}
      select
      value={value ?? ""}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
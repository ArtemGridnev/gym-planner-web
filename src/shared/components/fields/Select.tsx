import { MenuItem, TextField, type TextFieldProps } from "@mui/material";
import type { SelectOption } from "../../types/form/formFieldSchema";
import type { BaseFieldProps } from "../../types/baseFieldProps";

type SelectFieldProps =
  BaseFieldProps<string> &
  Omit<TextFieldProps, "value" | "onChange" | "select" | "type" | "children"> & {
    options: SelectOption[];
  };

export default function Select({
  value,
  onChange,
  onBlur,
  options,
  ...props
}: SelectFieldProps) {
  return (
    <TextField
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
import { TextField } from "@mui/material";
import type { InputLikeFieldProps } from "../../types/field/baseFieldProps";
import type { FieldTextUiProps } from "../../types/field/fieldTextUiProps";

type TextareaFieldProps =
  InputLikeFieldProps<string> & {
    minRows?: number;
    maxRows?: number;
    textFieldProps?: FieldTextUiProps;
  };

export default function TextareaField({
  value,
  onChange,
  onBlur,
  minRows = 4.5,
  maxRows = 6,
  textFieldProps,
  ...props
}: TextareaFieldProps) {
  return (
    <TextField
      {...textFieldProps}
      {...props}
      multiline
      value={value ?? ""}
      minRows={minRows}
      maxRows={maxRows}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
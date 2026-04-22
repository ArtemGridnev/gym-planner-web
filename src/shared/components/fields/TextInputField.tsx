import { TextField, type TextFieldProps } from "@mui/material";
import type { InputLikeFieldProps } from "../../types/field/baseFieldProps";

type TextInputFieldProps =
  InputLikeFieldProps<string> & {
    type?: "text" | "email";
    textFieldProps?: TextFieldProps;
  };

export default function TextInputField({
  value,
  onChange,
  onBlur,
  type = "text",
  textFieldProps,
  ...props
}: TextInputFieldProps) {
  return (
    <TextField
      {...textFieldProps}
      {...props}
      type={type}
      value={value ?? ""}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
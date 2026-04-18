import { TextField, type TextFieldProps } from "@mui/material";

type BaseFieldProps<T> = {
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
};

type TextInputFieldProps =
  BaseFieldProps<string> &
  Omit<TextFieldProps, "value" | "onChange" | "type"> & {
    type?: "text" | "email";
  };

export default function TextInputField({
  value,
  onChange,
  onBlur,
  type = "text",
  ...props
}: TextInputFieldProps) {
  return (
    <TextField
      {...props}
      type={type}
      value={value ?? ""}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
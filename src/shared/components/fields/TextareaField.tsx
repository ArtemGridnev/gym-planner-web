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

type TextareaFieldProps =
  BaseFieldProps<string> &
  Omit<TextFieldProps, "value" | "onChange" | "type" | "multiline"> & {
    minRows?: number;
    maxRows?: number;
  };

export default function TextareaField({
  value,
  onChange,
  onBlur,
  minRows = 4.5,
  maxRows = 6,
  ...props
}: TextareaFieldProps) {
  return (
    <TextField
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
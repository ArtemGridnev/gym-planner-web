import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useState } from "react";
import type { BaseFieldProps } from "../../types/baseFieldProps";

type PasswordFieldProps =
  BaseFieldProps<string> &
  Omit<TextFieldProps, "type" | "value" | "onChange">;

export default function PasswordField({
  value,
  onChange,
  onBlur,
  slotProps,
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      value={value ?? ""}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps?.input,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
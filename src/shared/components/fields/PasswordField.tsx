import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { InputLikeFieldProps } from "../../types/field/baseFieldProps";
import type { FieldTextUiProps } from "../../types/field/fieldTextUiProps";

type PasswordFieldProps =
  InputLikeFieldProps<string> & {
    textFieldProps?: FieldTextUiProps;
  };

export default function PasswordField({
  value,
  onChange,
  onBlur,
  textFieldProps,
  ...props
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      {...textFieldProps}
      {...props}
      type={showPassword ? "text" : "password"}
      value={value ?? ""}
      onBlur={onBlur}
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        ...textFieldProps?.slotProps,
        input: {
          ...textFieldProps?.slotProps?.input,
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
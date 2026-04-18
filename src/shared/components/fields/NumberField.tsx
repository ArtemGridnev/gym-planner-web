import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";
import type { BaseFieldProps } from "../../types/baseFieldProps";

type NumberFieldProps =
  BaseFieldProps<number | undefined> &
  Omit<TextFieldProps, "value" | "onChange" | "type"> & {
    unit?: React.ReactNode;
    step?: number;
  };

export default function NumberField({
  value,
  onChange,
  onBlur,
  unit,
  step,
  ...props
}: NumberFieldProps) {
  return (
    <TextField
      {...props}
      type="number"
      value={value ?? ""}
      onBlur={onBlur}
      onChange={(e) => {
        const v = e.target.value;

        if (v === "") {
          onChange(undefined);
          return;
        }

        const num = Number(v);
        onChange(Number.isNaN(num) ? undefined : num);
      }}
      slotProps={{
        ...props.slotProps,
        input: {
          ...props.slotProps?.input,
          ...(unit && {
            endAdornment: (
              <InputAdornment position="end">{unit}</InputAdornment>
            ),
          }),
        },
        htmlInput: {
          ...props.slotProps?.htmlInput,
          ...(step !== undefined ? { step } : {}),
        },
      }}
    />
  );
}
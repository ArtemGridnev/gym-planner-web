import { InputAdornment, TextField } from "@mui/material";
import type { BaseFieldProps } from "../../types/field/baseFieldProps";
import type { FieldTextUiProps } from "../../types/field/fieldTextUiProps";

type NumberFieldProps = BaseFieldProps<number | undefined> & {
  textFieldProps?: FieldTextUiProps;
  unit?: React.ReactNode;
  step?: number;
};

export default function NumberField({
  value,
  onChange,
  onBlur,
  unit,
  step,
  textFieldProps,
  ...props
}: NumberFieldProps) {
  return (
    <TextField
      {...textFieldProps}
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
        ...textFieldProps?.slotProps,
        input: {
          ...textFieldProps?.slotProps?.input,
          ...(unit && {
            endAdornment: (
              <InputAdornment position="end">{unit}</InputAdornment>
            ),
          }),
        },
        htmlInput: {
          ...textFieldProps?.slotProps?.htmlInput,
          ...(step !== undefined ? { step } : {}),
        },
      }}
    />
  );
}
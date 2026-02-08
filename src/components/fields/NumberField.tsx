import { InputAdornment, TextField, type TextFieldProps } from "@mui/material";

type NumberFieldProps = Omit<TextFieldProps, 'onChange' | 'value' | 'type'> & {
  value?: number;
  onChange?: (value?: number) => void;
  unit?: React.ReactNode;
  slotProps?: TextFieldProps['slotProps'];
};

export default function NumberField({ value, onChange, unit, slotProps, ...props }: NumberFieldProps) {
  console.log('slotProps?.input', slotProps?.input)

  return (
    <TextField
      {...props}
      type="number"
      onChange={(e) => {
        const v = e.target.value;
        onChange?.(v === "" ? undefined : Number(v));
      }}
      value={value ?? ""}
      slotProps={{ 
        ...slotProps,
        input: {
          ...slotProps?.input,
          ...(unit ? { endAdornment: <InputAdornment position="end">{unit}</InputAdornment> } : {})
        }
      }}
    />
  ); 
}
import type { TextFieldProps } from "@mui/material";

export type FieldTextUiProps = Pick<
  TextFieldProps,
  | "placeholder"
  | "variant"
  | "size"
  | "sx"
  | "fullWidth"
  | "margin"
  | "slotProps"
>;
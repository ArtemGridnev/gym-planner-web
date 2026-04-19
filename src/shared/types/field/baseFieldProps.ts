import type { Ref } from "react";

export type BaseFieldProps<T> = {
  name: string;
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  ref?: Ref<HTMLInputElement>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
};
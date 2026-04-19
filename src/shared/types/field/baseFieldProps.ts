export type BaseFieldProps<T> = {
  name: string;
  value: T;
  onChange: (value: T) => void;
  onBlur?: () => void;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
};
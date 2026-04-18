import type { FormFieldSchema } from "../../types/form/formFieldSchema";
import PasswordField from "../fields/PasswordField";
import Select from "../fields/Select";
import SearchSelect from "../fields/SearchSelect";
import NumberField from "../fields/NumberField";
import CronField from "../fields/CronField";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import { Controller, useFormContext } from "react-hook-form";
import TextareaField from "../fields/TextareaField";
import TextInputField from "../fields/TextInputField";

type FormFieldProps = FormFieldSchema & {
  disabled?: boolean;
};

export default function FormField(props: FormFieldProps) {
  const { name, label, rules, type, ...otherProps } = props;
  const { control } = useFormContext();
  const required = rules?.required === true || (typeof rules?.required === 'object' && rules?.required?.value);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => {
        const commonProps = {
          label,
          required,
          error: fieldState.isDirty && !!fieldState?.error,
          helperText: fieldState.isDirty && !!fieldState?.error ? fieldState?.error?.message : undefined,
          ...otherProps,
        };

        switch (type) {
          case "number":
            return <NumberField {...field} {...commonProps} />;
          case "select":
            return <Select {...field} {...commonProps} options={props.options} />;
          case "searchSelect":
            return <SearchSelect {...field} {...commonProps} options={props.options} />;
          case "searchSelectMultiple":
            return <SearchSelectMultiple {...field} {...commonProps} options={props.options} />;
          case "password":
            return <PasswordField {...field} {...commonProps} />;
          case "cron":
            return <CronField {...field} {...commonProps} fields={props.fields} />;
          case "textarea":
            return <TextareaField {...field} {...commonProps} />;
          case "text":
          case "email":
            return <TextInputField {...field} {...commonProps} />;
          default:
            const _exhaustive: never = props;
            return _exhaustive;
        }
      }}
    />
  );
}
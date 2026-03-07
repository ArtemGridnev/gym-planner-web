import type { FormFieldSchema } from "../../types/form/formFieldSchema";
import { TextField } from "@mui/material";
import PasswordField from "../fields/PasswordField";
import Select from "../fields/Select";
import SearchSelect from "../fields/SearchSelect";
import NumberField from "../fields/NumberField";
import CronField from "../fields/CronField";
import SearchSelectMultiple from "../fields/SearchSelectMultiple";
import { Controller, useFormContext } from "react-hook-form";

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
                    error: !!fieldState?.error,
                    helperText: fieldState?.error?.message,
                    ...otherProps,
                };

                switch (type) {
                    case "number":
                        const min = typeof rules?.min === 'number' ? rules.min : (typeof rules?.min === 'object' ? rules.min?.value : undefined); 
                        const max = typeof rules?.max === 'number' ? rules.max : (typeof rules?.max === 'object' ? rules.max?.value : undefined);

                        return (
                            <NumberField 
                                slotProps={{ input: { inputProps: { min, max } } }}
                                {...field} 
                                {...commonProps} 
                            />
                        );
                    case "select":
                        return <Select {...field} {...commonProps} options={props.options} />;
                    case "searchSelect":
                        return (
                            <SearchSelect
                                {...field}
                                {...commonProps}
                                input={commonProps}
                                options={props.options}
                            />
                        );
                    case "searchSelectMultiple":
                        return (
                            <SearchSelectMultiple
                                {...field}
                                input={commonProps}
                                options={props.options}
                            />
                        );
                    case "password":
                        return (
                            <PasswordField
                                {...field}
                                {...commonProps}
                            />
                        );
                    case "cron":
                        return (
                            <CronField
                                {...field}
                                {...props}
                            />
                        );
                    case "textarea":
                        return (
                            <TextField
                                {...field}  
                                {...commonProps}
                                type={type}
                                value={field.value ?? ""}
                                multiline
                                minRows={4.5}
                                maxRows={6}
                            />
                        );
                    case "text":
                    case "email":
                        return (
                            <TextField
                                {...field}
                                {...commonProps}
                                type={type}
                                value={field.value ?? ""}
                            />
                        );
                    default:
                        return <></>;
                }
            }}
        />
    );
}
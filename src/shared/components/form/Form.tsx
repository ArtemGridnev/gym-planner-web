import { Box, type BoxProps } from "@mui/material";
import FormProvider, { type FormProviderProps } from "./FormProvider.tsx";
import LoadingButton from "../LoadingButton.tsx";
import type { FormFieldSchema } from "../../types/form/formFieldSchema.ts";
import FormField from "./FormField.tsx";

export type FormProps = BoxProps &
  Omit<FormProviderProps, "children"> & {
    formFields: FormFieldSchema[];
    submitButtonText: string;
    disabled?: boolean;
    isLoading?: boolean;
  };

export default function Form({ 
    initialValues, 
    onSuccess, 
    formFields, 
    submitButtonText, 
    disabled, 
    isLoading, 
    sx, 
    ...props 
}: FormProps) {
    return (
        <FormProvider 
            initialValues={initialValues}
            onSuccess={onSuccess}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    ...sx
                }}
                {...props}
            >
                {formFields.map((field, index) => (
                    <FormField
                        disabled={disabled}
                        {...field} 
                        key={index}
                    />
                ))} 
                <LoadingButton type="submit" variant="contained" disabled={disabled} isLoading={isLoading}>
                    {submitButtonText}
                </LoadingButton>
            </Box>
        </FormProvider>
    )
}

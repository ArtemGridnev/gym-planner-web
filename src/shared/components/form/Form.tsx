import { Box, type BoxProps } from "@mui/material";
import Alerts from "../Alerts.tsx";
import FormProvider, { type FormProviderProps } from "./FormProvider.tsx";
import LoadingButton from "../LoadingButton.tsx";
import type { FormStates } from "../../hooks/form/useFormController.ts";
import type { FormFieldSchema } from "../../types/form/formFieldSchema.ts";
import FormField from "./FormField.tsx";

export type FormProps = BoxProps & Omit<FormProviderProps, 'children'> & FormStates & {
    formFields: FormFieldSchema[];
    submitButtonText: string;
}; 

export default function Form({ 
    initialValues, 
    onSuccess, 
    formFields, 
    submitButtonText, 
    disabled, 
    isLoading, 
    success, 
    error, 
    sx, 
    ...props 
}: FormProps) {
    return (
        <>
            <Alerts success={success} error={error} sx={{ mb: 2 }} />
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
        </>
    )
}

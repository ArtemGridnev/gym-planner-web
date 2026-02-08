import { Box } from "@mui/material";
import Alerts from "../Alerts.tsx";
import FormField from "./FormField.tsx";
import FormProvider, { type FormProviderProps } from "./FormProvider.tsx";
import LoadingButton from "../LoadingButton.tsx";
import type { FormStates } from "../../hooks/form/useFormController.ts";
import type { FormFieldSchema } from "../../types/form/formFieldSchema.ts";

export type FormProps = Omit<FormProviderProps, 'children'> & FormStates & {
    formFields: FormFieldSchema[];
    submitButtonText: string;
}; 

export default function Form({ initialValues, onSuccess, formFields, submitButtonText, disabled, isLoading, success, error }: FormProps) {
    return (
        <>
            <Alerts success={success} error={error} />
            <FormProvider 
                initialValues={initialValues}
                onSuccess={onSuccess}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    {formFields.map((field, index) => (
                        <FormField 
                            disabled={disabled}
                            {...field} 
                            key={index}
                        ></FormField>
                    ))} 
                    <LoadingButton type="submit" variant="contained" disabled={disabled} isLoading={isLoading}>
                        {submitButtonText}
                    </LoadingButton>
                </Box>
            </FormProvider>
        </>
    )
}

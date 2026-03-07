import { Box } from "@mui/material";
import Form from "../../../../shared/components/form/Form";
import Alerts from "../../../../shared/components/Alerts";
import type { ExerciseFormData } from "../../hooks/useExerciseFormController";
import useExerciseFormFields from "../../hooks/useExerciseFormFields";

export type ExerciseFormProps = {
    initialValues?: ExerciseFormData;
    submitButtonText: string;
    onSuccess: (exercise: ExerciseFormData) => void;
    isLoading?: boolean,
    success?: string | null,
    error?: string | null
};

export default function ExerciseForm({ initialValues, submitButtonText, onSuccess, isLoading, success, error }: ExerciseFormProps) {
    const formFields = useExerciseFormFields();

    return (
        <>
            <Alerts success={success} error={error} />
            <Box>
                <Form 
                    formFields={formFields} 
                    submitButtonText={submitButtonText} 
                    onSuccess={(fieldValues) => { onSuccess(fieldValues as ExerciseFormData) }} 
                    isLoading={isLoading}
                    initialValues={initialValues}
                />
            </Box>
        </>
    )
}

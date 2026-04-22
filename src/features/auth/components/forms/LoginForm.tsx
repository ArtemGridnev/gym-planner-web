import useLogin from "../../hooks/useLogin";
import { useEffect } from "react";
import Form from "../../../../shared/components/form/Form";
import Alerts from "../../../../shared/components/Alerts";

type LoginFormProps = {
    onSuccess: () => void;
};

export default function LoginForm({ onSuccess }: LoginFormProps) {
    const {
        formFields,
        handleSubmit,
        success,
        error,
        isLoading
    } = useLogin();

    useEffect(() => {
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Alerts success={success} error={error} sx={{ mb: 2 }} />
            <Form 
                onSuccess={handleSubmit} 
                formFields={formFields} 
                submitButtonText="Sign in" 
                isLoading={isLoading} 
            />
        </>
    );
}
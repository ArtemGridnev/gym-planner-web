import useRegister from "../../hooks/useRegister";
import Form from "../../../../shared/components/form/Form";
import { useEffect } from "react";
import Alerts from "../../../../shared/components/alerts/Alerts";

type RegisterFormProps = {
    onSuccess: () => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
    const {
        formFields,
        handleSubmit,
        success,
        error,
        loading
    } = useRegister();

    useEffect(() => {
        if (success) onSuccess();
    }, [success]);

    return (
        <>
            <Alerts success={success} error={error} sx={{ mb: 2 }} />
            <Form 
                formFields={formFields} 
                submitButtonText="Sign up" 
                onSuccess={handleSubmit} 
                isLoading={loading} 
            />
        </>
    )
}

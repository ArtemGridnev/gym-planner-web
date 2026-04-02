import type { FormFieldSchema } from "../../../shared/types/form/formFieldSchema";

export const loginFormFields: FormFieldSchema[] = [
    {
        label: "Email",
        name: "email",
        type: "email",
        rules: {
            required: { value: true, message: "This field is required." }
        }
    },
    {
        label: "Password",
        name: "password",
        type: "password",
        rules: {
            required: { value: true, message: "This field is required." }
        }
    }
];
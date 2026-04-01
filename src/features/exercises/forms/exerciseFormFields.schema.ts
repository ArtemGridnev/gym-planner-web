import type { FormFieldSchema, SearchSelectOption } from '../../../shared/types/form/formFieldSchema';

export const getExerciseFormFields = (
    categories: SearchSelectOption[]
): FormFieldSchema[] => [
    {
        label: "Category",
        name: "category",
        type: "searchSelect",
        options: categories,
        rules: {
            required: { value: true, message: "This field is required." }
        }
    },
    {
        label: "Name",
        name: "name",
        type: "text",
        rules: {
            required: { value: true, message: "This field is required." },
            maxLength: { value: 50, message: "Name have to be less that 50 chars." }
        }
    },
    {
        label: "Weight",
        name: "weight",
        type: "number",
        step: 2.5,
        unit: 'kg',
        rules: {
            min: { value: 0, message: "Weight cannot be negative." },
            max: { value: 5000, message: "Weight cannot exceed 5000 kg." },
            validate: {
                decimals: (value?: number) => {
                    if (!value && value !== 0) return true; 

                    return Number.isInteger(value * 10000) || "Weight must have at most 4 decimal places.";
                }
            }
        }
    },
    {
        label: "Reps",
        name: "reps",
        type: "number",
        rules: {
            max: { value: 1000, message: "Reps cannot exceed 1000." }
        }
    },
    {
        label: "Sets",
        name: "sets",
        type: "number",
        rules: {
            max: { value: 1000, message: "Sets cannot exceed 1000." }
        }
    },
    {
        label: "Duration Seconds",
        name: "durationSeconds",
        type: "number",
        unit: 'sec',
        rules: {
            max: { value: 86400, message: "Duration cannot exceed 86400 seconds (24 hours)." }
        }
    },
    {
        label: "Description",
        name: "description",
        type: "textarea",
        rules: {
            maxLength: { value: 500, message: "Description have to be less that 500 chars." }
        }
    }
];
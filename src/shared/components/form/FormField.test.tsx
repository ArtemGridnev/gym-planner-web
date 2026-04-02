import type { FormFieldSchema } from "../../types/form/formFieldSchema";
import FormField from "./FormField";
import { renderWithForm } from "../../utils/tests/renderWithForm";
import { screen } from "@testing-library/dom";

describe('FormField', () => {
    const formFields: FormFieldSchema[] = [
        {
            type: "text",
            name: "firstName",
            label: "Text Field",
        },
        {
            type: "email",
            name: "email",
            label: "Text Field",
        },
        {
            type: "password",
            name: "password",
            label: "Password Field",
        },
        {
            type: "number",
            name: "age",
            label: "Number Field",
            step: 1,
            unit: "years"
        },
        {
            type: "select",
            name: "country",
            label: "Select Field",
            options: [
                { value: "us", label: "USA" },
                { value: "ca", label: "Canada" },
            ]
        },
        {
            type: "searchSelect",
            name: "city",
            label: "Search Select Field",
            options: [
                { id: 1, value: "ny", label: "New York" },
                { id: 2, value: "la", label: "Los Angeles" },
            ]
        },
        {
            type: "searchSelectMultiple",
            name: "hobbies",
            label: "Search Select Multiple Field",
            options: [
                { id: 1, value: "reading", label: "Reading" },
                { id: 2, value: "traveling", label: "Traveling" },
            ]
        },
        {
            type: "cron",
            name: "recurrenceCron",
            label: "Cron Field",
            fields: ['weekDays'],
        }
    ];    

    it('renders relevant field components based on form field types', () => {
        formFields.forEach(field => {
            const { getByLabelText, getByText, unmount } = renderWithForm(<FormField {...field} />);
            switch (field.type) {
                case "text":
                case "email":
                    expect(getByLabelText('Text Field')).toBeInTheDocument();
                    break;
                case "password":
                    expect(getByLabelText('Password Field')).toBeInTheDocument();
                    break;
                case "number":
                    expect(getByLabelText('Number Field')).toBeInTheDocument();
                    break;
                case "select":
                    expect(getByLabelText('Select Field')).toBeInTheDocument();
                    break;
                case "searchSelect":
                    expect(getByLabelText('Search Select Field')).toBeInTheDocument();
                    break;
                case "searchSelectMultiple":
                    expect(getByLabelText('Search Select Multiple Field')).toBeInTheDocument();
                    break;
                case "cron":
                    expect(getByText('Cron Field')).toBeInTheDocument();
                    break;
                default:
                    break;
            }
            unmount();
        });
    });

    it.each([
      'text',
      'email',
      'textarea'  
    ])('normalizes undefined value to empty string for %s field', (type) => {
        renderWithForm(
            <FormField 
                type={type as 'text' | 'email' | 'textarea'}
                name="field"
                label="field"
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toHaveValue('');
    });

    it.each([
        { required: { value: true, message: "This field is required." } },
        { required: true }
    ])('extracts require correctly from rules', (rules) => {
        renderWithForm(
            <FormField 
                type="text"
                name="firstName"
                label="Text Field"
                rules={rules}
            />
        );

        const input = screen.getByRole('textbox');
        expect(input).toBeRequired();
    });

    it.each([
        { 
            min: { value: 12, message: "" },
            max: { value: 140, message: "" },
        },
        { 
            min: 12,
            max: 140,
        }
    ])('extracts max and min from number field correctly from rules', (rules) => {
        renderWithForm(
            <FormField 
                type="number"
                name="age"
                label="age"
                rules={rules}
            />
        );

        const input = screen.getByRole('spinbutton');
        expect(input).toHaveAttribute('min', '12');
        expect(input).toHaveAttribute('max', '140');
    });
});
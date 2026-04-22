import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Form, { type FormProps } from "./Form";
import { vi } from "vitest";
import { type FormFieldSchema } from "../../types/form/formFieldSchema";

describe('Form', () => {
    const formFields: FormFieldSchema[] = [
        {
            type: "text",
            name: "firstName",
            label: "First Name",
        },
        {
            type: "email",
            name: "email",
            label: "Email",
        },
        {
            type: "password",
            name: "password",
            label: "Password",
        },
        {
            type: "number",
            name: "age",
            label: "Age",
            step: 1,
            unit: "years"
        },
        {
            type: "select",
            name: "country",
            label: "Country",
            options: [
                { value: "us", label: "USA" },
                { value: "ca", label: "Canada" },
            ]
        },
        {
            type: "searchSelect",
            name: "city",
            label: "City",
            options: [
                { id: 1, value: "ny", label: "New York" },
                { id: 2, value: "la", label: "Los Angeles" },
            ]
        }
    ];    

    const baseProps: FormProps = {
        onSuccess: () => {},
        submitButtonText: 'submit',
        formFields
    };


    // Fields 
    it("renders all form fields based on formFields prop", () => {
        render(<Form {...baseProps} />);
        formFields.forEach(field => {
            expect(screen.getByLabelText(field.label)).toBeInTheDocument();
        });
    });


    // Submit Button
    it("renders the submit button text by submitButtonText", () => {
        render(<Form {...baseProps} />);
        expect(screen.getByRole('button', { name: baseProps.submitButtonText })).toBeInTheDocument();
    });

    it("renders the submit button disabled when disabled prop is ture", () => {
        render(<Form {...baseProps} disabled={true} />);
        expect(screen.getByRole('button', { name: baseProps.submitButtonText })).toBeDisabled();
    });

    it("renders the submit button disabled when isLoading prop is ture", () => {
        render(<Form {...baseProps} isLoading={true} />);
        expect(screen.getByRole('button', { name: baseProps.submitButtonText })).toBeDisabled();
    });

    it("renders the submit button width loading icon when isLoading prop is ture", () => {
        render(<Form {...baseProps} isLoading={true} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });


    // Submit 
    it('calls onSuccess when submit is clicked', async () => {
        const onSuccess = vi.fn();
        render(<Form {...baseProps} onSuccess={onSuccess} />);

        await userEvent.click(screen.getByRole('button', { name: baseProps.submitButtonText }));
        expect(onSuccess).toHaveBeenCalled();
    });
});
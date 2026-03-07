import { render, screen } from "@testing-library/react";
import FormProvider from "./FormProvider";
import { Controller, useFormContext } from "react-hook-form";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

function NameField() {
    const { control } = useFormContext();
  
    return (
      <Controller
        name="name"
        control={control}
        render={({ field }) => <input {...field} />}
      />
    );
  }

describe('FormProvider', () => {
    it.each([
        [{ name: 'Bob' }, 'Bob'],
        [undefined, '']
    ])(
        'resets form when initialValues = %p', 
        (initialValues, expectedValue) => {
            render(
                <FormProvider onSuccess={() => {}} initialValues={initialValues}>
                    <NameField />
                </FormProvider>
            );

            const input = screen.getByRole('textbox');

            expect(input).toHaveValue(expectedValue);
        }
    );

    it('calls onSuccess on submit', async () => {
        const onSuccess = vi.fn();
        render(
            <FormProvider onSuccess={onSuccess}>
                <NameField />
                <button type="submit">Submit</button>
            </FormProvider>
        );

        await userEvent.click(screen.getByRole('button'));

        expect(onSuccess).toHaveBeenCalled();
    })
});
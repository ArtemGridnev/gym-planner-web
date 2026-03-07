import { render, screen } from "@testing-library/react";
import PasswordField from "./PasswordField";
import userEvent from "@testing-library/user-event";

describe('PasswordField', () => {
    it('toggles password visibility when icon button is clicked', async () => {
        render(<PasswordField label="Password" />);

        const input = screen.getByLabelText('Password') as HTMLInputElement;
        const toggleButton = screen.getByRole('button', {
            name: /show password/i,
        });

        expect(input.type).toBe('password');

        await userEvent.click(toggleButton);
        expect(input.type).toBe('text');

        await userEvent.click(toggleButton);
        expect(input.type).toBe('password');
    });

    it('renders the toogle button', () => {
        render(<PasswordField label="Password" />);

        const toggleButton = screen.getByRole('button', {
            name: /show password/i,
        });

        expect(toggleButton).toBeInTheDocument();
    });
});
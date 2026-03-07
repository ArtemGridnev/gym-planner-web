import { render, screen, waitFor } from "@testing-library/react";
import NumberField from "./NumberField";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe('NumberField', () => {
    it('call onChange when value changes', async () => {
        const onChange = vi.fn();
        render(<NumberField value={0} onChange={onChange} />);

        await userEvent.type(screen.getByRole('spinbutton'), '5');

        expect(onChange).toHaveBeenCalled();
    });

    it('handles empty input without crashing', async () => {
        const onChange = vi.fn();
        render(<NumberField value={0} onChange={onChange} />);

        await userEvent.clear(screen.getByRole("spinbutton"));

        waitFor(() => {
            expect(onChange).toHaveBeenCalled();
            expect(onChange.mock.calls[0][0].target.value).toBe('');
        });
    });
});
import { render, screen } from "@testing-library/react";
import DataCard from "./DataCard";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

function Icon() {
    return (
        <svg data-testid="icon"></svg>
    );
}

describe('DataCard', () => {
    it('renders the title', () => {
        render(<DataCard title="Card Title"></DataCard>);
        expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('renders the icon', () => {
        render(<DataCard title="Card Title" icon={Icon}></DataCard>);
        expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('rendering the children', async () => {
        render(
            <DataCard title="Card Title">
                <div>Children</div>
            </DataCard>
        );
        
        expect(screen.getByText('Children')).toBeInTheDocument();
    });

    it('rendering the menu', async () => {
        render(
            <DataCard 
                title="Card Title"
                menuItems={[
                    {
                        text: 'test',
                        onClick: () => {}
                    }
                ]}
            ></DataCard>
        );

        expect(screen.getByLabelText('Actions for Card Title')).toBeInTheDocument();
    });

    it('calling the onclick on click if onclick prop provided', async () => {
        const fn = vi.fn();
        const { container } = render(<DataCard title="Card Title" onClick={fn}></DataCard>);

        const card = container.firstElementChild;
        if (!card) throw new Error("No first element found");
        await userEvent.click(card);

        expect(fn).toHaveBeenCalled();
    }); 
});
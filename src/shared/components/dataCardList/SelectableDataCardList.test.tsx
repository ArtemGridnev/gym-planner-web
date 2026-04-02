import { render, screen } from "@testing-library/react";
import type { SelectableDataCardListProps } from "./SelectableDataCardList";
import SelectableDataCardList from "./SelectableDataCardList";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("SelectableDataCardList", () => {
    const baseProps = {
        columns: [
            {
                field: "name",
                name: "name",
            },
            {
                field: "age",
                name: "age",
            }
        ],
        rows: [],
        selected: [],
        onChange: () => {},
    } as SelectableDataCardListProps;

    const rows = [
        {
            id: "1",
            data: {
                name: "Bob",
                age: 30
            },
            title: "Card 1",
        },
        {
            id: "2",
            data: {
                name: "Alice",
                age: 25
            },
            title: "Card 2",
        },
        {
            id: "3",
            data: {
                name: "Charlie",
                age: 35
            },
            title: "Card 3",
        }
    ] as SelectableDataCardListProps["rows"];

    it("renders cards by the number of data rows provided", () => {
        render(
            <SelectableDataCardList {...baseProps} rows={rows} />
        );

        expect(screen.getByText("Card 1")).toBeInTheDocument();
        expect(screen.getByText("Card 2")).toBeInTheDocument();
        expect(screen.getByText("Card 3")).toBeInTheDocument();
    });

    it("does not render placeholder when rows exist", () => {
        render(
          <SelectableDataCardList
            {...baseProps}
            rows={rows}
          />
        );
      
        expect(screen.queryByText("No items here… yet.")).not.toBeInTheDocument();
    });

    it("renders default no data message when none is provided", () => {
        render(
          <SelectableDataCardList {...baseProps} rows={[]} />
        );
      
        expect(
          screen.getByText("No items here… yet.")
        ).toBeInTheDocument();
    });

    it("renders unchecked checkbox to every row", async () => {
        render(
            <SelectableDataCardList {...baseProps} rows={rows} />
        );

        const checkboxes = screen.getAllByRole("checkbox");

        expect(checkboxes.length).toBe(rows.length);
        expect(checkboxes.every(checkbox => !checkbox.ariaChecked)).toBe(true);
    });

    it("renders checked checkbox to row that its id included in selected prop", async () => {
        render(
            <SelectableDataCardList {...baseProps} rows={rows} selected={['1']} />
        );

        const checkboxes = screen.getAllByRole("checkbox") as HTMLInputElement[];
        
        const checked = checkboxes.find(cb => cb.value === '1');
        const unchecked = checkboxes.filter(cb => cb.value !== '1');

        expect(checked).toBeChecked();

        unchecked.forEach(cb => {
            expect(cb).not.toBeChecked();
        });
    });

    it("calls onChange with correct id and checked value when unchecked checkbox is clicked", async () => {
        const onChangeMock = vi.fn();

        render(
            <SelectableDataCardList {...baseProps} rows={rows} onChange={onChangeMock} />
        );

        const checkbox = screen.getByRole('checkbox', { name: 'Select Card 2' });
        
        await userEvent.click(checkbox);

        expect(onChangeMock).toHaveBeenCalledWith('2', true); 
    });

    it("calls onChange with correct id and checked value when checked checkbox is clicked", async () => {
        const onChangeMock = vi.fn();

        render(
            <SelectableDataCardList {...baseProps} rows={rows} onChange={onChangeMock} selected={['2']} />
        );

        const checkbox = screen.getByRole('checkbox', { name: 'Select Card 2' });
        
        await userEvent.click(checkbox);

        expect(onChangeMock).toHaveBeenCalledWith('2', false); 
    });

});
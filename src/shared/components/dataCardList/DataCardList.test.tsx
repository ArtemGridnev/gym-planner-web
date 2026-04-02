import { render, screen } from "@testing-library/react";
import DataCardList, { type DataCardListProps } from "./DataCardList";

describe("DataCardList", () => {
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
        noDataMessage: "No Data"
    } as Omit<DataCardListProps, "rows">;

    const rows = [
        {
            data: {
                name: "Bob",
                age: 30
            },
            title: "Card 1",
        },
        {
            data: {
                name: "Alice",
                age: 25
            },
            title: "Card 2",
        },
        {
            data: {
                name: "Charlie",
                age: 35
            },
            title: "Card 3",
        }
    ] as DataCardListProps["rows"];

    it("renders placeholder when no data cards are provided", () => {
        render(
            <DataCardList {...baseProps} rows={[]} />
        );

        expect(screen.getByText("No Data")).toBeInTheDocument();
    });

    it("renders cards by the number of data rows provided", () => {
        render(
            <DataCardList {...baseProps} rows={rows} />
        );

        expect(screen.getByText("Card 1")).toBeInTheDocument();
        expect(screen.getByText("Card 2")).toBeInTheDocument();
        expect(screen.getByText("Card 3")).toBeInTheDocument();
    });

    it("does not render placeholder when rows exist", () => {
        render(
          <DataCardList
            {...baseProps}
            rows={rows}
          />
        );
      
        expect(screen.queryByText("No Data")).not.toBeInTheDocument();
    });

    it("renders default no data message when none is provided", () => {
        render(
          <DataCardList columns={baseProps.columns} rows={[]} />
        );
      
        expect(
          screen.getByText("No items here… yet.")
        ).toBeInTheDocument();
    });
});

import { render, screen } from "@testing-library/react";
import Alerts from "./Alerts";

describe("Alerts", () => {
    it("renders success message when success prop is provided", () => {
        render(<Alerts success="success" />);
        expect(screen.getByText('success')).toBeInTheDocument();
    });

    it("renders error message when error prop is provided", () => {
        render(<Alerts error="error"  />);
        expect(screen.getByText('error')).toBeInTheDocument();
    });

    it("renders error and success messages when error and success props are provided", () => {
        render(<Alerts error="error" success="success" />);
        expect(screen.getByText('error')).toBeInTheDocument();
        expect(screen.getByText('success')).toBeInTheDocument();
    });

    it("renders nothing when neither success nor error is provided", () => {
        const { container } = render(<Alerts />);
        expect(container.firstChild).toBeNull();
    });
});
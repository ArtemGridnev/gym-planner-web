// ExerciseForm.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ExerciseForm, { type ExerciseFormProps } from "./ExerciseForm";
import { vi, describe, it, expect } from "vitest";

// Mock dependencies
vi.mock("../../form/Form", () => ({
    default: (props: any) => (
        <button onClick={() => props.onSuccess({ name: "Test Exercise" })}>
            {props.submitButtonText}
        </button>
    ),
}));
vi.mock("../../Alerts", () => ({
    default: (props: any) => (
        <div>
            {props.success && <span>Success: {props.success}</span>}
            {props.error && <span>Error: {props.error}</span>}
        </div>
    ),
}));
vi.mock("../../../hooks/exercises/useExerciseFormFields", () => ({
    default: () => [
        { name: "name", label: "Name", type: "text" },
    ],
}));

describe("ExerciseForm", () => {
    const defaultProps: ExerciseFormProps = {
        submitButtonText: "Submit",
        onSuccess: vi.fn(),
        isLoading: false,
        success: null,
        error: null,
    };

    it("renders Alerts and Form with correct props", () => {
        render(<ExerciseForm {...defaultProps} success="Done" error="Failed" />);
        expect(screen.getByText("Success: Done")).toBeInTheDocument();
        expect(screen.getByText("Error: Failed")).toBeInTheDocument();
        expect(screen.getByText("Submit")).toBeInTheDocument();
    });

    it("calls onSuccess when form is submitted", () => {
        render(<ExerciseForm {...defaultProps} />);
        fireEvent.click(screen.getByText("Submit"));
        expect(defaultProps.onSuccess).toHaveBeenCalledWith({ name: "Test Exercise" });
    });
});
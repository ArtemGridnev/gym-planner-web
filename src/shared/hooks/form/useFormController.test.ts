import { waitFor } from "@testing-library/react";
import useFormController, { type UseFormControllerProps } from "./useFormController";
import { vitest } from "vitest";
import { renderHookWithQueryClient } from "../../utils/tests/renderWithQueryClient";
import { act } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    age: number;
};

describe("useFormController", () => {
    const mockCreateMutation = {
        mutate: vitest.fn(),
        isPending: false,
        isError: false,
        isSuccess: false,
        error: null
    };

    const mockUpdateMutation = {
        mutate: vitest.fn(),
        isPending: false,
        isError: false,
        isSuccess: false,
        error: null
    };

    const defaultProps: UseFormControllerProps<User> = {
        createMutation: mockCreateMutation,
        updateMutation: mockUpdateMutation,
        editQueryKey: (id: number) => ["user", id],
        editQueryFn: async (id: number): Promise<User> => ({
            id,
            name: "Sumachka Koshka",
            email: "sumka@gmail.com",
            age: 9
        })
    };

    it("initializes with default form state", () => {
        const { result } = renderHookWithQueryClient(() => useFormController({ ...defaultProps }));

        expect(result.current.formStates.disabled).toEqual(false);
        expect(result.current.formStates.isLoading).toEqual(false);
        expect(result.current.formStates.success).toBeNull();
        expect(result.current.formStates.error).toBeNull();
    });

    it("edit(id) switches to update mode and disables the form", () => {
        const { result } = renderHookWithQueryClient(() => useFormController(defaultProps));

        act(() => {
            result.current.edit(2);
        });

        expect(result.current.isUpdate).toEqual(true);
        expect(result.current.formStates.disabled).toEqual(true);
    });

    it("sets initialValues and enables the form after edit query resolves", async () => {
        const { result } = renderHookWithQueryClient(() => useFormController(defaultProps));
    
        act(() => {
            result.current.edit(2);
        });
    
        await waitFor(() => {
            expect(result.current.formStates.initialValues).toEqual({
                id: 2,
                name: "Sumachka Koshka",
                email: "sumka@gmail.com",
                age: 9
            });
            expect(result.current.formStates.disabled).toEqual(false);
        });
    });    

    it("onSuccess calls updateMutation with id in update mode", async () => {
        const { result } = renderHookWithQueryClient(() => useFormController(defaultProps));

        act(() => {
            result.current.edit(2);
        });

        await waitFor(() => {
            expect(result.current.formStates.initialValues).toBeDefined();
        });

        act(() => {
            result.current.formStates.onSuccess();
        });

        await waitFor(() => {
            expect(defaultProps.updateMutation.mutate).toHaveBeenCalled();
        });
    });

    it("create resets from state and keeps isUpdate false", async () => {
        const { result } = renderHookWithQueryClient(() => useFormController(defaultProps));

        act(() => {
            result.current.edit(2);
        });

        await waitFor(() => {
            expect(result.current.formStates.initialValues).toBeDefined();
        });

        act(() => {
            result.current.create();
        });

        await waitFor(() => {
            expect(result.current.isUpdate).toEqual(false);
            expect(result.current.formStates.initialValues).toEqual(undefined);
        });
    });

    it("onSuccess callback is called on create success", async () => {
        const { result } = renderHookWithQueryClient(() => useFormController({ ...defaultProps }));

        act(() => {
            result.current.create();
            result.current.formStates.onSuccess();
        });

        await waitFor(() => {
            expect(defaultProps.createMutation.mutate).toHaveBeenCalled();
        });
    });

    it("onSuccess transforms form data using formDataToPayload when provided", () => {
        const formDataToPayload = (data: any) => ({ ...data, transformed: true });
        const { result } = renderHookWithQueryClient(() => useFormController({ ...defaultProps, formDataToPayload }));

        act(() => {
            result.current.create();
            result.current.formStates.onSuccess({ name: "Test User" });
        });

        expect(defaultProps.createMutation.mutate).toHaveBeenCalledWith({ name: "Test User", transformed: true });
    });

    it("exposes loading state while mutation is pending", async () => {
        const mockUpdateMutation = {
            ...defaultProps.updateMutation,
            isPending: true
        };
    
        const { result } = renderHookWithQueryClient(() =>
            useFormController({
                ...defaultProps,
                updateMutation: mockUpdateMutation
            })
        );
    
        expect(result.current.formStates.isLoading).toBe(true);
    });

    it("returns default success and error messages when mutation provides none", async () => {
        const mockCreateMutation = {
            mutate: vitest.fn(),
            isPending: false,
            isError: true,
            isSuccess: true,
            error: null
        };
    
        const { result } = renderHookWithQueryClient(() =>
            useFormController({ ...defaultProps, createMutation: mockCreateMutation })
        );
    
        expect(result.current.formStates.success).toBeTruthy();
        expect(result.current.formStates.error).toBeTruthy();
    });
});


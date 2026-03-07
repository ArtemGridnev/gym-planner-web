import { useEffect, useState } from "react";
import { type FieldValues } from "react-hook-form";
import { useQuery, type UseMutationResult } from "@tanstack/react-query";

type UpdatePayload<T> = Partial<T> & { id: number };

type CreateMutation<T> = Pick<
    UseMutationResult<unknown, unknown, T>,
    'mutate' | 'isPending' | 'isError' | 'isSuccess' | 'error'
>;

type UpdateMutation<T> = Pick<
    UseMutationResult<unknown, unknown, T>,
    'mutate' | 'isPending' | 'isError' | 'isSuccess' | 'error'
>;

export type UseFormControllerProps<
    TForm extends FieldValues,
    TPayload = TForm
> = {
    createMutation: CreateMutation<TPayload>;
    updateMutation: UpdateMutation<UpdatePayload<TPayload>>;
    formDataToPayload?: (data: TForm) => TPayload;
    editQueryKey: (id: number) => unknown[];
    editQueryFn: (id: number) => Promise<TForm | undefined>;
};

export type FormStates = {
    disabled?: boolean;
    isLoading?: boolean;
    success?: string | null;
    error?: string | null;
    onSuccess: (data: FieldValues) => void;
};

type ReturnValue<TForm extends FieldValues> = {
    formStates: FormStates;
    isUpdate: boolean;
    initialValues?: TForm;
    create: () => void;
    edit: (id: number) => Promise<void>;
};

export default function useFormController<
    TForm extends FieldValues
>(
    props: UseFormControllerProps<TForm, TForm>
): ReturnValue<TForm>;

export default function useFormController<
    TForm extends FieldValues,
    TPayload
>(
    props: UseFormControllerProps<TForm, TPayload> & {
        formDataToPayload: (data: TForm) => TPayload;
    }
): ReturnValue<TForm>;

export default function useFormController<
    TForm extends FieldValues,
    TPayload
>({
    createMutation,
    updateMutation,
    formDataToPayload,
    editQueryKey,
    editQueryFn,
}: UseFormControllerProps<TForm, TPayload>) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [initialValues, setInitialValues] = useState<TForm>();
    const [editKey, setEditKey] = useState(0);
 
    const editQuery = useQuery({
        queryKey: editId ? [...(editQueryKey(editId)), editKey] : [],
        queryFn: () => editQueryFn(editId as number),
        enabled: editId !== null,
        staleTime: 0,
    });

    const resetFormState = () => {
        setError(null);
        setSuccess(null);
        setIsLoading(false);
        setInitialValues(undefined);
        setEditId(null);
        setDisabled(false);
    };

    const edit = async (id: number) => {
        resetFormState();
        setDisabled(true);
        setEditId(id);
        setEditKey(prev => prev + 1);
    };
    
    const create = () => {
        resetFormState();
    };

    const onSuccess = (data: TForm) => {
        const payload: TPayload = formDataToPayload
                                ? formDataToPayload(data)
                                : (data as unknown as TPayload);

        if (editId) {
            updateMutation.mutate({
                id: editId,
                ...payload
            });
        } else {
            createMutation.mutate(payload);
        }
    };

    useEffect(() => {
        const handleMutationStates = (mutation: any, actionType: string) => {
            if (mutation.isPending) {
                setIsLoading(true);
                setError(null);
                setSuccess(null);
            } else {
                setIsLoading(false);
            }

            if (mutation.isError) {
                setError(mutation.error?.message || `failed to ${actionType}`);
            }

            if (mutation.isSuccess) {
                setSuccess(`${actionType}d successfully`);
            }
        };

        handleMutationStates(createMutation, 'create');
        handleMutationStates(updateMutation, 'update');
    }, [
        createMutation.isPending, createMutation.isError, createMutation.isSuccess,
        updateMutation.isPending, updateMutation.isError, updateMutation.isSuccess,
    ]);

    useEffect(() => {
        if (editQuery.data) {
            setInitialValues(editQuery.data);
            setDisabled(false);
        }
    }, [editQuery.data, editId]);

    return {
        formStates: {
            initialValues,
            onSuccess,
            disabled,
            isLoading,
            success,
            error
        } as FormStates,
        isUpdate: !!editId,
        create,
        edit,
    };
}
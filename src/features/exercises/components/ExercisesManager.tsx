import useExercises from "../queries/hooks/useExercises";
import { useEffect, useState } from "react";
import ExercisesCard from "./ExercisesCard";
import useDeleteExercise from "../queries/hooks/useDeleteExercise";
import FormModal from "../../../shared/components/form/FormModal";
import Form from "../../../shared/components/form/Form";
import useExerciseFormController from "../hooks/useExerciseFormController";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import useExerciseFormFields from "../hooks/useExerciseFormFields";

export default function Exercises() {
    const [filters, setFilters] = useState<Record<string, string>>();
    const {
        isPending,
        data,
        error,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage
    } = useExercises({ filters });

    const loadMoreRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const [formOpen, setFormOpen] = useState(false);

    const {
        mutate: deleteExercise
    } = useDeleteExercise();

    const exerciseFormFields = useExerciseFormFields();

    const {
        isUpdate,
        edit: editExercise,
        create: createExercise,
        formStates
    } = useExerciseFormController();

    const onAdd = () => {
        createExercise();
        setFormOpen(true);
    };

    const onEdit = async (id: number) => {
        editExercise(id); 
        setFormOpen(true);
    };

    useEffect(() => {
        if (formStates.success) {
            setFormOpen(false);
        }
    }, [formStates.success]);

    return (
        <>
            <FormModal
                open={formOpen}
                title={isUpdate ? "Update Exercise" : "Create Exercise"}
                onClose={() => setFormOpen(false)} 
            >
                <Form
                    {...formStates}
                    formFields={exerciseFormFields}
                    submitButtonText={isUpdate ? "Update Exercise" : "Create Exercise"}
                />
            </FormModal>

            <ExercisesCard 
                loadMoreRef={loadMoreRef}
                exercises={data?.pages.flat() || []}
                hasNextPage={hasNextPage}
                isPending={isPending}
                error={error?.message || ''}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={(id) => deleteExercise(id)}
                onFiltersChange={(filters) => setFilters(filters)}
            />
        </>
    );
}
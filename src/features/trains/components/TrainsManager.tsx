import { useEffect, useState } from "react";
import Form from "../../../shared/components/form/Form";
import FormModal from "../../../shared/components/form/FormModal";
import TrainsCard from "./TrainsCard";
import useDeleteTrain from "../queries/hooks/useDeleteTrain";
import useTrains from "../queries/hooks/useTrains";
import useFormController from "../../../shared/hooks/form/useFormController";
import useCreateTrain from "../queries/hooks/useCreateTrain";
import useUpdateTrain from "../queries/hooks/useUpdateTrain";
import { trainFormFields } from "../forms/trainFormFields.schema";
import { getTrain, type TrainData } from "../services/trainsService";
import { trainToFormData } from "../utils/formMappers";

export default function Trains() {
    const { 
        error,
        isPending,
        data: trains
    } = useTrains();
    
    const [formOpen, setFormOpen] = useState(false);

    const {
        isUpdate,
        edit: editTrain,
        create: createTrain,
        formStates
    } = useFormController<TrainData>({
        createMutation: useCreateTrain(),
        updateMutation: useUpdateTrain(),
        editQueryKey: (id: number) => ['train', id],
        editQueryFn: async (id: number) => {
            const train = await getTrain(id);

            if (!train) return;

            return trainToFormData(train)
        },
    });

    const deleteMutation = useDeleteTrain();

    const onAdd = () => {
        createTrain();
        setFormOpen(true);
    };

    const onEdit = async (id: number) => {
        editTrain(id); 
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
                title={isUpdate ? "Update Train" : "Create Train"}
                open={formOpen} 
                onClose={() => setFormOpen(false)} 
            >
                <Form
                    {...formStates}
                    formFields={trainFormFields}
                    submitButtonText={isUpdate ? "Update Train" : "Create Train"}
                    data-testid="train-form"
                />
            </FormModal>

            <TrainsCard 
                trains={trains}
                isLoading={isPending}
                error={error?.message || ''}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={deleteMutation.mutate}
                onFiltersChange={(_filters: Record<string, string>) => {
                    // Handle filter changes if necessary
                }}
            />
        </>
    );
}
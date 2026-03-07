import { getExercise, type CreateExercisePayload } from "../services/exercisesService";
import { exerciseFormDataToCreatePayload, exerciseToFormData } from "../utils/formMappers";
import useCreateExercise from "../queries/hooks/useCreateExercise";
import useUpdateExercise from "../queries/hooks/useUpdateExercise";
import type { ExerciseCategory } from "../types/exerciseCategory";
import useFormController from "../../../shared/hooks/form/useFormController";

export type ExerciseFormData = {
    category: ExerciseCategory;
    name: string;
    description: string | null;
    sets: number | null;
    reps: number | null;
    durationSeconds: number | null;
    weight: number | null;
};

export default function useExerciseFormController() {
    return useFormController<ExerciseFormData, CreateExercisePayload>({
        createMutation: useCreateExercise(),
        updateMutation: useUpdateExercise(),
        formDataToPayload: exerciseFormDataToCreatePayload,
        editQueryKey: (id: number) => ['train', id],
        editQueryFn: async (id: number) => {
            const exercise = await getExercise(id);

            if (!exercise) return;

            return exerciseToFormData(exercise)
        },
    });
}
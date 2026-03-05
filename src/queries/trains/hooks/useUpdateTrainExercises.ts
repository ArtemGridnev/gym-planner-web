import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTrainExercises } from "../../../services/trainExercisesService";
import type { Train } from "../../../types/trains/train";
import type { TrainExercise } from "../../../types/trains/trainExercise";

export default function useUpdateTrainExercises() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, trainExercises }: { id: number, trainExercises: TrainExercise[] }) => {
            const trainExerciseUpdates = trainExercises.map(te => {
                if (te.id > 0) {
                    return { id: te.id };
                } else {
                    return { exerciseId: te.exercise.id, tempId: te.id };
                }
            });

            return await updateTrainExercises({ id, exercises: trainExerciseUpdates });
        },
        onMutate: async ({ id, trainExercises }) => {
            await queryClient.cancelQueries({ queryKey: ['train', id] });

            const previousTrain = queryClient.getQueryData<Train>(['train', id]);

            if (!previousTrain) return { previousTrain: null };

            queryClient.setQueryData(['train', id], (old: Train | undefined) => {
                if (!old) return old;

                return {
                    ...old,
                    exercises: trainExercises
                };
            });

            return { previousTrain };
        },
        onError: (_error, variables, context) => {
            if (context?.previousTrain) {
                queryClient.setQueryData(['train', variables.id], context.previousTrain);
            }
        },
        onSuccess: (data, { id }) => {
            queryClient.setQueryData(['train', id], (old: Train | undefined) => {
                if (!old) return old;

                return {
                    ...old,
                    exercises: data
                };
            });
        },
        onSettled: (_, __, variables) => {
            queryClient.invalidateQueries({ queryKey: ['train', variables.id] });
          }
    });
}
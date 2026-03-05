import { useRef } from "react";
import type { Exercise } from "../../types/exercises/exercise";
import type { TrainExercise } from "../../types/trains/trainExercise";
import type { Train } from "../../types/trains/train";
import useUpdateTrainExercises from "../../queries/trains/hooks/useUpdateTrainExercises";

export default function useTrainExercisesController(train: Train | undefined) {
    const {
        isPending,
        error,
        mutate
    } = useUpdateTrainExercises();

    const updateTrainExercisesOrder = async (trainExercisesNewOrder: number[]) => {
        if (!train?.exercises) return;

        const trainExercisesMap = new Map(train.exercises.map(te => [te.id, te]));

        const updatedTrainExercises = trainExercisesNewOrder.map(id => trainExercisesMap.get(id)).filter(Boolean) as TrainExercise[];

        await mutate({
            id: train.id,
            trainExercises: updatedTrainExercises
        });
    };

    const tempId = useRef(-1);

    const addTrainExercises = async (exercises: Exercise[]) => {
        if (!train?.exercises) return;

        const updatedTrainExercises = [
            ...train.exercises,
            ...exercises.map(exercise => ({
                id: tempId.current--,
                exercise
            }))
        ];

        await mutate({
            id: train.id, 
            trainExercises: updatedTrainExercises
        });
    };

    const deleteTrainExercise = async (trainExerciseId: number) => {
        if (!train?.exercises) return;

        const updatedTrainExercises = train.exercises.filter(exercise => exercise.id !== trainExerciseId);

        await mutate({
            id: train.id,
            trainExercises: updatedTrainExercises
        });
    };

    return {
        isPending,
        error,
        addTrainExercises,
        updateTrainExercisesOrder,
        deleteTrainExercise
    }
};
import api from '../../../shared/api/apiClient.ts';
import type { TrainExercise } from '../types/trainExercise.ts';

export const getTrainExercises = async (id: number): Promise<TrainExercise[] | undefined> => {
    const response = await api.get(`/trains/${id}/exercises`);
    return response.data;
};

export type TrainExerciseUpdate = {
    id: number;
    exerciseId?: number;
} | {
    exerciseId: number;
};

type TrainExercisesUpdateData = {
    id: number
    exercises: TrainExerciseUpdate[];
};

export const updateTrainExercises = async (data: TrainExercisesUpdateData): Promise<(TrainExercise & { tempId?: number })[]> => {
    const { id, ...payload } = data;
    const response = await api.patch(`/trains/${id}/exercises`, payload);
    return response.data;
};
import api from './api.ts';
import { handleApiError } from '../utils/handleApiError.ts';
import type { TrainExercise } from '../types/trains/trainExercise.ts';

export const getTrainExercises = async (id: number): Promise<TrainExercise[] | undefined> => {
    try {
        const response = await api.get(`/trains/${id}/exercises`);
        return response.data;
    } catch (error: any) {
        handleApiError(error);
    }
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

    try {
        const response = await api.patch(`/trains/${id}/exercises`, payload);
        return response.data;
    } catch (error: any) {
        throw handleApiError(error);
    }
};
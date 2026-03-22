import api from '../../../shared/api/apiClient.ts';
import type { Exercise } from '../types/exercise.ts';
import { objectToQuery } from '../../../shared/utils/queryHelpers.ts';
import type { ExerciseCategory } from '../types/exerciseCategory.ts';

export type ExercisesQuery = {
    cursor?: number;
    limit?: number;
    search?: string;
    category?: string;
};

export const getExercises = async (filters?: ExercisesQuery) => {
    const query = filters ? objectToQuery(filters) : '';

    const response = await api.get(`/exercises${query ? `?${query}` : ''}`);
    return response.data;
};

export const getExercise = async (id: number): Promise<Exercise | undefined> => {
    const response = await api.get(`/exercises/${id}`);
    return response.data;
};

export const getExercisesCategories = async (): Promise<ExerciseCategory[] | undefined> => {
    const response = await api.get("/exercises/categories");
    return response.data;
};

export type CreateExercisePayload = {
    categoryId: number;
    name: string;
    description: string | null;
    sets?: string | null;
    reps?: string | null;
    durationSeconds?: string | null;
    weight?: string | null;
};

export const postExercise = async (data: CreateExercisePayload): Promise<Exercise | undefined> => {
    const response = await api.post("/exercises", data);
    return response.data;
};

type UpdateExercisePayload = Partial<CreateExercisePayload>;

export const updateExercise = async (data: UpdateExercisePayload & { id: number }): Promise<Exercise | undefined>  => {
    const { id, ...payload } = data;

    const response = await api.patch(`/exercises/${id}`, payload);
    return response.data;
};

export const deleteExercise = async (id: number) => {
    const response = await api.delete(`/exercises/${id}`);
    return response.data;
};
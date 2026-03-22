import api from '../../../shared/api/apiClient.ts';
import type { Train } from '../types/train.ts';

export const getTrains = async () => {
    const response = await api.get("/trains");
    return response.data;
};

export const getTrain = async (id: number): Promise<Train> => {
    const response = await api.get(`/trains/${id}`);
    return response.data;
};

export type TrainData = {
    name: string;
    recurrenceCron: string;
};

export const postTrain = async (data: TrainData) => {
    const response = await api.post("/trains", data);
    return response.data;
};

type PartialTrainData = Partial<TrainData> & { id: number};

export const updateTrain = async (data: PartialTrainData) => {
    const { id, ...payload } = data;

    const response = await api.patch(`/trains/${id}`, payload);
    return response.data;
};

export const deleteTrain = async (id: number) => {
    const response = await api.delete(`/trains/${id}`);
    return response.data;
};
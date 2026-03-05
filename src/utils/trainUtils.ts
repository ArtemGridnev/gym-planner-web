import type { Train } from "../types/trains/train";
import type { TrainFormData } from "../types/trains/trainFormData";

export const trainToFormData = (train: Train): TrainFormData => {
    return {
        name: train.name,
        recurrenceCron: train.recurrenceCron,
    };
};
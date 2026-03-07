import type { Train } from "../types/train";
import type { TrainFormData } from "../types/trainFormData";

export const trainToFormData = (train: Train): TrainFormData => {
    return {
        name: train.name,
        recurrenceCron: train.recurrenceCron,
    };
};
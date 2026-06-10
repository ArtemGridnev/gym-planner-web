/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ExerciseDetailsModal from "../components/modals/ExerciseDetailsModal";

type ExerciseDetailsContextValue = {
    openExerciseDetails: (exerciseId: number) => void;
};

const ExerciseDetailsContext = React.createContext<ExerciseDetailsContextValue | null>(null);

export function ExerciseDetailsProvider({ children }: { children: React.ReactNode }) {
    const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);

    const openExerciseDetails = (exerciseId: number) => setSelectedExerciseId(exerciseId);
    const closeExerciseDetails = () => setSelectedExerciseId(null);

    return (
        <ExerciseDetailsContext value={{ openExerciseDetails }}>
            {children}
            <ExerciseDetailsModal
                open={selectedExerciseId !== null}
                exerciseId={selectedExerciseId}
                onClose={closeExerciseDetails}
            />
        </ExerciseDetailsContext>
    );
}

export function useExerciseDetails(): ExerciseDetailsContextValue {
    const ctx = React.useContext(ExerciseDetailsContext);
    if (!ctx) throw new Error("useExerciseDetails must be used inside ExerciseDetailsProvider");
    return ctx;
}

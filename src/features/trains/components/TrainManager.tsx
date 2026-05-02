import { useParams } from "react-router-dom";
import { useState } from "react";
import ExercisesSelectModal from "../../exercises/components/modals/ExercisesSelectModal";
import useTrain from "../queries/hooks/useTrain";
import useTrainExercisesController from "../hooks/useTrainExercisesController";
import TrainCard from "./TrainCard";

export default function Train() {
    const { id } = useParams();

    const {
        isPending,
        data: train,
        error,
    } = useTrain({ id: +id! });

    const {
        error: exercisesError,
        updateTrainExercisesOrder,
        addTrainExercises,
        removeTrainExercise
    } = useTrainExercisesController(train);

    const [formOpen, setFormOpen] = useState(false);

    return (
        <>
            {formOpen && (
                <ExercisesSelectModal
                    open={true}
                    onClose={() => setFormOpen(false)}
                    onSubmit={(exercises) => {
                        setFormOpen(false);
                        addTrainExercises(exercises);
                    }}
                />
            )}

            <TrainCard 
                train={train}
                isPending={isPending}
                error={error ? 'Failed to load train' : null}
                exercisesError={exercisesError ? 'Failed to load train exercises' : null}
                updateTrainExercisesOrder={updateTrainExercisesOrder}
                removeTrainExercise={removeTrainExercise}
                setFormOpen={setFormOpen}
            />
        </>
    );
}
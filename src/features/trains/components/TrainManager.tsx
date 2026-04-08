import { Box } from "@mui/material";
import Card from "../../../shared/components/layout/card/Card";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import { AddOutlined, DeleteOutline, FitnessCenterOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import DraggableDataCardList, { type DraggableDataCardListRowProps } from "../../../shared/components/dataCardList/DraggableDataCardList";
import type { DataCardListColumnProps } from "../../../shared/components/dataCardList/DataCardList";
import { useEffect, useState } from "react";
import ExercisesSelectModal from "../../exercises/components/modals/ExercisesSelectModal";
import DraggableDataCardListSkeleton from "../../../shared/components/dataCardList/skeleton/DraggableDataCardListSkeleton";
import useTrain from "../queries/hooks/useTrain";
import useTrainExercisesController from "../hooks/useTrainExercisesController";
import AlertsStack from "../../../shared/components/AlertsStack";
import ListNoDataMessage from "../../../shared/components/ListNoDataMessage";
import CardError from "../../../shared/components/layout/card/CardError";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

export default function Train() {
    const navigate = useNavigate();
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

    const [rows, setRows] = useState<DraggableDataCardListRowProps[]>([]);
    const [formOpen, setFormOpen] = useState(false);

    useEffect(() => {
        if (train?.exercises) {
            const trainExercises = train.exercises;

            setRows(trainExercises?.map(trainExercise => {
                const exercise = trainExercise.exercise;

                return {
                    id: trainExercise.id.toString(),
                    icon: FitnessCenterOutlined,
                    title: `${exercise.name} - ${exercise.category?.name}`,
                    testid: trainExercise.id > 0 ? 'train-exercise-card' : 'train-exercise-card-unsaved',
                    data: {
                        id: exercise.id,
                        description: exercise.description,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                        weight: exercise.weight && `${exercise.weight} kg`
                    },
                    menuItems: trainExercise.id > 0 ? [
                        {
                            icon: DeleteOutline,
                            text: 'remove',
                            onClick: () => removeTrainExercise(trainExercise.id),
                            testid: 'remove-exercise-button',
                        },
                    ] : []
                };
            }));
        } else {
            setRows([]);
        }
    }, [train]);

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

            <Card data-testid="train-page">
                <CardHeader
                    onBack={() => navigate('/managment/trains')}
                    title={`Training${train ? ` - ${train.name}` : ''}`}
                    actions={[
                        {
                            icon: AddOutlined,
                            label: 'Add Exercises',
                            tooltip: 'Add Exercises',
                            onClick: () => setFormOpen(true),
                            disabled: isPending || !train,
                            testid: 'add-exercises-button',
                        }
                    ]}
                />
                <CardContent>
                    <Box
                        sx={{
                            height: '100%',
                            padding: 2,
                            overflowY: isPending ? 'hidden' : 'auto'
                        }}
                    >
                        <Box sx={{ overflow: 'hidden' }}>
                            <Box
                                sx={{
                                    maxWidth: '40rem',
                                    margin: 'auto',
                                }}
                            >
                                {!train && !isPending && <CardError message="Train not found." data-testid="train-not-found" />}

                                {train && (error || exercisesError) && (
                                    <AlertsStack
                                        alerts={[
                                            ...(error?.message ? [{ message: error.message, severity: 'error' as const }] : []),
                                            ...(exercisesError?.message ? [{ message: exercisesError.message, severity: 'error' as const }] : []),
                                        ]}
                                    />
                                )}

                                {isPending && <DraggableDataCardListSkeleton columns={{ min: 3, max: 6 }} rows={8} icon={true} menuItems={true} />}
                                {!isPending && train && rows.length === 0 && <ListNoDataMessage message="No items here… yet." />}
                                {train?.exercises && !isPending && (
                                    <DraggableDataCardList
                                        columns={columns}
                                        rows={rows}
                                        onChange={(orderedRows) => {
                                            setRows(orderedRows);
                                            updateTrainExercisesOrder(orderedRows.map(row => +row.id))
                                        }}
                                        data-testid="train-exercises-list"
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}
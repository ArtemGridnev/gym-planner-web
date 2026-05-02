import { Box } from "@mui/material";
import Card from "../../../shared/components/layout/card/Card";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import ListState from "../../../shared/components/list/ListState";
import CardError from "../../../shared/components/layout/card/CardError";
import type { DraggableDataCardListRowProps } from "../../../shared/components/dataCardList/DraggableDataCardList";
import type { Train } from "../types/train";
import { useEffect, useState } from "react";
import { AddOutlined, DeleteOutline, FitnessCenterOutlined } from "@mui/icons-material";
import DraggableDataCardListSkeleton from "../../../shared/components/dataCardList/skeleton/DraggableDataCardListSkeleton";
import DraggableDataCardList from "../../../shared/components/dataCardList/DraggableDataCardList";
import type { DataCardListColumnProps } from "../../../shared/components/dataCardList/DataCardList";
import { useNavigate } from "react-router-dom";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

type TrainCardProps = {
    train?: Train;
    isPending: boolean;
    error: string | null;
    exercisesError: string | null;
    updateTrainExercisesOrder: (exerciseIds: number[]) => void;
    setFormOpen: (open: boolean) => void;
    removeTrainExercise: (trainExerciseId: number) => void;
};

export default function TrainCard({
    train,
    isPending,
    error,
    exercisesError,
    updateTrainExercisesOrder,
    setFormOpen,
    removeTrainExercise,
}: TrainCardProps) {
    const navigate = useNavigate();

    const [rows, setRows] = useState<DraggableDataCardListRowProps[]>([]);

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

                            <ListState
                                errors={[
                                    ...(error ? [error] : []),
                                    ...(exercisesError ? [exercisesError] : [])
                                ]}
                                isLoading={isPending}
                                isEmpty={rows ? rows.length === 0 : false}
                                skeleton={<DraggableDataCardListSkeleton columns={{ min: 3, max: 6 }} rows={8} icon={true} menuItems={true} />}
                                emptyMessage="No items here… yet."
                            >
                                {rows && (
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
                                
                            </ListState>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
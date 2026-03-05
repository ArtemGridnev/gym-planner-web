import { Box } from "@mui/material";
import Card from "../../../components/layout/card/Card";
import CardHeader from "../../../components/layout/card/CardHeader";
import CardContent from "../../../components/layout/card/CardContent";
import { AddOutlined, DeleteOutline, FitnessCenterOutlined } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import DraggableDataCardList, { type DraggableDataCardListRowProps } from "../../../components/dataCardList/DraggableDataCardList";
import type { DataCardListColumnProps } from "../../../components/dataCardList/DataCardList";
import { useEffect, useState } from "react";
import ExercisesSelectModal from "../../../components/exercises/modals/ExercisesSelectModal";
import DraggableDataCardListSkeleton from "../../../components/dataCardList/skeleton/DraggableDataCardListSkeleton";
import useTrain from "../../../queries/trains/hooks/useTrain";
import useTrainExercisesController from "../../../hooks/trains/useTrainExercisesController";
import AlertsStack from "../../../components/AlertsStack";

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
        deleteTrainExercise
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
                    title: `${exercise.name} - ${exercise.category?.name} - ${trainExercise.id}`,
                    data: {
                        id: exercise.id,
                        description: exercise.description,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds} sec`,
                        weight: exercise.weight && `${exercise.weight} kg`
                    },
                    menuItems: trainExercise.id > 0 ? [
                        { icon: DeleteOutline, text: 'delete', onClick: () => deleteTrainExercise(trainExercise.id) },
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

            <Card>
                <CardHeader 
                    onBack={() => navigate('/managment/trains')}
                    title={`Training${train ? ` - ${train.name}` : ''}`}
                    actions={[
                        {
                            icon: AddOutlined,
                            label: 'Add Exercises',
                            tooltip: 'Add Exercises',
                            onClick: () => setFormOpen(true)
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
                        <Box
                            sx={{
                                maxWidth: '40rem',
                                margin: 'auto',
                            }}
                        >
                            <AlertsStack 
                                alerts={[
                                    ...(error?.message ? [{ message: error.message, severity: 'error' as const }] : []),
                                    ...(exercisesError?.message ? [{ message: exercisesError.message, severity: 'error' as const }] : []),
                                ]} 
                            />
                            {isPending && <DraggableDataCardListSkeleton columns={{ min: 3, max: 6 }} rows={8} icon={true} menuItems={true} />}
                            {train?.exercises && !isPending && (
                                <DraggableDataCardList 
                                    columns={columns} 
                                    rows={rows}
                                    onChange={(orderedRows) => {
                                        setRows(orderedRows);
                                        updateTrainExercisesOrder(orderedRows.map(row => +row.id))
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}
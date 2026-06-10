import { Box, Skeleton } from "@mui/material";
import Card from "../../../shared/components/layout/card/Card";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import ListState from "../../../shared/components/list/ListState";
import CardError from "../../../shared/components/layout/card/CardError";
import type { Train } from "../types/train";
import type { TrainExercise } from "../types/trainExercise";
import { useEffect, useState } from "react";
import { AddOutlined, DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableItem } from "../../../shared/components/dnd/SortableItem";
import { SortableItemSkeleton } from "../../../shared/components/dnd/SortableItemSkeleton";
import DndProvider from "../../../shared/components/dnd/DndProvider";
import DataCardSkeleton from "../../../shared/components/dataCardList/skeleton/DataCardSkeleton";
import ExerciseCard from "../../exercises/components/ExerciseCard";

type TrainCardProps = {
    train?: Train;
    isPending: boolean;
    error: string | null;
    exercisesError: string | null;
    onDetailsOpen: (id: number) => void;
    updateTrainExercisesOrder: (exerciseIds: number[]) => void;
    setFormOpen: (open: boolean) => void;
    removeTrainExercise: (trainExerciseId: number) => void;
};

const SKELETON_COUNT = 8;

export default function TrainCard({
    train,
    isPending,
    error,
    exercisesError,
    onDetailsOpen,
    updateTrainExercisesOrder,
    setFormOpen,
    removeTrainExercise,
}: TrainCardProps) {
    const navigate = useNavigate();
    const [sortableExercises, setSortableExercises] = useState<TrainExercise[]>([]);

    useEffect(() => {
        setSortableExercises(train?.exercises ?? []);
    }, [train]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = sortableExercises.findIndex(te => te.id.toString() === active.id);
            const newIndex = sortableExercises.findIndex(te => te.id.toString() === over.id);
            const updated = arrayMove(sortableExercises, oldIndex, newIndex);
            setSortableExercises(updated);
            updateTrainExercisesOrder(updated.map(te => te.id));
        }
    };

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
                    },
                ]}
            />
            <CardContent>
                <Box
                    sx={{
                        height: '100%',
                        padding: 2,
                        overflowY: isPending ? 'hidden' : 'auto',
                    }}
                >
                    <Box sx={{ maxWidth: '40rem', margin: 'auto' }}>
                        {!train && !isPending && (
                            <CardError message="Train not found." data-testid="train-not-found" />
                        )}
                        <ListState
                            errors={[
                                ...(error ? [error] : []),
                                ...(exercisesError ? [exercisesError] : []),
                            ]}
                            isLoading={isPending}
                            isEmpty={sortableExercises.length === 0}
                            skeleton={
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                        <SortableItemSkeleton key={i}>
                                            <DataCardSkeleton chip menuItems>
                                                <Skeleton variant="text" width="45%" sx={{ fontSize: '0.75rem' }} />
                                            </DataCardSkeleton>
                                        </SortableItemSkeleton>
                                    ))}
                                </Box>
                            }
                            emptyMessage="No items here… yet."
                        >
                            <DndProvider onDragEnd={handleDragEnd}>
                                <SortableContext
                                    items={sortableExercises.map(te => te.id.toString())}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <Box
                                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                                        data-testid="train-exercises-list"
                                    >
                                        {sortableExercises.map(trainExercise => (
                                            <SortableItem
                                                key={trainExercise.id.toString()}
                                                id={trainExercise.id.toString()}
                                                data-testid={`draggable-data-card-${trainExercise.id}`}
                                            >
                                                <ExerciseCard
                                                    exercise={trainExercise.exercise}
                                                    onDetailsOpen={onDetailsOpen}
                                                    testid={trainExercise.id > 0 ? 'train-exercise-card' : 'train-exercise-card-unsaved'}
                                                    menuItems={trainExercise.id > 0 ? [
                                                        {
                                                            icon: DeleteOutline,
                                                            text: 'remove',
                                                            onClick: () => removeTrainExercise(trainExercise.id),
                                                            testid: 'remove-exercise-button',
                                                        },
                                                    ] : []}
                                                />
                                            </SortableItem>
                                        ))}
                                    </Box>
                                </SortableContext>
                            </DndProvider>
                        </ListState>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

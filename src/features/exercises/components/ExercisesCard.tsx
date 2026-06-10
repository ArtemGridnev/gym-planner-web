import { Box, Skeleton } from "@mui/material";
import Card from "../../../shared/components/layout/card/Card";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import Toolbar from "../../../shared/components/toolbar/Toolbar";
import ExercisesListFilters from "./ExercisesListFilters";
import { AddOutlined, DeleteOutline, EditOutlined } from "@mui/icons-material";
import React from "react";
import type { Exercise } from "../types/exercise";
import ToolbarLoadingIndicator from "../../../shared/components/toolbar/ToolbarLoadingIndicator";
import InfiniteListState from "../../../shared/components/list/InfiniteListState";
import DataCardSkeleton from "../../../shared/components/dataCardList/skeleton/DataCardSkeleton";
import DataCardListBase from "../../../shared/components/dataCardList/DataCardListBase";
import ExerciseCard from "./ExerciseCard";

const SKELETON_COUNT = 6;

type ExercisesCardProps = {
    loadMoreRef: React.RefObject<HTMLDivElement | null>;
    rootListRef: React.RefObject<HTMLDivElement | null>;
    exercises?: Exercise[];
    isPending: boolean;
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    error: string | null;
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onDetailsOpen: (id: number) => void;
    onFiltersChange: (filters: Record<string, string>) => void;
};

export default function ExercisesCard({
    loadMoreRef,
    rootListRef,
    exercises,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    error,
    onAdd,
    onEdit,
    onDelete,
    onDetailsOpen,
    onFiltersChange,
}: ExercisesCardProps) {
    const skeleton = (
        <DataCardListBase>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <DataCardSkeleton key={i} chip menuItems>
                    <Skeleton variant="text" width="45%" sx={{ fontSize: '0.75rem' }} />
                </DataCardSkeleton>
            ))}
        </DataCardListBase>
    );

    return (
        <Card data-testid="exercises-page">
            <CardHeader
                title="Exercises"
                actions={[
                    {
                        icon: AddOutlined,
                        label: 'Create Exercise',
                        tooltip: 'Create Exercise',
                        onClick: onAdd,
                        testid: 'create-exercise-button',
                    },
                ]}
            />
            <CardContent>
                <Box
                    sx={{
                        height: '100%',
                        overflowY: !exercises ? 'hidden' : 'auto',
                    }}
                    data-testid="exercises-list-container"
                    ref={rootListRef}
                >
                    <Toolbar>
                        <ExercisesListFilters onChange={onFiltersChange} />
                        {isPending && exercises && <ToolbarLoadingIndicator />}
                    </Toolbar>
                    <Box sx={{ padding: 2 }}>
                        <InfiniteListState
                            isInitialLoading={isPending && !exercises}
                            isFetchingNextPage={isFetchingNextPage}
                            hasNextPage={hasNextPage}
                            loadMoreRef={loadMoreRef}
                            errors={error ? [error] : []}
                            isEmpty={exercises ? exercises.length === 0 : false}
                            skeleton={skeleton}
                        >
                            {exercises && (
                                <DataCardListBase data-testid="exercises-list">
                                    {exercises.map(exercise => (
                                        <ExerciseCard
                                            key={exercise.id}
                                            exercise={exercise}
                                            onDetailsOpen={onDetailsOpen}
                                            menuItems={[
                                                {
                                                    icon: EditOutlined,
                                                    text: 'edit',
                                                    onClick: () => onEdit(exercise.id),
                                                    testid: 'edit-exercise-button',
                                                },
                                                {
                                                    icon: DeleteOutline,
                                                    text: 'delete',
                                                    onClick: () => onDelete(exercise.id),
                                                    testid: 'delete-exercise-button',
                                                },
                                            ]}
                                        />
                                    ))}
                                </DataCardListBase>
                            )}
                        </InfiniteListState>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

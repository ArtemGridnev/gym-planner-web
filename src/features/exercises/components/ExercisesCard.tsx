import { Box } from "@mui/material";
import Card from "../../../shared/components/layout/card/Card";
import CardHeader from "../../../shared/components/layout/card/CardHeader";
import CardContent from "../../../shared/components/layout/card/CardContent";
import Toolbar from "../../../shared/components/toolbar/Toolbar";
import ExercisesListFilters from "./ExercisesListFilters";
import DataCardList, { type DataCardListColumnProps, type DataCardListRowProps } from "../../../shared/components/dataCardList/DataCardList";
import DataCardListSkeleton from "../../../shared/components/dataCardList/skeleton/DataCardListSkeleton";
import { AddOutlined, DeleteOutline, EditOutlined, FitnessCenterOutlined } from "@mui/icons-material";
import React, { useMemo } from "react";
import type { Exercise } from "../types/exercise";
import ToolbarLoadingIndicator from "../../../shared/components/toolbar/ToolbarLoadingIndicator";
import Alerts from "../../../shared/components/Alerts";
import ListNoDataMessage from "../../../shared/components/ListNoDataMessage";

const columns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

type ExercisesCardProps = {
    loadMoreRef?: React.RefObject<HTMLDivElement | null>;
    exercises?: Exercise[];
    isPending: boolean;
    isFetchingNextPage?: boolean;
    hasNextPage?: boolean;
    error: string | null;
    onAdd: () => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onFiltersChange: (filters: Record<string, string>) => void;
};

export default function ExercisesCard({ 
    loadMoreRef, 
    exercises, 
    isPending, 
    hasNextPage, 
    error, 
    onAdd, 
    onEdit, 
    onDelete, 
    onFiltersChange 
}: ExercisesCardProps) {
    const rows = useMemo<DataCardListRowProps[] | null>(() => {
        if (!exercises) return null;

        return exercises?.map(exercise => { 
            return {
                icon: FitnessCenterOutlined,
                title: `${exercise.name} - ${exercise.category?.name}`,
                data: {
                    id: exercise.id,
                    description: exercise.description,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    durationSeconds: exercise.durationSeconds && `${exercise.durationSeconds.toLocaleString()} sec`,
                    weight: exercise.weight && `${exercise.weight.toLocaleString()} kg`
                },
                menuItems: [
                    { 
                        icon: EditOutlined, 
                        text: 'edit', 
                        onClick: () => onEdit(exercise.id),
                        testid: `edit-exercise-button`,
                    },
                    { 
                        icon: DeleteOutline, 
                        text: 'delete', 
                        onClick: () => onDelete(exercise.id),
                        testid: `delete-exercise-button`,
                    },
                ]
            };
        });
    }, [exercises]);

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
                        testid: 'create-exercise-button'
                    }
                ]}
            />
            <CardContent>
                <Box 
                    sx={{ 
                        height: '100%',
                        overflowY: !rows ? 'hidden' : 'auto'
                    }}
                    data-testid="exercises-list-container"
                >
                    <Toolbar>
                        <ExercisesListFilters onChange={(filters) => onFiltersChange(filters)} />
                        {isPending && rows && <ToolbarLoadingIndicator />}
                    </Toolbar>
                    <Box sx={{ display: 'flex', padding: 2, gap: 2, flexDirection: 'column' }}>
                        <Alerts error={error} sx={{ mb: 2 }} />

                        {!isPending && rows?.length === 0 && <ListNoDataMessage message="No items here… yet." />}

                        {rows && <DataCardList data-testid="exercises-list" columns={columns} rows={rows} />}

                        {((isPending && !rows) || hasNextPage) && <DataCardListSkeleton ref={loadMoreRef} columns={{ min: 3, max: 6 }} rows={6} icon={true} menuItems={true} />}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}
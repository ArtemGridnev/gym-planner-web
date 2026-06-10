import { Typography } from "@mui/material";
import DataCard from "../../../shared/components/dataCardList/DataCard";
import type { MenuItemProps } from "../../../shared/components/menu/MenuItem";
import type { Exercise } from "../types/exercise";

export type ExerciseCardProps = {
    exercise: Exercise;
    onDetailsOpen?: (id: number) => void;
    menuItems?: MenuItemProps[];
    testid?: string;
};

function formatMetrics(exercise: Exercise): string | null {
    const parts: string[] = [];
    if (exercise.sets != null) parts.push(`${exercise.sets} sets`);
    if (exercise.reps != null) parts.push(`${exercise.reps} reps`);
    if (exercise.weight != null) parts.push(`${exercise.weight} kg`);
    if (exercise.durationSeconds != null) parts.push(`${exercise.durationSeconds}s`);
    return parts.length > 0 ? parts.join(' · ') : null;
}

export default function ExerciseCard({ exercise, onDetailsOpen, menuItems, testid }: ExerciseCardProps) {
    const metrics = formatMetrics(exercise);

    return (
        <DataCard
            title={exercise.name}
            chip={exercise.category.name}
            onClick={onDetailsOpen ? () => onDetailsOpen(exercise.id) : undefined}
            menuItems={menuItems}
            testid={testid}
        >
            {metrics && (
                <Typography variant="caption" color="text.secondary">
                    {metrics}
                </Typography>
            )}
        </DataCard>
    );
}

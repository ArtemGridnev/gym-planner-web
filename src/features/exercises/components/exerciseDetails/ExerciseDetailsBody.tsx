import { Box, Stack, Typography } from "@mui/material";
import { LayersOutlined, RepeatOutlined, ScaleOutlined, TimerOutlined } from "@mui/icons-material";
import type { Exercise } from "../../types/exercise";
import ExerciseDetailItem, { type ExerciseDetailItemProps } from "./ExerciseDetailItem";

export default function ExerciseDetailsBody({ exercise }: { exercise: Exercise }) {
    const details: ExerciseDetailItemProps[] = [
        { label: "Sets", value: exercise.sets, icon: LayersOutlined },
        { label: "Reps", value: exercise.reps, icon: RepeatOutlined },
        { label: "Weight", value: exercise.weight, suffix: "kg", icon: ScaleOutlined },
        { label: "Duration", value: exercise.durationSeconds, suffix: "s", icon: TimerOutlined },
    ];

    return (
        <Stack spacing={2.5}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1.5 }}>
                {details.map((detail) => (
                    <ExerciseDetailItem key={detail.label} {...detail} />
                ))}
            </Box>

            <Box>
                <Typography variant="overline" color="text.secondary">
                    Instructions
                </Typography>
                <Typography
                    variant="body2"
                    color={exercise.description ? "text.primary" : "text.secondary"}
                    sx={{ whiteSpace: "pre-line" }}
                >
                    {exercise.description || "No instructions provided."}
                </Typography>
            </Box>
        </Stack>
    );
}

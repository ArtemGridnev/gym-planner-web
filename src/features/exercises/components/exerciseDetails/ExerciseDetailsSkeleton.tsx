import { Box, Skeleton, Stack } from "@mui/material";
import { TILE_MIN_HEIGHT } from "./ExerciseDetailItem";

export default function ExerciseDetailsSkeleton() {
    return (
        <Stack spacing={2.5} data-testid="exercise-details-loading">
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1.5 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} variant="rounded" height={TILE_MIN_HEIGHT} />
                ))}
            </Box>

            <Box>
                <Skeleton variant="text" width="30%" />
                <Skeleton variant="text" width="92%" />
                <Skeleton variant="text" width="78%" />
            </Box>
        </Stack>
    );
}

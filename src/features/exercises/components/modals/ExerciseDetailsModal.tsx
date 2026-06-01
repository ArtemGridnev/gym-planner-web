import { Alert, Box, Button, Chip, Stack, Typography } from "@mui/material";
import Modal from "../../../../shared/components/modal/Modal";
import { useExercise } from "../../queries/hooks/useExercise";
import ExerciseDetailsBody from "../exerciseDetails/ExerciseDetailsBody";
import ExerciseDetailsSkeleton from "../exerciseDetails/ExerciseDetailsSkeleton";

type ExerciseDetailsModalProps = {
    open: boolean;
    exerciseId: number | null;
    onClose: () => void;
};

const MODAL_WIDTH = "32rem";

export default function ExerciseDetailsModal({ open, exerciseId, onClose }: ExerciseDetailsModalProps) {
    const { data: exercise, isLoading, isError, refetch, isFetching } = useExercise(open ? exerciseId : null);

    const title = exercise?.name ?? "Exercise details";
    const categoryChip = exercise?.category ? (
        <Chip label={exercise.category.name} size="small" sx={{ maxWidth: "100%" }} />
    ) : null;

    return (
        <Modal open={open} onClose={onClose} width={MODAL_WIDTH} data-testid="exercise-details-modal">
            <Modal.Header titleAdornment={categoryChip} loading={isLoading}>
                {title}
            </Modal.Header>
            <Modal.Content>
                <Box sx={{ p: 2.5 }}>
                    {isLoading ? (
                        <ExerciseDetailsSkeleton />
                    ) : isError ? (
                        <Stack spacing={2}>
                            <Alert severity="error">Failed to load exercise details.</Alert>
                            <Button variant="outlined" onClick={() => refetch()} disabled={isFetching}>
                                {isFetching ? "Retrying…" : "Retry"}
                            </Button>
                        </Stack>
                    ) : !exercise ? (
                        <Typography color="text.secondary">Exercise not found.</Typography>
                    ) : (
                        <ExerciseDetailsBody exercise={exercise} />
                    )}
                </Box>
            </Modal.Content>
        </Modal>
    );
}

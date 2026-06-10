import Modal from "../../../../shared/components/modal/Modal";
import { Box, Button, LinearProgress, Skeleton, Typography } from "@mui/material";
import Toolbar from "../../../../shared/components/toolbar/Toolbar";
import ExercisesListFilters from "../ExercisesListFilters";
import useExercisesSelect from "../../hooks/useExercisesSelect";
import InfiniteListState from "../../../../shared/components/list/InfiniteListState";
import DataCardSkeleton from "../../../../shared/components/dataCardList/skeleton/DataCardSkeleton";
import SelectableDataCardWrap from "../../../../shared/components/dataCardList/SelectableDataCardWrap";
import SelectableDataCardWrapSkeleton from "../../../../shared/components/dataCardList/skeleton/SelectableDataCardWrapSkeleton";
import ExerciseCard from "../ExerciseCard";
import type { Exercise } from "../../types/exercise";
import { useExerciseDetails } from "../../context/ExerciseDetailsContext";

type ExercisesSelectModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (exercises: Exercise[]) => void;
};

const SKELETON_COUNT = 6;

export default function ExercisesSelectModal({ open, onClose, onSubmit }: ExercisesSelectModalProps) {
    const {
        exercises,
        isPending,
        isFetchingNextPage,
        hasNextPage,
        selected,
        loadMoreRef,
        listRootRef,
        setFilters,
        handleCheck,
        handleSubmit,
        cleanSelected
    } = useExercisesSelect({ onSubmit });

    const { openExerciseDetails } = useExerciseDetails();

    return (
        <>
            <Modal
                open={open}
                onClose={() => onClose()}
                width="50rem"
                height="100dvh"
                data-testid="exercises-select-modal"
            >
                <Modal.Header>Select exercises</Modal.Header>
                <Modal.Content>
                    <Box
                        sx={{
                            height: '100%',
                            overflowY: !exercises ? 'hidden' : 'auto',
                        }}
                        ref={listRootRef}
                    >
                        <Toolbar>
                            <ExercisesListFilters onChange={setFilters} />
                            {isPending && exercises && (
                                <LinearProgress
                                    sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        height: '2px',
                                        bottom: 0,
                                        left: 0,
                                    }}
                                />
                            )}
                        </Toolbar>
                        <Box sx={{ display: 'flex', padding: 2, gap: 2, flexDirection: 'column' }}>
                            <InfiniteListState
                                isInitialLoading={isPending && !exercises}
                                isFetchingNextPage={isFetchingNextPage}
                                hasNextPage={hasNextPage}
                                emptyMessage="No exercises found with the current filters."
                                loadMoreRef={loadMoreRef}
                                errors={[]}
                                isEmpty={exercises ? exercises.length === 0 : false}
                                skeleton={
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                            <SelectableDataCardWrapSkeleton key={i}>
                                                <DataCardSkeleton chip>
                                                    <Skeleton variant="text" width="45%" sx={{ fontSize: '0.75rem' }} />
                                                </DataCardSkeleton>
                                            </SelectableDataCardWrapSkeleton>
                                        ))}
                                    </Box>
                                }
                            >
                                {exercises && (
                                    <Box
                                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                                        data-testid="exercises-selectable-list"
                                    >
                                        {exercises.map(exercise => (
                                            <SelectableDataCardWrap
                                                key={exercise.id}
                                                value={exercise.id.toString()}
                                                checked={Object.keys(selected).includes(exercise.id.toString())}
                                                onChange={(checked) => handleCheck(exercise.id.toString(), checked)}
                                                label={`Select ${exercise.name}`}
                                            >
                                                <ExerciseCard
                                                    exercise={exercise}
                                                    onDetailsOpen={openExerciseDetails}
                                                />
                                            </SelectableDataCardWrap>
                                        ))}
                                    </Box>
                                )}
                            </InfiniteListState>
                        </Box>
                    </Box>
                </Modal.Content>
                <Modal.Footer>
                    <Box
                        sx={{
                            display: 'flex',
                            color: 'text.secondary',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Typography variant="body2" sx={{ flexGrow: 1 }}>
                            {Object.values(selected).map(ex => ex.name).join(', ')}
                        </Typography>
                        <Button sx={{ flexShrink: 0 }} variant="outlined" onClick={() => cleanSelected()}>
                            Clean Selections
                        </Button>
                        <Button type="submit" sx={{ flexShrink: 0 }} variant="contained" onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </Box>
                </Modal.Footer>
            </Modal>
        </>
    );
}

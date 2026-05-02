import type { DataCardListColumnProps } from "../../../../shared/components/dataCardList/DataCardList";
import Modal from "../../../../shared/components/modal/Modal";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import SelectableDataCardList from "../../../../shared/components/dataCardList/SelectableDataCardList";
import type { Exercise } from "../../types/exercise";
import Toolbar from "../../../../shared/components/toolbar/Toolbar";
import ExercisesListFilters from "../ExercisesListFilters";
import useExercisesSelect from "../../hooks/useExercisesSelect";
import SelectableDataCardListSkeleton from "../../../../shared/components/dataCardList/skeleton/SelectableDataCardListSkeleton";
import InfiniteListState from "../../../../shared/components/list/InfiniteListState";

const exercisesColumns: DataCardListColumnProps[] = [
    { field: 'description', fullWidth: true },
    { field: 'weight', name: 'Weight' },
    { field: 'sets', name: 'Sets' },
    { field: 'reps', name: 'Reps' },
    { field: 'durationSeconds', name: 'Duration Seconds' },
];

type ExercisesSelectModalProps = {
    open: boolean;
    onClose: () => void;
    onSubmit: (exercises: Exercise[]) => void;
};

export default function ExercisesSelectModal({ open, onClose, onSubmit }: ExercisesSelectModalProps) {
    const {
        rows,
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

    return (
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
                        overflowY: !rows ? 'hidden' : 'auto'
                    }}
                    ref={listRootRef}
                >
                    <Toolbar>
                        <ExercisesListFilters onChange={setFilters} />
                        {isPending && rows && (
                            <LinearProgress 
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '2px',
                                    bottom: 0,
                                    left: 0
                                }}
                            />
                        )}
                    </Toolbar>
                    <Box sx={{ display: 'flex', padding: 2, gap: 2, flexDirection: 'column' }}>
                        <InfiniteListState
                            isInitialLoading={isPending && !rows}
                            isFetchingNextPage={isFetchingNextPage}
                            hasNextPage={hasNextPage}
                            emptyMessage="No exercises found with the current filters."
                            loadMoreRef={loadMoreRef}
                            errors={[]}
                            isEmpty={rows ? rows.length === 0 : false}
                            skeleton={<SelectableDataCardListSkeleton columns={{ min: 3, max: 6 }} rows={6} icon={true} menuItems={true} />}
                        >
                            {rows && (
                                <SelectableDataCardList 
                                    selected={Object.keys(selected)}
                                    rows={rows} 
                                    columns={exercisesColumns} 
                                    onChange={handleCheck} 
                                    data-testid="exercises-selectable-list"
                                />
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
                        gap: 2
                    }}
                >
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>{Object.values(selected).map(ex => ex.name).join(', ')}</Typography>
                    <Button sx={{ flexShrink: 0 }} variant="outlined" onClick={() => cleanSelected()}>Clean Selections</Button>
                    <Button type="submit" sx={{ flexShrink: 0 }} variant="contained" onClick={() => handleSubmit()}>Submit</Button>
                </Box>
            </Modal.Footer>
        </Modal>
    );
}
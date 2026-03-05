import type { DataCardListColumnProps } from "../../dataCardList/DataCardList";
import Modal from "../../modal/Modal";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import SelectableDataCardList from "../../dataCardList/SelectableDataCardList";
import type { Exercise } from "../../../types/exercises/exercise";
import Toolbar from "../../toolbar/Toolbar";
import ExercisesListFilters from "../ExercisesListFilters";
import useExercisesSelect from "../../../hooks/exercises/useExercisesSelect";
import SelectableDataCardListSkeleton from "../../dataCardList/skeleton/SelectableDataCardListSkeleton";

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
        hasNextPage,
        selected,
        loadMoreRef,
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
            height="100vh"
        >
            <Modal.Header>Select exercises</Modal.Header>
            <Modal.Content>
                <Box 
                    sx={{
                        height: '100%',
                        overflowY: !rows ? 'hidden' : 'auto'
                    }}
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
                        {!isPending && rows && (
                            <SelectableDataCardList 
                                selected={Object.keys(selected)}
                                rows={rows} 
                                columns={exercisesColumns} 
                                onChange={handleCheck} 
                                noDataMessage={"No items found."}
                            />
                        )}
                        {(isPending || hasNextPage) && <SelectableDataCardListSkeleton ref={loadMoreRef} columns={{ min: 3, max: 6 }} rows={6} icon={true} menuItems={true} />}
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
                    <Button sx={{ flexShrink: 0 }} variant="contained" onClick={() => handleSubmit()}>Submit</Button>
                </Box>
            </Modal.Footer>
        </Modal>
    );
}
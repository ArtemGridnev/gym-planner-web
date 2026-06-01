import { lazy, Suspense, useCallback, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CardError from '../../../shared/components/layout/card/CardError';
import ExerciseDetailsModal from '../../exercises/components/modals/ExerciseDetailsModal';

const LazyCurrentSessionWidget = lazy(() =>
  import('trainingSessions/CurrentSessionWidget')
);

export default function TrainingSessionsWidget() {
  const queryClient = useQueryClient();
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null);

  const handleExerciseClick = useCallback((exerciseId: string) => {
    const id = Number(exerciseId);
    if (!Number.isInteger(id)) return;
    setSelectedExerciseId(id);
  }, []);

  return (
    <>
      <ErrorBoundary fallback={<CardError message="Widget unavailable" />}>
        <Suspense
          fallback={
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          }
        >
          <LazyCurrentSessionWidget queryClient={queryClient} onExerciseClick={handleExerciseClick} />
        </Suspense>
      </ErrorBoundary>

      <ExerciseDetailsModal
        open={selectedExerciseId !== null}
        exerciseId={selectedExerciseId}
        onClose={() => setSelectedExerciseId(null)}
      />
    </>
  );
}

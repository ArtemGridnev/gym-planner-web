import { lazy, Suspense, useCallback } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import CardError from '../../../shared/components/layout/card/CardError';
import { useExerciseDetails } from '../../exercises/context/ExerciseDetailsContext';

const LazyCurrentSessionWidget = lazy(() =>
  import('trainingSessions/CurrentSessionWidget')
);

export default function TrainingSessionsWidget() {
  const queryClient = useQueryClient();
  const { openExerciseDetails } = useExerciseDetails();

  const handleExerciseClick = useCallback((exerciseId: string) => {
    const id = Number(exerciseId);
    if (!Number.isInteger(id)) return;
    openExerciseDetails(id);
  }, [openExerciseDetails]);

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
    </>
  );
}

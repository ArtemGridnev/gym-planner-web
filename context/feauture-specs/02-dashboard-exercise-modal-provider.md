# Feature: Shared Exercise Details Modal

Read `context/AGENTS.md` before starting

## GOAL

Create one shared exercise-details modal flow for the dashboard area.

Exercise details should be opened consistently from every place that displays exercise cards, without each `ExerciseCard` or screen owning its own modal implementation.

## IMPLEMENTATION

- Add an `ExerciseDetailsProvider` at the Dashboard/app-shell level.
- The provider should own:
  - `selectedExerciseId`
  - `openExerciseDetails(exerciseId)`
  - `closeExerciseDetails()`
- Render a single `ExerciseDetailsModal` from the provider.
- Expose a hook like `useExerciseDetails()` for screens/components that need to open the modal.

`ExerciseCard` should remain presentational:

- Receives exercise data.
- Receives `onClick`.
- Does not own modal state.
- Does not render `ExerciseDetailsModal`.

Use the shared modal flow from:

- Exercises page
- Train page
- Training Sessions page
- Exercises select modal

Make sure the single `ExerciseDetailsModal` appears above other modals, especially above the exercises select modal.

## CHECK WHEN DONE

- Only one shared `ExerciseDetailsModal` is rendered in the dashboard/app-shell flow.
- `ExerciseCard` does not render or manage the modal.
- Exercises page opens exercise details through the provider.
- Train page opens exercise details through the provider.
- Training Sessions page opens exercise details through the provider.
- Exercises select modal opens exercise details through the provider.
- `ExerciseDetailsModal` appears above the exercises select modal.
- Existing exercise card interactions still work.
- Lint passes.
- Build passes.
# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Complete — Skeleton Reuse and Alignment

## Current Goal

- None. Feature is shipped.

## Completed

- **Shared Exercise Details Modal Provider**
  - Created `ExerciseDetailsProvider` + `useExerciseDetails()` hook in `exercises/context/ExerciseDetailsContext.tsx`
  - Provider rendered at Dashboard level; single `ExerciseDetailsModal` with `zIndex: 1400` (above select modal)
  - Removed per-screen modal state from `ExercisesManager`, `TrainManager`, `ExercisesSelectModal`, `TrainingSessionsWidget`
  - `ExerciseDetailsModal` accepts optional `sx` prop for z-index override
  - Build and lint pass with zero new errors

- **Skeleton Reuse and Alignment**
  - `TrainCard` exercise skeleton now uses `SortableItemSkeleton` wrapping `DataCardSkeleton` — drag handle area included
  - Extracted `SelectableDataCardWrap` with owned checkbox + flex layout
  - Created `SelectableDataCardWrapSkeleton` matching the wrap structure
  - Refactored `SelectableDataCardList` and `SelectableDataCardListSkeleton` to use the new components
  - Refactored `ExercisesSelectModal` to use `SelectableDataCardWrap` / `SelectableDataCardWrapSkeleton`
  - Build and lint pass with zero new errors

- **GPA-42: Exercise Card Redesign**
  - Created `ExerciseCard` (Variant E: soft grey tonal chip, 3px full-height accent, overflow:hidden card)
  - Created `ExerciseCardSkeleton` matching the production card structure
  - Replaced `ExercisesCard` list with responsive 3→2→1 column CSS container-query grid
  - Wired `ExerciseDetailsModal` — clicking any card opens exercise details
  - Existing edit/delete menu actions preserved and still work
  - Removed all design exploration artifacts (preview page, demo variants, temporary routes)
  - Build and TypeScript compilation pass with zero errors
  - No changes to `DataCard` or training card design

## In Progress

- None.

## Next Up

- None.

## Open Questions

- None.

## Architecture Decisions

- `ExerciseCard` is isolated — does NOT modify `DataCard` or any shared list components.
- Responsive grid uses CSS container queries (`containerType: 'inline-size'`) so column count responds to the card's rendered width within the sidebar layout, not the viewport width.
- `ExerciseDetailsModal` is rendered inside `ExercisesManager` (not `ExercisesCard`) to keep modal state co-located with other modal state (form modal).

## Session Notes

- Feature spec: `context/feauture-specs/01-exercise-card-new-design.md`
- Files changed: `ExercisesManager.tsx`, `ExercisesCard.tsx`, `exerciseCard/ExerciseCard.tsx`, `exerciseCard/ExerciseCardSkeleton.tsx`, `App.tsx`
- Files removed: `exerciseCard/ExerciseCardDesignPreview.tsx`

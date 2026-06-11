# Feature: Skeleton Reuse and Alignment

Read `context/AGENTS.md` before starting

## GOAL

Ensure skeleton loading states reuse existing shared components and match the final rendered UI as closely as possible.

Current issues:

1. Training exercises inside Train cards use a custom skeleton that does not match the actual sortable exercise item. The drag handle skeleton is missing.
2. `ExercisesSelectModal` manually renders selection skeletons instead of reusing the shared selectable card pattern.

## IMPLEMENTATION

### Training Exercises

- Inspect the training exercises skeleton implementation inside Train cards.
- Replace the custom exercise skeleton with the existing `SortableItemSkeleton`.
- Ensure the skeleton layout matches the rendered sortable exercise item, including the drag handle area.

### Exercises Select Modal

- Extract the shared selectable card wrapper from `SelectableDataCardList` into a reusable component:
  - `SelectableDataCardWrap`
  - Accepts `children`
  - Owns the selection layout structure

- Create:
  - `SelectableDataCardWrapSkeleton`

- Refactor `SelectableDataCardList` to use the new wrapper component.
- Refactor `SelectableDataCardListSkeleton` to use the new wrapper skeleton component.

- Refactor `ExercisesSelectModal` to use:
  - `SelectableDataCardWrap` for rendered items
  - `SelectableDataCardWrapSkeleton` for loading states

### Reuse Requirements

- Do not duplicate existing skeleton layouts.
- Reuse shared skeleton components wherever possible.
- Keep skeletons colocated with the UI component they represent.
- Ensure skeletons visually match the final rendered component structure.

## CHECK WHEN DONE

- Train exercise loading state uses `SortableItemSkeleton`.
- Train exercise skeleton visually matches the sortable item, including the drag handle area.
- `SelectableDataCardWrap` extracted successfully.
- `SelectableDataCardWrapSkeleton` created successfully.
- `SelectableDataCardList` uses the extracted wrapper.
- `SelectableDataCardListSkeleton` uses the extracted wrapper skeleton.
- `ExercisesSelectModal` no longer manually renders selectable card skeletons.
- No duplicated selectable card skeleton layouts remain.
- Loading states closely match the final rendered UI.
- `npm run lint` passes.
- `npm run build` passes.
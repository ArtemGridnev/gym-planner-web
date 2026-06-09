# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes — do not layer workarounds.
- Do not mix unrelated concerns in one component.
- Reuse existing shared components, hooks, and utilities before creating new ones.
- Prefer composition over deep nesting.
- Avoid unnecessary global state.
- Do not add features, refactoring, or abstractions beyond what the task requires.

## TypeScript

- Strict mode is enabled throughout (`tsconfig.json`).
- Avoid `any`; use explicit interfaces or narrowly scoped types.
- Use `interface` for object contracts (types, API payloads, response shapes).
- Validate unknown external input at system boundaries (API responses, remote props) before trusting it.

## React

- All components are functional with hooks. No class components.
- React Compiler (`babel-plugin-react-compiler`) is active — do not add manual `useMemo`/`useCallback` unless there is a specific, documented reason the compiler cannot handle it.
- Component files: PascalCase (`ExercisesManager.tsx`). Hook files: camelCase prefixed with `use` (`useExercises.ts`).

## Styling

- All UI uses MUI components. Never write raw HTML tags: no `div`, `span`, `ul`, `li`, `button`, `input`, `form`, `label`.
- All styling via the `sx` prop only. No CSS/SCSS files for application components. No inline `style={{}}`.
- The MUI theme is defined in `src/theme.ts` (`borderRadius: 8`). Extend it there — never override inline.
- No hardcoded hex color values in components — use the MUI theme palette via `sx` theme callbacks.

## TanStack Query

- `useQuery` and `useMutation` definitions belong exclusively in `queries/hooks/`. Never define them inline in components or business hooks.
- Business hooks in `hooks/` compose query hooks — they do not call `useQuery` directly.
- Cache invalidation and optimistic updates stay inside the relevant mutation hook.
- Cache keys follow `[resource, id?]` or `[resource, filters]` patterns:
  - `['exercises']`, `['exercises', filters]`
  - `['trains']`, `['trains', id]`
- Infinite scroll uses cursor-based pagination: `getNextPageParam` returns `lastPage.at(-1)?.id ?? null`.
- Shared `queryOptions` objects used by multiple hooks are extracted to `queries/options/`.

## Forms

- Forms are configuration-driven. Field definitions live in `forms/*.schema.ts` as `FormFieldSchema[]`.
- Field types: `TextField` (text, email, password, textarea), `NumberField`, `SelectField`, `SearchSelectField`, `SearchSelectMultipleField`, `CronField`.
- Render via `<Form formFields={...} />` or `<FormModal>` — never build ad-hoc form UIs.
- For screens that support both create and edit, use `useFormController` (or a feature-specific wrapper like `useExerciseFormController`). It manages edit-mode data fetching, delegates to create/update mutations, and surfaces unified `formStates`.
- Do not define React Hook Form state inline in components.

## List and Loading States

- Use `<ListState>` for finite lists and `<InfiniteListState>` for cursor-paginated lists.
- Never write inline loading/empty/error checks — delegate to these wrappers.
- Skeleton components exist for all list and card variants — always use them for loading states.

## API Layer

- All API calls go through `src/shared/api/apiClient.ts` (Axios instance, baseURL `/api`, `withCredentials: true`).
- Service functions live in `services/*.ts` and call the API client directly.
- Services throw normalized `ApiError` objects — they never `console.error` and never return raw Axios errors.
- The `handleApiError` utility in `src/shared/utils/handleApiError.ts` is available for extracting error messages.

## Microfrontend

- Do not import internal host modules into remotes.
- Wrap every remote load in `<ErrorBoundary>` + `<Suspense>`.
- Host–remote communication happens only through props and callbacks — no shared module imports beyond the declared shared libraries.
- Shared libraries are declared in `vite.config.ts` — never bundle them separately in the host or remote.

## File Organization

```
src/features/<feature>/
  components/         # UI components
  hooks/              # business logic hooks (compose query hooks)
  queries/hooks/      # useQuery / useMutation definitions only
  queries/keys/       # query-key factories (if extracted)
  queries/options/    # shared queryOptions objects
  services/           # raw API calls via apiClient
  types/              # TypeScript types and interfaces
  forms/              # FormFieldSchema[] definitions
  filters/            # filter schema definitions
  utils/              # mappers and helpers

src/shared/           # same sub-structure for cross-feature reusables
src/lib/              # singleton infrastructure (QueryClient)
```

## Forbidden

- New state-management libraries (no Redux, Zustand, Jotai, etc.)
- New styling libraries (no Tailwind, CSS Modules, styled-components beyond Emotion/MUI)
- New UI libraries (no shadcn/ui, Radix, Chakra, etc.)
- Raw HTML tags in JSX
- Inline styles (`style={{}}`)
- CSS/SCSS files for application components

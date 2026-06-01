# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server (requires .env)
npm run build        # tsc + vite build
npm run lint         # eslint
npm run test         # vitest (single run)
npm run test:watch   # vitest watch mode
npm run test:e2e     # cypress headless
```

Run a single vitest test file:
```bash
npx vitest run src/path/to/file.test.ts
```

### Environment variables

Create a `.env` file before starting the dev server:
```env
VITE_API_URL=https://gym-planner-api-production.up.railway.app/
VITE_TRAINING_SESSIONS_REMOTE_URL=http://localhost:5001
CYPRESS_BASE_URL=http://localhost:5173
```

Both `VITE_API_URL` and `VITE_TRAINING_SESSIONS_REMOTE_URL` are required — `vite.config.ts` throws at startup if either is missing.

## Architecture

### Host responsibilities

This is the **shell** of a Module Federation setup. It owns routing, layout, authentication, and navigation. It dynamically loads a `trainingSessions` remote at runtime via `@originjs/vite-plugin-federation`. The remote integration lives in `src/features/trainSessions/remotes/TrainingSessionsWidget.tsx` — it lazy-loads `trainingSessions/CurrentSessionWidget` inside an `ErrorBoundary` + `Suspense` to gracefully handle remote unavailability.

The dev proxy at `/api` forwards to `VITE_API_URL`, and `/remote-dev` forwards to `http://localhost:5001` (the training sessions remote in development).

### Feature-based structure

```
src/features/<feature>/
  components/      # UI components
  hooks/           # business logic hooks
  queries/hooks/   # TanStack Query hooks (useQuery / useMutation)
  queries/keys/    # query-key factories
  queries/options/ # shared queryOptions objects
  services/        # raw API calls via apiClient
  types/           # TypeScript types
  forms/           # form field schema definitions
  utils/           # mappers, helpers
```

`shared/` follows the same internal pattern for reusable cross-feature code.

### API layer

`src/shared/api/apiClient.ts` is an Axios instance with `baseURL: '/api'` and `withCredentials: true`. Its response interceptor normalises all errors to `ApiError` (`{ message, statusCode, error }`). Service files call this client directly and `throw` normalised errors — never `console.error`.

### TanStack Query conventions

- `queries/hooks/` contains only `useQuery` / `useMutation` definitions. No business logic here.
- `hooks/` (business hooks) compose from `queries/hooks/`.
- Cache keys follow a `[resource, id?]` pattern: `['trains']`, `['exercises', filters]`.
- Shared query options are extracted into `queries/options/` (see `exercisesQueryOptions`).
- Infinite scroll uses cursor-based pagination: `getNextPageParam` returns `lastPage.at(-1)?.id ?? null`.

### Form system

Forms are configuration-driven. The flow is:

1. Define a `FormFieldSchema[]` in `forms/*.schema.ts` — each entry is a typed union (`TextField | NumberField | SelectField | SearchSelectField | SearchSelectMultipleField | CronField`).
2. Render via `<Form formFields={...} />` (or `<FormModal>`) — this composes `FormProvider` (React Hook Form context) + `FormField` (switches on `field.type`) + a submit button.
3. For screens that support both create and edit, use `useFormController` from `shared/hooks/form/useFormController.ts`. It manages edit-mode data fetching (via a one-off query), delegates to create/update mutations, and surfaces unified `formStates` (`{ disabled, isLoading, success, error, onSuccess }`).

Feature-level controllers (e.g., `useExerciseFormController`) wrap `useFormController` with feature-specific mutations and mappers.

### List state components

Two wrapper components handle all loading/empty/error states for lists:
- `ListState` — for finite lists
- `InfiniteListState` — for paginated lists with `useInfiniteScroll`

Both accept an `errors: string[]` prop, a `skeleton` node, and `isEmpty`. Always use these instead of inline loading/empty checks.

### Styling

- All UI is MUI. Use `Box`, `Stack`, `Typography`, `Button`, etc. — no raw HTML tags.
- Style exclusively via the `sx` prop. No CSS/SCSS files for components, no `style={{}}`.
- The app theme is defined in `src/theme.ts`.

### Auth

`AuthProvider` (`src/features/auth/context/AuthProvider.tsx`) fetches the current user on mount via cookie-based session and exposes `{ user, loading, setUser, logout }` through `AuthContext`. On logout it clears the query cache and writes a `localStorage` key so other tabs sync. `ProtectedRoute` / `PublicRoute` gate the router based on auth state.

### Navigation

Route structure (defined in `App.tsx`):
- `/login`, `/register` — public
- `/managment/exercises`, `/managment/trains`, `/managment/trains/:id` — protected, inside `Dashboard`
- `/train-sessions` — protected, renders `TrainSessions` (which decides between the remote widget and a coming-soon fallback)

Navigation config for the sidebar and bottom bar lives in `src/shared/navigation/config/`.

## Styling rules

- No raw HTML tags (`div`, `span`, `button`, `input`, `ul`, `li`). Use MUI equivalents.
- All styling via `sx` prop only. No CSS/SCSS files for components, no inline `style={{}}`.

## TanStack Query rules

- `useQuery` / `useMutation` hooks belong only in `queries/hooks/`. Never define them inline in components or business hooks.
- Cache invalidation and optimistic updates stay inside the query/mutation hook.
- Business hooks in `hooks/` compose query hooks; they don't call `useQuery` directly.

## Microfrontend rules

- Do not import internal host modules into remotes.
- Wrap every remote load in `<ErrorBoundary>` + `<Suspense>`.
- Shared libraries (`react`, `react-dom`, `@mui/material`, `@emotion/*`, `@tanstack/react-query`) are declared as `shared` in `vite.config.ts` — do not bundle them separately in the host.

## Architectural Principles

- Prefer composition over deep nesting.
- Keep components focused.
- Avoid unnecessary global state.
- Reuse existing patterns before creating new abstractions.

## Agent Rules

Before implementation:
1. Inspect existing architecture.
2. Reuse existing patterns.

## Forbidden

- Do not introduce new state-management libraries.
- Do not introduce new styling libraries.
- Do not introduce new UI libraries.
# Architecture Context

## Stack

| Layer | Technology | Role |
| --- | --- | --- |
| Framework | React 19 + TypeScript 5 + Vite | SPA host — routing, layout, auth shell |
| UI library | MUI (Material UI) v7 + Emotion | All components and styling |
| State/data | TanStack Query v5 | Server state, caching, mutations, pagination |
| Forms | React Hook Form v7 | Configuration-driven form management |
| Routing | React Router DOM v7 | Client-side routing and route guards |
| HTTP | Axios | API client with error normalization |
| Drag-and-drop | dnd-kit | Exercise reordering inside training plans |
| Microfrontend | @originjs/vite-plugin-federation | Module Federation — loads Training Sessions remote |
| Backend | NestJS + PostgreSQL | REST API for all domain data (hosted on Railway) |
| Deployment | Vercel (frontend) + Railway (backend) | SPA deploy and API hosting |

## System Boundaries

- `src/features/` — feature modules; each owns its own components, hooks, queries, services, types, forms, filters, and utils.
- `src/shared/` — cross-feature reusables: components, hooks, API client, navigation config, types, and utilities.
- `src/lib/` — singleton infrastructure (QueryClient instance).
- `trainingSessions/CurrentSessionWidget` (remote) — a separately deployed microfrontend loaded at runtime via Module Federation. It is fully isolated from host internals.
- `/api` proxy — Vite dev server proxies `/api` to `VITE_API_URL`. Production routing via Vercel (Needs confirmation — no `vercel.json` found in this repo).

## API Contract

- The frontend communicates with the backend through a centralized Axios client.
- All API calls use the `/api` prefix.
- Requests include credentials by default to support cookie-based auth.
- API errors are normalized into a shared `ApiError` shape before reaching UI/business hooks.
- Feature services own endpoint-specific calls and payload mapping.
- Components must not call Axios directly.

## Microfrontend Architecture

- The host loads the Training Sessions remote at runtime using Vite Module Federation.
- The remote is isolated from host internals and communicates only through explicit props.
- The host owns shell concerns: routing, layout, auth context, error boundary, suspense fallback, and shared QueryClient.
- The remote owns Training Sessions UI and session-specific behavior.
- Remote failures must not crash the host.
- Shared dependencies must stay aligned between host and remote.

## Auth and Access Model

- Authentication is cookie-based using an `httpOnly` session cookie.
- The frontend never stores JWTs or auth tokens in localStorage.
- API requests include credentials by default.
- Protected application areas require an authenticated user.
- Public authentication screens are unavailable to already-authenticated users.
- Logout must clear server-side session state and invalidate client-side cached user/domain data.
- Cross-tab logout synchronization may be used to keep browser tabs consistent.

## Storage Model

- **Backend database (PostgreSQL via NestJS)**: all domain data — users, exercises, categories, training plans, training plan exercises, training sessions.
- **No client-side persistence**: all state lives in TanStack Query cache (in-memory, evicted on page reload) or in React state. No localStorage for domain data.
- **Cookie**: session token managed by the browser and the backend. No JWT in localStorage.

## Invariants

1. All UI components come from MUI — no raw HTML tags (`div`, `span`, `ul`, `li`, `button`, `input`).
2. All styling uses the MUI `sx` prop — no CSS/SCSS files for components, no inline `style={{}}`.
3. `useQuery` and `useMutation` definitions live exclusively in `queries/hooks/` — never inline in components or business hooks.
4. Business hooks in `hooks/` compose query hooks; they never call `useQuery` directly.
5. Every remote load is wrapped in `<ErrorBoundary>` + `<Suspense>`.
6. Libraries declared as `shared` in `vite.config.ts` must never be separately bundled in the host.
7. The API client normalizes all errors to `ApiError`; services throw — they never `console.error`.
8. No new state-management libraries, styling libraries, or UI libraries may be introduced.
9. Skeleton loading states should be colocated with the component they represent and should closely match the final rendered UI. Avoid rendering unrelated or generic skeletons from parent components.

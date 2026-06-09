## Application Building Context

Read the following files in order before implementing or making any architectural decision:

1. `context/project-overview.md` — product definition, goals, features, and scope
2. `context/architecture-context.md` — system structure, boundaries, storage model, and invariants
3. `context/ui-context.md` — theme, colors, typography, canvas design, and component conventions
4. `context/code-standards.md` — implementation rules and conventions
5. `context/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
6. `context/progress-tracker.md` — current phase, completed work, open questions, and next steps

Update `context/progress-tracker.md` after each meaningful implementation change.

If implementation changes the architecture, scope, or standards documented in the context files, update the relevant file before continuing.

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

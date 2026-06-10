# UI Context

## Theme

Light mode (MUI default Material Design palette). No dark mode. The visual language is clean and functional — Material Design defaults with a global border radius of `8px`.

Theme is defined in `src/theme.ts` and applied via MUI `<ThemeProvider>` at the app root (Needs confirmation — ThemeProvider usage not verified in `src/main.tsx`).

## Colors

Colors come from the MUI default theme palette. Components must not use hardcoded hex values — rely on theme palette tokens via `sx` theme callbacks.

| Role | MUI Token |
| --- | --- |
| Primary action | `theme.palette.primary.main` |
| Secondary action | `theme.palette.secondary.main` |
| Error / destructive | `theme.palette.error.main` |
| Success | `theme.palette.success.main` |
| Page background | `theme.palette.background.default` |
| Surface / paper | `theme.palette.background.paper` |

## Typography

MUI default typography scale. No custom fonts configured in `src/theme.ts`. The base font is the browser/OS default Material Design font stack.

## Border Radius

Global: `8px` (set in `theme.shape.borderRadius`). MUI components inherit this automatically. Do not override it inline.

## Component Library

MUI (Material UI) v7. All UI components come from `@mui/material` and icons from `@mui/icons-material`. No additional component libraries.

There is no custom design token layer — all tokens flow from the MUI theme.

## MUI Customization Rules

- Prefer existing MUI component APIs before introducing custom styling.
- When a visual requirement can be achieved through built-in MUI props, use those props instead of custom CSS.
- Use `sx` only for component-specific styling that cannot be achieved through existing MUI APIs or theme configuration.
- Keep `sx` small and localized to the component that needs it.
- Do not override default MUI styles without a clear product or UX requirement.

## Reusable Patterns

- If a customization is reused across multiple places, prefer extending the MUI theme or creating a shared component rather than duplicating styling.
- Reusable customizations should be exposed through component APIs (such as props, theme configuration, or shared components) instead of repeated `sx` blocks.
- Avoid creating reusable abstractions for one-off use cases.

## Layout Patterns

- Desktop uses a persistent sidebar navigation.
- Mobile uses bottom navigation.
- Content is organized into card-based surfaces.
- Create/edit flows are presented in modal dialogs.
- Lists provide filtering and search controls near the top of the page.
- Success and error feedback is shown inline near the relevant action.

## Skeletons

Skeleton loading states should closely match the final rendered content.

- Use skeletons that preserve the expected layout, spacing, and visual hierarchy of the loaded UI.
- Match the approximate size and shape of the real elements, such as cards, titles, metadata rows, buttons, and list items.
- Prefer multiple smaller skeleton elements over one large generic block when the final content has distinct parts.
- Avoid skeleton layouts that cause visible layout shift when data appears.
- Keep skeleton styling consistent with MUI defaults unless there is a clear UX reason to customize it.

## Forms

- Forms should use consistent field styling throughout the application.
- Searchable inputs should be preferred when selecting from large datasets.
- Multi-select controls should be used when assigning multiple entities.
- Validation feedback should be shown inline near the affected field.
- Create and edit forms should follow the same interaction patterns.

## Data Presentation

- Entity collections are typically displayed as card-based lists.
- Item actions should be accessible directly from the item being displayed.
- Selection workflows should provide clear visual selection state.
- Reordering workflows should provide drag-and-drop interaction.
- Loading states should use skeleton placeholders to reduce layout shift.

## Icons

MUI Icons (`@mui/icons-material`). Outline/filled variants as provided by the MUI icon set. Sizing follows MUI defaults for the context (inline use, button icons, empty state icons).

# Feature: Exercise Card Redesign

Read `context/AGENTS.md` before starting

## Goal

Redesign exercise cards across the application to provide a more modern, minimalistic, and visually appealing experience.

The card should prioritize readability and exercise recognition rather than displaying all available exercise data.

## Requirements

### Code

- Do not modify the existing `DataCard` component in this task.
- Create a dedicated `ExerciseCard` component for the redesigned exercise cards.
- Keep the new card implementation isolated until the design is approved and validated.
- After the design is finalized, evaluate whether the shared `DataCard` should be redesigned in a separate task.

### Interaction

- Clicking anywhere on the card opens `ExerciseDetailsModal`.
- The entire card should behave as a single interactive surface.
- Hover and focus states should clearly indicate clickability.

### Content

Required:
- Exercise name
- Exercise category

Optional:
- Secondary exercise information when it improves the visual design or information hierarchy
- Examples: sets, reps, weight, duration

The card should NOT display:
- Internal IDs
- Timestamps
- Technical metadata
- Large blocks of text
- Secondary information that creates visual clutter

### Visual Direction

The design should be:

- Modern
- Minimalistic
- Mobile-friendly
- Consistent with the existing MUI design language
- Suitable for both light and dark themes

Focus on:
- Clear visual hierarchy
- Generous spacing
- Clean typography
- Subtle elevation and hover effects
- Ensure the new card design is used consistently across the application.

## Design Exploration

Explore and propose multiple design directions.

- Analyze the existing card design
- Create several visually distinct approaches that can be viewed in the app
- Explain the reasoning behind each approach
- Recommend the strongest option

## Approval Gate

After presenting the design options, stop and ask for approval.

Do not:
- Implement the redesign
- Replace existing card usages
- Modify production card behavior

Implementation may begin only after a design direction is explicitly approved.

## Check when done

- Ensure you don't break the design of the training card.
- Existing card menu actions still exist and work correctly.
- The new card has skeleton that fits the new design.
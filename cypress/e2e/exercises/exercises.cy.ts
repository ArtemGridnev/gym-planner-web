import { generateTestEmail } from "../../utils/generateTestEmail";

describe('Exercises', () => {
    const email = generateTestEmail();

    const categories = [
        { id: 1, name: 'Chest' },
        { id: 3, name: 'Legs' }
    ];

    before(() => {
        cy.registerFreshUser(email);
        
        const exercises = Array.from({ length: 25 }, (_, i) => ({
            name: `Exercise ${i + 1}`,
            categoryId: categories[i % 2].id,
        }));
        
        exercises.forEach(exercise => {
            cy.addExercise(exercise);
        });
        
        cy.logout();
    });

    it('Empty state: Show no data message when there are no items.', () => {
        const email = generateTestEmail();

        cy.registerFreshUser(email);

        cy.get('[data-testid="exercises-nav-item"]').click();

        cy.get('[data-testid="exercises-page"] [data-testid="list-no-data-message"]').should('have.exist');

        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]').should('have.length', 0);
    });

    it('Search and category filtering: Filtering works and displays correct results.', () => {
        cy.login(email);
        cy.get('[data-testid="exercises-nav-item"]').click();
        
        cy.get('[data-testid="exercises-list-filters"] [name="search"]').type('Exercise 12');
        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]').should('have.length', 1);
        cy.get('[data-testid="exercises-list-filters"] [name="search"]').clear();

        cy.get('[data-testid="exercises-list-filters"] [name="category"]').focus().type('Chest');
        cy.get('[role="listbox"] li[data-option-index="0"]').click();
        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]').should('have.length', 12);
    });

    it('Create exercise: User can create a new exercise successfully.', () => {
        cy.login(email);

        cy.get('[data-testid="exercises-nav-item"]').click();

        cy.get('[data-testid="exercises-page"]').within(() => {
            cy.get('[data-testid="create-exercise-button"]').click();
        });

        cy.get('[data-testid="exercise-form"]').within(() => {
            cy.get('[name="category"] input')
                .focus()
                .type('Chest');
  
            cy.get('[role="listbox"] li[data-option-index="0"]')
                .click();

            cy.get('input[name="name"]').type('Create test exercise');
            cy.get('textarea[name="description"]').type('A bodyweight exercise that primarily targets the chest, shoulders, and triceps.');
            cy.get('input[name="sets"]').type('3');
            cy.get('input[name="reps"]').type('12');
            cy.get('input[name="durationSeconds"]').type('60');
            cy.get('input[name="weight"]').type('20');
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]').contains('Create test exercise').should('exist');

        cy.reload();

        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]').contains('Create test exercise').should('exist');
    });

    it('Pagination: Pagination works properly and updates the list correctly.', () => {
        cy.login(email);
        cy.get('[data-testid="exercises-nav-item"]').click();

        cy.verifyInfiniteScrollAddsItems('[data-testid="exercises-list"] [data-testid="data-card"]', '[data-testid="exercises-list-container"]');
        cy.verifyInfiniteScrollAddsItems('[data-testid="exercises-list"] [data-testid="data-card"]', '[data-testid="exercises-list-container"]');
    });

    it('Edit exercise: User can edit exercise details and see updated information.', () => {
        cy.login(email);
        cy.get('[data-testid="exercises-nav-item"]').click();

        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]').first().within(() => {
            cy.get('[data-testid="data-card-actions-button"]').click();
        });

        cy.get('[data-testid="edit-exercise-button"]').click();

        cy.get('[data-testid="exercise-form"]').within(() => {
            cy.get('input[name="name"]').clear().type('Updated Exercise Name');
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]')
            .contains('Updated Exercise Name')
            .should('exist');

        cy.reload();

        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]')
            .contains('Updated Exercise Name')
            .should('exist');
    });

    it('Delete exercise: User can delete an exercise, and it is removed from the list.', () => {
        cy.login(email);

        cy.get('[data-testid="exercises-nav-item"]').click();

        cy.get('[data-testid="exercises-page"]').within(() => {
            cy.get('[data-testid="create-exercise-button"]').click();
        });

        cy.get('[data-testid="exercise-form"]').within(() => {
            cy.get('[name="category"] input')
                .focus()
                .type('Chest');

            cy.get('[role="listbox"] li[data-option-index="0"]')
                .click();

            cy.get('input[name="name"]').type('Delete test exercise');
            cy.get('textarea[name="description"]').type('A bodyweight exercise that primarily targets the chest, shoulders, and triceps.');
            cy.get('input[name="weight"]').type('20');
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="exercises-list"] [data-testid="data-card"]')
            .contains('Delete test exercise')
            .closest('[data-testid="data-card"]')
            .within(() => {
                cy.get('[data-testid="data-card-actions-button"]').click();
            });

        cy.get('[data-testid="delete-exercise-button"]').click();

        cy.get('[data-testid="exercises-list"]').should('not.contain', 'Delete test exercise');
        
        cy.reload();

        cy.get('[data-testid="exercises-list"]').should('not.contain', 'Delete test exercise');
    });
});
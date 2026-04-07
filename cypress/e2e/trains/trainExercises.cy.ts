import { generateTestEmail } from "../../utils/generateTestEmail";

describe('Train Exercises', () => {
    const email = generateTestEmail();

    const categories = [
        { id: 1, name: 'Chest' },
        { id: 3, name: 'Legs' }
    ];

    before(() => {
        cy.registerFreshUser(email);

        const exercises = Array.from({ length: 5 }, (_, i) => ({
            name: `Exercise ${i + 1}`,
            categoryId: categories[i % 2].id,
        }));

        exercises.forEach(exercise => {
            cy.addExercise(exercise);
        });

        cy.logout();
    });

    beforeEach(() => {
        cy.intercept('POST', '**/auth/login**').as('login');
        cy.login(email);
        cy.wait('@login');
    });

    it('Handle missing traininging: Display an appropriate message if the traininging is not found.', () => {
        cy.visit('/managment/trains/9999');

        cy.get('[data-testid="train-not-found"]').should('exist');
    });

    it('Empty state: Show “No exercises yet” when there are no exercises in the training.', () => {
        cy.addTrain({
            name: 'No data message test training',
            recurrenceCron: "0 0 * * 1,3",
        });

        cy.get('[data-testid="trains-nav-item"]').click();

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('No data message test training').click();

        cy.get('[data-testid="train-page"]').within(() => {
            cy.get('[data-testid="list-no-data-message"]').should('exist');
        });
    });

    it('Add exercise: User can add a new exercise to the training.', () => {
        cy.addTrain({
            name: 'Add test training',
            recurrenceCron: "0 0 * * 1,3",
        });

        cy.get('[data-testid="trains-nav-item"]').click();

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('Add test training').click();

        cy.get('[data-testid="add-exercises-button"]').click();

        cy.get('[data-testid="exercises-select-modal"]').within(() => {
            cy.get('[data-testid="exercises-selectable-list"]').within(() => {
                cy.get('input[type="checkbox"]').first().check();
            });

            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]').should('exist');

        cy.reload();

        cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]').should('exist');
    });

    it('Remove exercise: User can remove an exercise from the training.', () => {
        cy.addTrain({
            name: 'Remove test training',
            recurrenceCron: "0 0 * * 1,3",
        });

        cy.get('[data-testid="trains-nav-item"]').click();

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('Remove test training').click();

        cy.get('[data-testid="add-exercises-button"]').click();

        cy.get('[data-testid="exercises-select-modal"]').within(() => {
            cy.get('[data-testid="exercises-selectable-list"]').within(() => {
                cy.get('input[type="checkbox"]').first().check();
            });

            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]')
            .closest('[data-testid="data-card"]')
            .within(() => {
                cy.get('[data-testid="data-card-actions-button"]').click();
            });

        cy.get('[data-testid="remove-exercise-button"]').click();

        cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]').should('not.exist');

        cy.reload();

        cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]').should('not.exist');
    });

    it('Reorder exercises: User can change the exercise order, and the new order is saved.', () => {
        cy.addTrain({
            name: 'Reorder test training',
            recurrenceCron: "0 0 * * 1,3",
        });

        cy.get('[data-testid="trains-nav-item"]').click();

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('Reorder test training').click();

        cy.get('[data-testid="add-exercises-button"]').click();

        // Add 3 exercises
        cy.get('[data-testid="exercises-select-modal"]').within(() => {
            cy.get('input[type="checkbox"]').eq(0).check();
            cy.get('input[type="checkbox"]').eq(1).check();
            cy.get('input[type="checkbox"]').eq(2).check();
            cy.get('button[type="submit"]').click();
        });

        // Get initial order (Exercise 1, 2, 3)
        cy.get('[data-testid="train-exercises-list"] [data-testid="data-card-title"]')
            .then($els => [...$els].map(el => el.innerText.trim()))
            .as('initialOrder');

        cy.wait(2000);

        // Drag first item to bottom
        cy.get(`[data-testid*="draggable-data-card-list-item-"]`).first().invoke('attr', 'data-testid').as('firstCardDataTestId');
        
        cy.get('@firstCardDataTestId').then(firstCardDataTestId => {
            cy.get(`[data-testid="${firstCardDataTestId}"] [data-testid="sortable-item-drag-handle"]`).should('exist').focus().should('have.focus').type('{enter}').wait(500);
            cy.get(`[data-testid="${firstCardDataTestId}"] [data-testid="sortable-item-drag-handle"]`).should('exist').focus().should('have.focus').type('{downarrow}').wait(500);
            cy.get(`[data-testid="${firstCardDataTestId}"] [data-testid="sortable-item-drag-handle"]`).should('exist').focus().should('have.focus').type('{downarrow}').wait(500);
            cy.get(`[data-testid="${firstCardDataTestId}"] [data-testid="sortable-item-drag-handle"]`).should('exist').focus().should('have.focus').type('{enter}').wait(500);
        });
        

        // Verify new order (Exercise 2, 3, 1)
        cy.get('@initialOrder').then(initialOrder => {
            cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]').first().within(() => {
                cy.get('[data-testid="data-card-title"]').should('not.contain', initialOrder[0]);
            });

            cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]').last().within(() => {
                cy.get('[data-testid="data-card-title"]').should('contain', initialOrder[0]);
            });
        });

        // Verify persists after reload
        cy.reload();

        cy.get('@initialOrder').then(initialOrder => {
            cy.get('[data-testid="train-exercises-list"] [data-testid="data-card"]').last().within(() => {
                cy.get('[data-testid="data-card-title"]').should('contain', initialOrder[0]);
            });
        });
    });

});
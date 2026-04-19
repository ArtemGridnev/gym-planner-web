import { generateTestEmail } from "../../utils/generateTestEmail";

describe('Trains', () => {
    const email = generateTestEmail();

    before(() => {
        cy.registerFreshUser(email);
        cy.logout();
    });

    beforeEach(() => {
        cy.login(email);

        cy.get('[data-testid="trains-nav-item"]').click();
    });

    it('Empty state: Show no data message when there are no items.', () => {
        cy.get('[data-testid="trains-page"] [data-testid="list-no-data-message"]').should('have.exist');

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').should('have.length', 0);
    });

    it('Create train: User can create a new train successfully.', () => {
        cy.get('[data-testid="trains-page"]').within(() => {
            cy.get('[data-testid="create-train-button"]').click();
        });

        cy.get('[data-testid="train-form"]').within(() => {
            cy.get('input[name="name"]').type('Create test train');

            cy.get('[data-testid="days-toggle-button-group"]').within(() => {
                cy.get('button[value="0"]').click();
                cy.get('button[value="3"]').click();
            });
            
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('Create test train').should('exist');

        cy.reload();

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('Create test train').should('exist');
    });


    it('Edit training: User can edit training details and see updated information.', () => {
        cy.get('[data-testid="trains-page"]').within(() => {
            cy.get('[data-testid="create-train-button"]').click();
        });

        cy.get('[data-testid="train-form"]').within(() => {
            cy.get('input[name="name"]').type('Update test train');

            cy.get('[data-testid="days-toggle-button-group"]').within(() => {
                cy.get('button[value="0"]').click();
                cy.get('button[value="3"]').click();
            });
            
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]')
            .contains('Update test train')
            .closest('[data-testid="data-card"]')
            .within(() => {
                cy.get('[data-testid="data-card-actions-button"]').click();
            });

        cy.get('[data-testid="edit-train-button"]').click();

        cy.get('[data-testid="train-form"]').within(() => {
            cy.get('input[name="name"]').clear().type('Update test train 1');
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]')
            .contains('Update test train 1')
            .should('exist');

        cy.reload();

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]')
            .contains('Update test train 1')
            .should('exist');
    });

    it('Delete training: User can delete an training, and it is removed from the list.', () => {
        cy.get('[data-testid="trains-page"]').within(() => {
            cy.get('[data-testid="create-train-button"]').click();
        });

        cy.get('[data-testid="train-form"]').within(() => {
            cy.get('input[name="name"]').type('Delete test train');

            cy.get('[data-testid="days-toggle-button-group"]').within(() => {
                cy.get('button[value="0"]').click();
                cy.get('button[value="3"]').click();
            });
            
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('Delete test train').should('exist');

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]')
            .contains('Delete test train')
            .closest('[data-testid="data-card"]')
            .within(() => {
                cy.get('[data-testid="data-card-actions-button"]').click();
            });

        cy.get('[data-testid="delete-train-button"]').click();

        cy.get('[data-testid="trains-list"]').should('not.contain', 'Delete test train');
        
        cy.reload();
        
        cy.get('[data-testid="trains-list"]').should('not.contain', 'Delete test train');
    });

    it('Open training details: Clicking a training opens its training Exercises Management page.', () => {
        cy.get('[data-testid="trains-page"]').within(() => {
            cy.get('[data-testid="create-train-button"]').click();
        });

        cy.get('[data-testid="train-form"]').within(() => {
            cy.get('input[name="name"]').type('Details test train');

            cy.get('[data-testid="days-toggle-button-group"]').within(() => {
                cy.get('button[value="0"]').click();
                cy.get('button[value="3"]').click();
            });
            
            cy.get('button[type="submit"]').click();
        });

        cy.get('[data-testid="trains-list"] [data-testid="data-card"]').contains('Details test train').should('exist').click();

        cy.url().should('include', '/managment/trains/');
    });
});
import { generateTestEmail } from "../../utils/generateTestEmail";

describe('Training Sessions microfrontend integration', () => {
    const email = generateTestEmail();

    before(() => {
        cy.registerFreshUser(email);
        cy.logout();
    });

    it('Loads MF: Training Sessions microfrontend renders without a host fallback.', () => {
        cy.login(email);

        cy.get('[data-testid="train-sessions-nav-item"]').click();
        cy.url().should('include', '/train-sessions');

        cy.get('[data-testid="trainings-empty-state"]').should('exist');
        cy.contains('Widget unavailable').should('not.exist');
    });

    it('Refresh: Microfrontend still renders after reloading the Training Sessions page.', () => {
        cy.login(email);

        cy.get('[data-testid="train-sessions-nav-item"]').click();
        cy.url().should('include', '/train-sessions');

        cy.reload();

        cy.url().should('include', '/train-sessions');
        cy.get('[data-testid="trainings-empty-state"]').should('exist');
        cy.contains('Widget unavailable').should('not.exist');
    });

    it('Fallback: Host shows the fallback UI when the remote entry fails to load.', () => {
        cy.intercept('GET', '**/remoteEntry.js', { forceNetworkError: true }).as('remoteEntry');

        cy.login(email);

        cy.get('[data-testid="train-sessions-nav-item"]').click();
        cy.url().should('include', '/train-sessions');

        cy.contains('Widget unavailable').should('exist');
        cy.get('[data-testid="trainings-empty-state"]').should('not.exist');
    });
});

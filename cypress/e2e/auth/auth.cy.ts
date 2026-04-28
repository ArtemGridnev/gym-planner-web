import { generateTestEmail } from "../../utils/generateTestEmail";

describe('Authentication', () => {
    const email = generateTestEmail();

    it('Register: User can register successfully.', () => {
        cy.registerFreshUser(email);

        cy.url().should('include', '/managment/trains');
    });

    it('Login: User can log in with valid credentials.', () => {
        cy.login(email);

        cy.url().should('include', '/managment/trains')
    });

    it('Logout: User can log out successfully.', () => {
        cy.login(email);

        cy.url().should('include', '/managment/trains');

        cy.get('[data-testid="user-profile-button"]').click();
        cy.contains('logout').click();

        cy.url().should('include', '/login');
    });
});
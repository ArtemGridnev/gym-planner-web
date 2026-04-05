/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string, password: string = "Password123@") => {
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('registerFreshUser', (email: string, password: string = "Password123@") => {
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('Testov');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="validatePassword"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/train-sessions');
});

Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="user-profile-button"]').click();
    cy.contains('logout').click();
    cy.url().should('include', '/login');
});

Cypress.Commands.add('addExercise', (exerciseData) => {
    cy.request({
        method: 'POST',
        url: `/api/exercises`,
        body: exerciseData,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(201);
        return response.body;
    });
});

Cypress.Commands.add('addTrain', (trainData) => {
    cy.request({
        method: 'POST',
        url: `/api/trains`,
        body: trainData,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(201);
        return response.body;
    });
});

Cypress.Commands.add('verifyInfiniteScrollAddsItems', (selector, scrollContainerSelector, minAdded = 1) => {
    cy.get(selector).then(($items) => {
        const beforeCount = $items.length;
        cy.get(scrollContainerSelector).scrollTo('bottom', { duration: 500 });
        cy.get(selector).should(($newItems) => {
            expect($newItems.length).to.be.gte(beforeCount + minAdded);
        });
    });
});

Cypress.Commands.add('drag', { prevSubject: 'element' }, (sourceEl, targetSelector) => {
    cy.wrap(sourceEl).as('source');

    cy.get('@source').trigger('pointerdown', {
        force: true,
        isPrimary: true,
        button: 0,
    });

    cy.wait(1_000);

    cy.get(targetSelector).then($target => {
        const targetRect = $target[0].getBoundingClientRect();
        const x = targetRect.x + targetRect.width / 2;
        const y = targetRect.y + targetRect.height / 2;

        cy.get('@source')
            .trigger('pointermove', {
                clientX: x,
                clientY: y,
                force: true,
                isPrimary: true,
                button: 0,
            });

        cy.wait(1000);

        cy.get(targetSelector)
            .trigger('pointerup', {
                force: true,
                isPrimary: true,
                button: 0,
            });
    });
});

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to login a user
             * @example cy.login('test@email.com', 'Password123@')
             */
            login(email: string, password?: string): Chainable<void>;
            /**
             * Custom command to register a new user with random email
             * @example cy.registerFreshUser()
             */
            registerFreshUser(email: string, password?: string): Chainable<void>;
            /**
             * Custom command to logout the current user
             * @example cy.logout()
             */
            logout(): Chainable<void>;
            /**
             * Custom command to add an exercise via API
             * @example cy.addExercise({ name: 'Push Up', category: 'Chest', ... })
             */
            addExercise(exerciseData: object): Chainable<any>;
            /**
             * Custom command to add a train via API
             * @example cy.addTrain({ name: 'Back Day', recurrenceCron: "0 0 * * 1,3", ... })
             */
            addTrain(trainData: object): Chainable<any>;
            /**
            * Custom command to verify infinite scroll loads more items
            * @example cy.verifyInfiniteScrollAddsItems('.exercise-item', '.exercise-list-container')
            */
            verifyInfiniteScrollAddsItems(selector: string, scrollContainerSelector: string, minAdded?: number): Chainable<void>;
            /**
             * Custom command to drag an element to a target
             * @example cy.get('.draggable').drag('.drop-target')
             */
            drag(targetSelector: string): Chainable<void>;
        }
    }
}

export { };
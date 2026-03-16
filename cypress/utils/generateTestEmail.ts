export function generateTestEmail() {
    return `qa_${Date.now()}_${Cypress._.random(1000)}@mail.com`;
}
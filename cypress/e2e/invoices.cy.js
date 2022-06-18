describe('/invoices', () => {
  const TEST_USER_EMAIL = 'fake_user5@officehourtesting.com';
  const TEST_USER_PASSWORD = '123456';

  before(() => {
    cy.clearCookies();
    cy.visit('http://localhost:3000/login');

    cy.get('[data-test="email"]').should('be.visible');
    cy.get('[data-test="email"]').type(`${TEST_USER_EMAIL}`);
    cy.get('[data-test="password"]').type(`${TEST_USER_PASSWORD}`);
    cy.get('[data-test="submit-login"]').click();

    cy.location('pathname').should('eq', '/');
  });

  it('Should redirect to "invoices" page when "View All" button clicked', () => {
    cy.get(`[data-test='invoices-table']`).should('be.visible');
    cy.get(`[data-test='view-all-invoices']`).should('be.visible');
    cy.get('[data-test="view-all-invoices"]').click();

    cy.location('pathname').should('eq', '/invoices');
  });

  it('Should by default show first page with 10 invoices per page', () => {
    cy.get(`[data-test*="invoice-row"]`).should('have.length', 10);
    cy.get(`[data-test="invoices-table"] .MuiTablePagination-displayedRows`)
      .contains('1–10 of 43')
      .should('be.visible');
  });
});

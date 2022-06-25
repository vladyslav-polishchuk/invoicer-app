describe('/clients', () => {
  const TEST_USER_EMAIL = 'fake_user5@officehourtesting.com';
  const TEST_USER_PASSWORD = '123456';

  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:3000/login');

    cy.get('[data-test="email"]').should('be.visible');
    cy.get('[data-test="email"]').type(`${TEST_USER_EMAIL}`);
    cy.get('[data-test="password"]').type(`${TEST_USER_PASSWORD}`);
    cy.intercept({ method: 'POST', url: '/login' }).as('login');
    cy.get('[data-test="submit-login"]').click();
    cy.wait('@login');

    cy.intercept({ method: 'GET', url: '**/clients?**' }).as('apiClientsGet');
    cy.visit('http://localhost:3000/clients');
    cy.wait('@apiClientsGet');

    cy.location('pathname').should('eq', '/clients');

    cy.get(`[data-test="client-name"]`).should('be.visible');
  });

  it('Should redirect to "login" page when user is not logged in', () => {
    cy.clearCookies();
    cy.visit('http://localhost:3000/clients');

    cy.location('pathname').should('eq', '/login');
  });

  it('Should allow access to "clients" page when user is logged in', () => {
    cy.visit('http://localhost:3000/clients');

    cy.location('pathname').should('eq', '/clients');
  });

  it('Should redirect to "clients" page when "View All" button clicked', () => {
    cy.visit('http://localhost:3000');

    cy.get(`[data-test='clients-table']`).should('be.visible');
    cy.get(`[data-test='view-all-clients']`).should('be.visible');
    cy.get('[data-test="view-all-clients"]').click();

    cy.location('pathname').should('eq', '/clients');
  });

  it('Should redirect to "clients" page when header button clicked', () => {
    cy.visit('http://localhost:3000');

    cy.get(`[data-test='nav-bar'] [href='/clients']`).should('be.visible');
    cy.get(`[data-test='nav-bar'] [href='/clients']`).click();

    cy.location('pathname').should('eq', '/clients');
  });

  it('Should sort clients by name in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/clients?**' }).as('apiClientsGet');

    cy.get(`[data-test="client-name-header"]`).click();
    cy.wait('@apiClientsGet');

    cy.location('search').should('eq', '?sortBy=name&sortOrder=asc');
    cy.get(
      `[data-test="client-row-ap123456"] [data-test="client-name"]`
    ).contains('Tim Cook');

    cy.get(`[data-test="client-name-header"]`).click();
    cy.wait('@apiClientsGet');
    cy.location('search').should('eq', '?sortBy=name&sortOrder=desc');
    cy.get(
      `[data-test="client-row-ms123456"] [data-test="client-name"]`
    ).contains('Satya Nadella');
  });

  it('Should sort clients by company name in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/clients?**' }).as('apiClientsGet');

    cy.get(`[data-test="company-name-header"]`).click();
    cy.wait('@apiClientsGet');

    cy.location('search').should('eq', '?sortBy=companyName&sortOrder=asc');
    cy.get(
      `[data-test="client-row-ap123456"] [data-test="client-companyName"]`
    ).contains('Apple');

    cy.get(`[data-test="company-name-header"]`).click();
    cy.wait('@apiClientsGet');
    cy.location('search').should('eq', '?sortBy=companyName&sortOrder=desc');
    cy.get(
      `[data-test="client-row-ms123456"] [data-test="client-companyName"]`
    ).contains('Microsoft');
  });

  it('Should sort clients by billing in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/clients?**' }).as('apiClientsGet');

    cy.get(`[data-test="total-billed-header"]`).click();
    cy.wait('@apiClientsGet');

    cy.location('search').should('eq', '?sortBy=totalBilled&sortOrder=asc');
    cy.get(
      `[data-test="client-row-ms123456"] [data-test="client-totalBilled"]`
    ).contains('105798');

    cy.get(`[data-test="total-billed-header"]`).click();
    cy.wait('@apiClientsGet');
    cy.location('search').should('eq', '?sortBy=totalBilled&sortOrder=desc');
    cy.get(
      `[data-test="client-row-ap123456"] [data-test="client-totalBilled"]`
    ).contains('144384');
  });

  it('Should sort clients by invoice count in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/clients?**' }).as('apiClientsGet');

    cy.get(`[data-test="invoices-count-header"]`).click();
    cy.wait('@apiClientsGet');

    cy.location('search').should('eq', '?sortBy=invoicesCount&sortOrder=asc');
    cy.get(
      `[data-test="client-row-ms123456"] [data-test="client-invoicesCount"]`
    ).contains('20');

    cy.get(`[data-test="invoices-count-header"]`).click();
    cy.wait('@apiClientsGet');
    cy.location('search').should('eq', '?sortBy=invoicesCount&sortOrder=desc');
    cy.get(
      `[data-test="client-row-ap123456"] [data-test="client-invoicesCount"]`
    ).contains('23');
  });

  it('Should keep criteria after page is reloaded', () => {
    cy.visit('http://localhost:3000/clients?sortBy=companyName&sortOrder=asc');

    cy.get(`[data-test="client-companyName"]`).contains('Apple');
  });
});

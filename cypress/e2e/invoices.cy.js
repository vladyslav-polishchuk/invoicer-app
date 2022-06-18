describe('/invoices', () => {
  const TEST_USER_EMAIL = 'fake_user5@officehourtesting.com';
  const TEST_USER_PASSWORD = '123456';

  beforeEach(() => {
    cy.clearCookies();
    cy.visit('http://localhost:3000/login');

    cy.get('[data-test="email"]').should('be.visible');
    cy.get('[data-test="email"]').type(`${TEST_USER_EMAIL}`);
    cy.get('[data-test="password"]').type(`${TEST_USER_PASSWORD}`);
    cy.get('[data-test="submit-login"]').click();

    cy.intercept({ method: 'GET', url: '**/invoices?**' }).as('apiInvoicesGet');
    cy.visit('http://localhost:3000/invoices');
    cy.wait('@apiInvoicesGet');

    cy.location('pathname').should('eq', '/invoices');

    cy.get(`[data-test="invoice-number"]`).should('be.visible');
  });

  it('Should redirect to "login" page when user is not logged in', () => {
    cy.clearCookies();
    cy.visit('http://localhost:3000/invoices');

    cy.location('pathname').should('eq', '/login');
  });

  it('Should allow access to "invoices" page when user is logged in', () => {
    cy.visit('http://localhost:3000/invoices');

    cy.location('pathname').should('eq', '/invoices');
  });

  it('Should redirect to "invoices" page when "View All" button clicked', () => {
    cy.visit('http://localhost:3000');

    cy.get(`[data-test='invoices-table']`).should('be.visible');
    cy.get(`[data-test='view-all-invoices']`).should('be.visible');
    cy.get('[data-test="view-all-invoices"]').click();

    cy.location('pathname').should('eq', '/invoices');
  });

  it('Should redirect to "invoices" page when header button clicked', () => {
    cy.visit('http://localhost:3000');

    cy.get(`[data-test='nav-bar'] [href='/invoices']`).should('be.visible');
    cy.get(`[data-test='nav-bar'] [href='/invoices']`).click();

    cy.location('pathname').should('eq', '/invoices');
  });

  it('Should by default show first page with 10 invoices per page', () => {
    cy.get(`[data-test*="invoice-row"]`).should('have.length', 10);
    cy.get(`[data-test="invoices-table"] .MuiTablePagination-displayedRows`)
      .contains('1–10 of 43')
      .should('be.visible');
  });

  it('Should sort invoices by client in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/invoices?**' }).as('apiInvoicesGet');

    cy.get(`[data-test="company-name-header"]`).click();
    cy.wait('@apiInvoicesGet');

    cy.location('search').should('eq', '?sortBy=companyName&sortOrder=asc');
    cy.get(`[data-test="invoice-row-ap23"] [data-test="invoice-company"]`)
      .contains('Apple')
      .should('be.visible');

    cy.get(`[data-test="company-name-header"]`).click();
    cy.wait('@apiInvoicesGet');
    cy.location('search').should('eq', '?sortBy=companyName&sortOrder=desc');
    cy.get(`[data-test="invoice-row-ms1"] [data-test="invoice-company"]`)
      .contains('Microsoft')
      .should('be.visible');
  });

  it('Should sort invoices by creation date in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/invoices?**' }).as('apiInvoicesGet');

    cy.get(`[data-test="creation-date-header"]`).click();
    cy.wait('@apiInvoicesGet');

    cy.location('search').should('eq', '?sortBy=date&sortOrder=asc');
    cy.get(`[data-test="invoice-row-ms1"] [data-test="invoice-date"]`)
      .contains('Sun Apr 24 2022')
      .should('be.visible');

    cy.get(`[data-test="creation-date-header"]`).click();
    cy.wait('@apiInvoicesGet');
    cy.location('search').should('eq', '?sortBy=date&sortOrder=desc');
    cy.get(`[data-test="invoice-row-ap23"] [data-test="invoice-date"]`)
      .contains('Mon May 16 2022')
      .should('be.visible');
  });

  it('Should sort invoices by due date in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/invoices?**' }).as('apiInvoicesGet');

    cy.get(`[data-test="due-date-header"]`).click();
    cy.wait('@apiInvoicesGet');

    cy.location('search').should('eq', '?sortBy=dueDate&sortOrder=asc');
    cy.get(`[data-test="invoice-row-ms1"] [data-test="invoice-dueDate"]`)
      .contains('Tue May 24 2022')
      .should('be.visible');

    cy.get(`[data-test="due-date-header"]`).click();
    cy.wait('@apiInvoicesGet');
    cy.location('search').should('eq', '?sortBy=dueDate&sortOrder=desc');
    cy.get(`[data-test="invoice-row-ap23"] [data-test="invoice-dueDate"]`)
      .contains('Wed Jun 15 2022')
      .should('be.visible');
  });

  it('Should sort invoices by price in asc and desc orders when header colum clicked', () => {
    cy.intercept({ method: 'GET', url: '**/invoices?**' }).as('apiInvoicesGet');

    cy.get(`[data-test="total-header"]`).click();
    cy.wait('@apiInvoicesGet');

    cy.location('search').should('eq', '?sortBy=price&sortOrder=asc');
    cy.get(`[data-test="invoice-row-ms10"] [data-test="invoice-price"]`)
      .contains('4008$')
      .should('be.visible');

    cy.get(`[data-test="total-header"]`).click();
    cy.wait('@apiInvoicesGet');
    cy.location('search').should('eq', '?sortBy=price&sortOrder=desc');
    cy.get(`[data-test="invoice-row-ap7"] [data-test="invoice-price"]`)
      .contains('8108$')
      .should('be.visible');
  });

  it('Should filter company by name when filter is valid', () => {
    cy.intercept({ method: 'GET', url: '**/invoices?**' }).as('apiInvoicesGet');

    cy.get(`[data-test="company-filter"] input`).type('Micros').blur();
    cy.location('search').should('eq', '?companyFilter=Micros');
    cy.wait('@apiInvoicesGet');

    cy.get(`[data-test="invoice-company"]`)
      .contains('Microsoft')
      .should('be.visible');
  });

  it('Should show empty grid if company is invalid', () => {
    cy.intercept({ method: 'GET', url: '**/invoices?**' }).as('apiInvoicesGet');

    cy.get(`[data-test="company-filter"] input`).type('Unknown').blur();
    cy.location('search').should('eq', '?companyFilter=Unknown');

    cy.wait('@apiInvoicesGet');

    cy.get(`[data-test="empty-placeholder"]`).should('be.visible');
  });

  it('Should keep criteria after page is reloaded', () => {
    cy.visit(
      'http://localhost:3000/invoices?companyFilter=M&sortBy=date&sortOrder=asc&page=1'
    );

    cy.get(`[data-test="invoice-number"]`)
      .contains('1234-ms-12')
      .should('be.visible');
  });
});

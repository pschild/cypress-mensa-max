describe('template spec', () => {
  it('passes', () => {
    let balance;
    let daysWithOrder = [];
    const now = new Date();

    cy.visit(Cypress.env('login_url'));
    cy.get('#tbxEinrichtung').type(Cypress.env('einrichtung'));
    cy.get('#tbxBenutzername').type(Cypress.env('username'));
    cy.get('#tbxKennwort').type(Cypress.env('password'));
    cy.get('#btnLogin').click();

    cy.visit(Cypress.env('order_url'));
    cy.get('#lblKontostand').should('be.visible');
    cy.get('#lblKontostand').invoke('text')
      .then(text => {
        const euroRaw = text.match(/(\d+,\d+)/);
        balance = euroRaw ? parseFloat(euroRaw[0].replace(',', '.')) : undefined;
      })
      .then(() => cy.getOrdersOfVisibleWeek())
      .then(orders => daysWithOrder = [...daysWithOrder, ...orders])
      .then(() => cy.get('#btnVor').click())
      .then(() => cy.getOrdersOfVisibleWeek())
      .then(orders => daysWithOrder = [...daysWithOrder, ...orders])
      .then(() => cy.writeFile('./result.json', { now, balance, daysWithOrder }));
  })
});

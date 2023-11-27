describe('template spec', () => {
  it('passes', () => {
    let kontostand;
    let gebuchteTage = [];

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
        kontostand = euroRaw ? parseFloat(euroRaw[0].replace(',', '.')) : undefined;
      })
      .then(() => cy.getOrdersOfVisibleWeek())
      .then(orders => gebuchteTage = [...gebuchteTage, ...orders])
      .then(() => cy.get('#btnVor').click())
      .then(() => cy.getOrdersOfVisibleWeek())
      .then(orders => gebuchteTage = [...gebuchteTage, ...orders])
      .then(() => cy.writeFile('./result.json', { kontostand, gebuchteTage }));
  })
});

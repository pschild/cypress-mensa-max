describe('template spec', () => {
  it('passes', () => {
    let kontostand;
    let gebuchteTage = [];

    cy.visit('');
    cy.get('#tbxEinrichtung').type('');
    cy.get('#tbxBenutzername').type('');
    cy.get('#tbxKennwort').type('');
    cy.get('#btnLogin').click();

    cy.visit('https://login.mensaservice.de/mensamax/Essenbestellung/bestellen-stornieren/PlanForm.aspx');
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

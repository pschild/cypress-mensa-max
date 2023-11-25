// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getOrdersOfVisibleWeek', () => {
  const orderIndexList = [];
  const daysWithOrder = [];
  return cy.get('table.dataform > tbody > tr').children('td')
    .each(($el, index) => {
      if ($el.hasClass('tdSelected')) {
        orderIndexList.push(index);
      }
    })
    .then(() => {
      return cy.get('table.dataform > thead > tr').children('th')
        .each(($el, index) => {
          if (orderIndexList.includes(index)) {
            daysWithOrder.push($el.text());
          }
        });
    })
    .then(() => cy.wrap(daysWithOrder));
});
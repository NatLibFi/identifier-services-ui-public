// Custom command to change the page language
Cypress.Commands.add('changeLanguage', language => {
  cy.getBySel('language-select-button').click();
  cy.getBySel('language-select-list').contains(language).click();
});

// Custom command to verify the turnstile notification regarding forms is displayed
Cypress.Commands.add('turnstileFormNotificationIsDisplayed', () => {
  cy.getBySel('turnstile-notification-text')
    .should('be.visible')
    .invoke('text')
    .should('equal', 'By proceeding to complete this form you agree and consent that the site is protected by an automated detection service to distinguish human users from bot users. In the process, the service provider (Cloudflare) receives information on your IP-address.');

  cy.changeLanguage('SV');
  cy.getBySel('turnstile-notification-text')
    .should('be.visible')
    .invoke('text')
    .should('equal', 'Genom att fylla i formuläret ger du samtycke till att en automatisk identifiering används för att skilja åt mänskliga användare från botanvändare. I samband med den automatiska identifieringen får tjänsteleverantören (Cloudflare) information om din IP-adress.');

  cy.changeLanguage('FI');
  cy.getBySel('turnstile-notification-text')
    .should('be.visible')
    .invoke('text')
    .should('equal', 'Siirtymällä täyttämään lomakkeen hyväksyt, että automaattista tunnistusta käytetään taustalla erottelemaan ihmiskäyttäjät robottikäyttäjistä. Automaattisen tunnistamisen yhteydessä tunnistamisen palveluntarjoaja (Cloudflare) saa tiedon IP-osoitteestasi.');
});

// Custom command for checking validation errors (input fields)
Cypress.Commands.add('checkInputValidationErrors', validationErrors => {
  for (const error of validationErrors) {
    cy.get(`input[name="${error}"]`).parent().should('have.class', 'Mui-error');
  }
});

// Custom command for checking validation errors (select fields)
Cypress.Commands.add('checkSelectValidationErrors', validationErrors => {
  for (const error of validationErrors) {
    cy.get(`select[name="${error}"]`)
      .parent()
      .should('have.class', 'Mui-error');
  }
});

// Custom command for verifying the notification banner displays success text in FIN language
// And browser has been redirected to the home page
Cypress.Commands.add('formSubmittedCorrectly', () => {
  cy.getBySel('notification-banner')
    .should('be.visible')
    .invoke('text')
    .should('equal', 'Lomake on lähetetty onnistuneesti.');

  cy.location('pathname').should('equal', '/');
});

// Custom commands for filling the ISBN form with valid data
Cypress.Commands.add('isbnFillStep1', isDissertation => {
  if (isDissertation) {
    cy.get('select').eq(0).select(1);
    cy.get('select').eq(1).select(2);
    return;
  }

  cy.get('select').eq(0).select(1);
  cy.get('select').eq(1).select(1);
});

Cypress.Commands.add('isbnFillStep2', () => {
  cy.get('input[name="officialName"]').type('Official name');
  cy.get('input[name="publisherIdentifierStr"]').type('1234567890');
  cy.get('input[name="address"]').type('Address');
  cy.get('input[name="zip"]').type('12345');
  cy.get('input[name="city"]').type('City');
  cy.get('input[name="phone"]').type('1234567890');
  cy.get('input[name="contactPerson"]').type('Contact person');
  cy.get('input[name="email"]').type('test@example.com');
});

Cypress.Commands.add('isbnFillStep3', () => {
  cy.get('select[name="publishedBefore"]').select(1);
  cy.get('select[name="publishingActivity"]').select(1);
  cy.get('input[name="publishingActivityAmount"]').type('123');
});

Cypress.Commands.add('isbnFillStep4', () => {
  cy.get('input[name="title"]').type('Title');
  cy.get('input[name="subtitle"]').type('Subtitle');
  cy.get('select[name="language"]').select(1);
  cy.get('select[name="publicationMonth"]').select(1);
  cy.get('select[name="publicationYear"]').select(3);
});

Cypress.Commands.add('isbnFillStep5', () => {
  cy.get('input[name="firstName"]').type('First name');
  cy.get('input[name="lastName"]').type('Last name');
  cy.get('.isbnAuthorsFields > div:last-child').click(); // Click to open multiselect dropdown (author role)
  cy.get('#react-select-2-option-0').click(); // Select the first option
  cy.get('.isbnAuthorsFields ~ button').click(); // Add author
});

Cypress.Commands.add('isbnFillStep6', () => {
  cy.get('input[name="series"]').type('Series');
  cy.get('input[name="issn"]').type('1234-5678');
  cy.get('input[name="volume"]').type('123');
});

Cypress.Commands.add('isbnFillStep7', () => {
  cy.get('select[name="publicationFormat"]').select(3);
  cy.get('.subContainer > div > div:nth-child(2)').click(); // Click to open multiselect dropdown (publication type)
  cy.get('#react-select-3-option-0').click(); // Select the first option
  cy.get('input[name="printingHouse"]').type('Printing house');
  cy.get('input[name="printingHouseCity"]').type('Printing house city');
  cy.get('select[name="edition"]').select(1);
  cy.get('input[name="copies"]').type('123');
  cy.get('.subContainer > div > div:nth-child(7)').click(); // Click to open multiselect dropdown (file format)
  cy.get('#react-select-4-option-0').click(); // Select the first option
});


Cypress.Commands.add('checkInternalLink', (selector, linkHref, linkText = '') => {
  if (linkText) {
    return cy.getBySel(selector)
      .should('have.attr', 'href', linkHref)
      .invoke('text')
      .should('equal', linkText);
  }

  return cy.getBySel(selector)
    .should('have.attr', 'href', linkHref);
});

Cypress.Commands.add('checkExternalLink', (selector, linkHref, linkText = '') => {
  if (linkText) {
    return cy.getBySel(selector)
      .should('have.attr', 'href', linkHref)
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'rel', 'noreferrer')
      .invoke('text')
      .should('equal', linkText);
  }

  return cy.getBySel(selector)
    .should('have.attr', 'href', linkHref)
    .should('have.attr', 'target', '_blank')
    .should('have.attr', 'rel', 'noreferrer');
});

// Cypress getter functions for elements with data-test -attribute
// From: https://github.com/cypress-io/cypress-realworld-app/blob/edd640b1e821a0f18cc3fef87bdae3c70c393d5d/cypress/support/commands.ts
// License: MIT, https://github.com/cypress-io/cypress-realworld-app/blob/edd640b1e821a0f18cc3fef87bdae3c70c393d5d/LICENSE
// Copyright (c): 2020 Cypress.io

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
  return cy.get(`[data-test*=${selector}]`, ...args);
});

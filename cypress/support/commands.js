// Custom command to change the page language
Cypress.Commands.add('changeLanguage', language => {
  cy.getBySel('language-select-button').click();
  cy.getBySel('language-select-list').contains(language).click();
});

// Custom command to verify the turnstile notification regarding forms is displayed
Cypress.Commands.add('turnstileFormNotificationIsDisplayed', () => {
  cy.changeLanguage('EN');

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

  cy.changeLanguage('FI');
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
    cy.get('select[name="publicationsPublic"]').select(1);
    cy.get('select[name="publicationType"]').select(2);
    return;
  }

  cy.get('select[name="publicationsPublic"]').select(1);
  cy.get('select[name="publicationType"]').select(1);
});

Cypress.Commands.add('isbnFillStep1Validations', () => {
  cy.get('select[name="publicationsPublic"]').select(0);
  cy.get('select[name="publicationType"]').select(0);

  // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
  cy.get('select[name="publicationsPublic"]').select(0);
  const validationErrorsSelect = ['publicationsPublic', 'publicationType'];

  // Run validation check for select fields
  cy.checkSelectValidationErrors(validationErrorsSelect);
  cy.getBySel('isbn-form-next-button').should('be.disabled');
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

Cypress.Commands.add('isbnFillStep2Validations', () => {
  // Clear required fields and type invalid data for fields with additional validation
  cy.get('input[name="officialName"]').type('Name');
  cy.get('input[name="officialName"]').clear();
  cy.get('input[name="address"]').type('Address');
  cy.get('input[name="address"]').clear();
  cy.get('input[name="zip"]').type('1');
  cy.get('input[name="city"]').type('1');
  cy.get('input[name="phone"]').type('abc');
  cy.get('input[name="contactPerson"]').type('Contact person');
  cy.get('input[name="contactPerson"]').clear();
  cy.get('input[name="email"]').type('1');

  // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
  cy.get('input[name="zip"]').click();

  // With input above there are should be validation errors for fields: officialName, address, zip, city, phone, contactPerson, email
  const validationErrorsInput = [
    'officialName',
    'address',
    'zip',
    'city',
    'phone',
    'contactPerson',
    'email'
  ];

  // Run validation check for input fields
  cy.checkInputValidationErrors(validationErrorsInput);
  cy.getBySel('isbn-form-next-button').should('be.disabled');

  // Clear fields so that tests may continue
  cy.get('input[name="officialName"]').clear();
  cy.get('input[name="address"]').clear();
  cy.get('input[name="zip"]').clear();
  cy.get('input[name="city"]').clear();
  cy.get('input[name="phone"]').clear();
  cy.get('input[name="contactPerson"]').clear();
  cy.get('input[name="email"]').clear();
});

Cypress.Commands.add('isbnFillStep3', () => {
  cy.get('select[name="publishedBefore"]').select(1);
  cy.get('select[name="publishingActivity"]').select(1);
  cy.get('input[name="publishingActivityAmount"]').type('123');
});

Cypress.Commands.add('isbnFillStep3Validations', () => {
  cy.get('select[name="publishingActivity"]').select(0);
  cy.get('input[name="publishingActivityAmount"]').type('123');
  cy.get('input[name="publishingActivityAmount"]').clear();
  cy.get('select[name="publishedBefore"]').select(0);

  // With input above there are should be validation errors for fields: publishingActivity, publishingActivityAmount
  const validationErrorsSelect = ['publishingActivity'];

  // Run validation check for select fields
  cy.checkSelectValidationErrors(validationErrorsSelect);
  cy.getBySel('isbn-form-next-button').should('be.disabled');

  // Clear fields so that tests may continue
  cy.get('input[name="publishingActivityAmount"]').clear();
});

Cypress.Commands.add('isbnFillStep4', () => {
  cy.get('input[name="title"]').type('Title');
  cy.get('input[name="subtitle"]').type('Subtitle');
  cy.get('select[name="language"]').select(1);
  cy.get('select[name="publicationMonth"]').select(1);
  cy.get('select[name="publicationYear"]').select(3);
});

Cypress.Commands.add('isbnFillStep4Validations', () => {
  cy.get('input[name="title"]').type('Title');
  cy.get('input[name="title"]').clear();
  cy.get('select[name="language"]').select(0);
  cy.get('select[name="publicationMonth"]').select(0);
  cy.get('select[name="publicationYear"]').select(0);
  cy.get('body').click();

  // With input above there are should be validation errors for fields: title, language, publicationMonth, publicationYear
  const validationErrorsInput = ['title'];

  const validationErrorsSelect = [
    'language',
    'publicationMonth',
    'publicationYear'
  ];

  // Run validation check for input fields
  cy.checkInputValidationErrors(validationErrorsInput);

  // Run validation check for select fields
  cy.checkSelectValidationErrors(validationErrorsSelect);
  cy.getBySel('isbn-form-next-button').should('be.disabled');
});

Cypress.Commands.add('isbnFillStep5', () => {
  cy.get('input[name="firstName"]').type('First name');
  cy.get('input[name="lastName"]').type('Last name');
  cy.get('input[aria-label="Rooli*"]').click(); // TODO: selectors here could be better
  cy.get('#react-select-2-option-0').click(); // Select the first option
  cy.getBySel('isbn-form-add-author-button').click(); // Add author
});

Cypress.Commands.add('isbnFillStep5Validations', () => {
  cy.get('input[name="firstName"]').type('First name');
  cy.get('input[name="lastName"]').type('Last name');
  cy.get('input[aria-label="Rooli*"]').click();
  cy.get('#react-select-2-option-0').click(); // Select the first option
  cy.getBySel('isbn-form-add-author-button').click(); // Add author
  cy.getBySel('remove-author-button').click(); // Remove author

  cy.getBySel('isbn-form-next-button').should('be.disabled');
});

Cypress.Commands.add('isbnFillStep6', () => {
  cy.get('input[name="series"]').type('Series');
  cy.get('input[name="issn"]').type('1234-5678');
  cy.get('input[name="volume"]').type('123');
});

Cypress.Commands.add('isbnFillStep6Validations', () => {
  cy.get('input[name="issn"]').type('abc');
  cy.get('input[name="volume"]').type('123');

  // With input above there are should be validation errors for fields: issn
  const validationErrorsInput = ['issn'];

  // Run validation check for input fields
  cy.checkInputValidationErrors(validationErrorsInput);
  cy.getBySel('isbn-form-next-button').should('be.disabled');

  // Clear values
  cy.get('input[name="issn"]').clear();
  cy.get('input[name="volume"]').clear();
});

Cypress.Commands.add('isbnFillStep7', () => {
  cy.get('select[name="publicationFormat"]').select(3);
  cy.getBySel('type').click(); // Click to open multiselect dropdown (publication type)
  cy.getBySel('type').within(() => {
    cy.get('div[role="option"]').first().click();
  });

  cy.get('input[name="printingHouse"]').type('Printing house');
  cy.get('input[name="printingHouseCity"]').type('Printing house city');
  cy.get('select[name="edition"]').select(1);
  cy.get('input[name="copies"]').type('123');
  cy.getBySel('fileformat').click(); // Click to open multiselect dropdown (publication fileformat)
  cy.getBySel('fileformat').within(() => {
    cy.get('div[role="option"]').first().click();
  });
});

Cypress.Commands.add('isbnFillStep7Validations', () => {
  cy.get('select[name="publicationFormat"]').select(3);
  cy.getBySel('type').click(); // Click to open multiselect dropdown (publication type)
  cy.getBySel('fileformat').click(); // Click to open multiselect dropdown (publication fileformat)
  cy.get('input[name="copies"]').type('123');

  // With input above there are should be validation errors for fields: publicationType, fileFormat
  cy.get('.selectErrors').should('have.length', 2);
  cy.getBySel('isbn-form-next-button').should('be.disabled');

  cy.get('input[name="copies"]').clear();
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

Cypress.Commands.add('compareObjects', (o1, o2) => {
  expect(objectsAreEqual(o1, o2)).to.equal(true);

  // Utility function for comparing request body with expected body
  function objectsAreEqual(o1, o2) {
    const o1Keys = Object.keys(o1);
    const o2Keys = Object.keys(o2);
    const objectsHaveEqualAttributesAvailable = o1Keys.every(k => o2Keys.includes(k)) && o1Keys.length === o2Keys.length;

    if (!objectsHaveEqualAttributesAvailable) {
      return false;
    }

    return o1Keys.every(k => {
      if (typeof o1[k] !== typeof o2[k]) {
        return false;
      }

      if (Array.isArray(o1[k])) {
        if (!Array.isArray(o2[k])) {
          return false;
        }

        return arraysAreEqual(o1[k], o2[k]);
      }

      if (typeof o1[k] === 'object') {
        return objectsAreEqual(o1[k], o2[k]);
      }

      return o1[k] === o2[k];
    });
  }

  function arraysAreEqual(a1, a2) {
    return a1.length === a2.length && a1.every((v, idx) => {
      if (typeof a1[idx] !== typeof a2[idx]) {
        return false;
      }

      if (Array.isArray(v)) {
        return arraysAreEqual(a1[idx], a2[idx]);
      }

      if (typeof v === 'object') {
        return objectsAreEqual(a1[idx], a2[idx]);
      }

      return a1[idx] === a2[idx];
    });
  }
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

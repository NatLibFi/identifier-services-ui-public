// Custom command to change the page language
Cypress.Commands.add('changeLanguage', language => {
  cy.get('.languageSelect').click();
  cy.get('ul').contains(language).click();
});

// Custom command to cofirm or reject ownership of an ID on the batch page
Cypress.Commands.add('batchOwnership', buttonToPress => {
  cy.get('.MuiDialog-root').should('be.visible');
  cy.get('.MuiDialogActions-root').find('button').eq(buttonToPress).click();
  cy.get('.MuiDialog-root').should('not.exist');
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

// Custom command for submitting the form and checking that the form was submitted successfully
Cypress.Commands.add('submitForm', () => {
  // Submit the form
  cy.get('.formSubmitButtonsContainer > button').eq('1').click();

  // Check that the form was submitted successfully and success message is shown
  cy.get('.MuiAlert-message').should('exist');

  // Wait for redirect to the home page and check that the redirect was successful
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500).then(() => {
    cy.location('pathname').should('equal', '/');
  });
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

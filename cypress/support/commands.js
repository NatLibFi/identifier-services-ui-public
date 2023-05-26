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
  cy.get('.MuiAlert-message').should(
    'contain',
    'Lomake on lähetetty onnistuneesti'
  );

  // Wait for redirect to the home page and check that the redirect was successful
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(500).then(() => {
    cy.location('pathname').should('equal', '/');
  });
});

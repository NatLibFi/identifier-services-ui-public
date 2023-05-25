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

// Custom command for checking validation errors
Cypress.Commands.add('checkValidationErrors', validationErrors => {
  for (const error of validationErrors) {
    cy.get(`input[name="${error}"]`).parent().should('have.class', 'Mui-error');
  }
});

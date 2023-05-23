// Defining a custom command to change the language
Cypress.Commands.add("changeLanguage", (language) => {
  cy.get(".languageSelect").click(); // click the button
  cy.get("ul").contains(language).click(); // choose language
});

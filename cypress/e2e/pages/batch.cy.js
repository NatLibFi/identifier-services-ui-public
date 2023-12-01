describe('Tunnistepalvelut - Tunnuslista', () => {
  // run before each test
  beforeEach(() => {
    cy.visit('localhost:8080/isbn-registry/identifierbatches/3'); // access a batch page with id 3
  });

  it('User can confirm ownership of an ID and proceed to the batch page', () => {
    cy.batchOwnership(1); // 1 = confirm
    cy.url().should('include', '/isbn-registry/identifierbatches/3');
  });

  it('User can reject confirmation of ownership of an ID and be redirected to the front page', () => {
    cy.batchOwnership(0); // 0 = reject
    cy.url().should('not.include', '/isbn-registry/identifierbatches');
  });

  it('User can click on publisher details button and open a modal with correct details', () => {
    cy.batchOwnership(1);
    cy.get(
      ':nth-child(2) > .MuiListItemText-root > .MuiTypography-root > .MuiGrid-container > :nth-child(2)'
    )
      .invoke('text')
      .then(publisherName => {
        cy.get('.publicBatchButtons > button').first().click();
        cy.get('.publisherModal').should('be.visible');
        cy.get('.publisherModal').should('contain', publisherName);
      });
  });

  it('User can successfully download a batch file', () => {
    cy.batchOwnership(1);
    cy.get('.publicBatchButtons > button').last().click();

    const downloadsFolder = Cypress.config('downloadsFolder');
    cy.readFile(`${downloadsFolder}/identifierBatch-3.txt`).should('exist'); // 3 = batch id
  });
});

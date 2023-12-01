describe('Tunnistepalvelut - Kustantajarekisteri', () => {
  // run before each test
  beforeEach(() => {
    cy.visit('localhost:8080');
    cy.get('nav').find('a').eq(1).click();
  });

  it('User is able to search publishers by name', () => {
    cy.get('input').type('Suomen valtio');
    cy.get('form').submit();
    // check that there is exactly one result with the right name
    cy.get('tbody').should('contain', 'Suomen valtio').should('have.length', 1);
  });

  it('Search results can be cleared', () => {
    cy.get('input').type('Suomen valtio');
    cy.get('input').clear();
    cy.get('input').should('have.value', '');
    cy.get('form').submit();
    cy.get('tbody').find('tr').should('have.length', 10);
  });

  it('User can click on single publisher row and open a modal with correct publisher details', () => {
    cy.get('tbody')
      .find('tr')
      .first()
      .find('td')
      .eq(1)
      .find('div')
      .invoke('text')
      .then(publisherName => {
        cy.get('tbody').find('tr').first().click();
        cy.get('.publisherModal').should('be.visible');
        cy.get('.publisherModal').should('contain', publisherName);
      });
  });

  it('User can close the publisher details modal by clicking ESC key', () => {
    cy.get('tbody').find('tr').first().click();
    cy.get('.publisherModal').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('.publisherModal').should('not.exist');
  });

  it('User can change the amount of results per page', () => {
    cy.get('select').select('5');
    cy.get('tbody').find('tr').should('have.length', 5);

    cy.get('select').select('10');
    cy.get('tbody').find('tr').should('have.length.greaterThan', 5);
  });
});

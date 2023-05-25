describe('Tunnistepalvelut - Kustantajarekisteri', () => {
  // run before each test
  beforeEach(() => {
    cy.visit('localhost:8080');
    cy.get('.publicMenu').contains('Kustantajarekisteri').click();
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
    // check that table has four elements (in production there can be hard coded number of 10 elements, since there ale always more than 10 publishers)
    cy.get('tbody').find('tr').should('have.length', 4);
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
        cy.get('.marcModal').should('be.visible');
        cy.get('.marcModal').should('contain', publisherName);
      });
  });

  it('User can close the publisher details modal by clicking ESC key', () => {
    cy.get('tbody').find('tr').first().click();
    cy.get('.marcModal').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('.marcModal').should('not.exist');
  });

  it('User can change the amount of results per page', () => {
    cy.get('select').select('1');
    cy.get('tbody').find('tr').should('have.length', 1);

    cy.get('select').select('10');
    cy.get('tbody').find('tr').should('have.length.greaterThan', 1);
  });
});

describe('Tunnistepalvelut - Etusivu', () => {
  // run before each test
  beforeEach(() => {
    cy.visit('localhost:8080');
  });

  it('User can change the language of the page', () => {
    cy.changeLanguage('EN');
    cy.get('html').should('have.attr', 'lang', 'en');
    cy.get('.bannerContainer').should('contain', 'Identifier Services');

    cy.changeLanguage('SV');
    cy.get('html').should('have.attr', 'lang', 'sv');
    cy.get('.bannerContainer').should('contain', 'Identifikatorservice');

    cy.changeLanguage('FI');
    cy.get('html').should('have.attr', 'lang', 'fi');
    cy.get('.bannerContainer').should('contain', 'Tunnistepalvelut');
  });

  it('Nav Menu has correct amount of Link and Button elements', () => {
    cy.get('nav').find('a').should('have.length', 3); // check that there are exactly three links (Home, Registry and Change contact information)
    cy.get('nav').find('button').should('have.length', 1); // check that there is exactly one button (Forms)
  });

  it('User should click the Identifier Registry nav link and be redirected to the right page', () => {
    cy.get('.publicMenu').contains('Kustantajarekisteri').click();
    cy.url().should('include', '/isbn-registry/publishers');
  });

  it('User can click the Forms button and dropdown menu with 3 links will be opened', () => {
    cy.get('nav > div > button').click();
    cy.get('ul[role="menu"]').find('a').should('have.length', 3);
  });

  it('User can click inner link in the Forms dropdown menu and is redirected to the right page', () => {
    const links = [
      'isbn-ismn-publisher',
      'isbn-ismn-publication',
      'issn-publication'
    ];

    for (let i = 0; i < links.length; i++) {
      cy.get('nav > div > button').click();
      cy.get('ul[role="menu"]').find('a').eq(i).click();
      cy.url().should('include', links[i]);
    }
  });
});

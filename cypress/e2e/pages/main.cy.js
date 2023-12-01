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
    cy.get('nav').find('a').should('have.length', 4);
    cy.get('nav').find('button').should('have.length', 2);
  });

  it('User should click the Identifier Registry nav link and be redirected to the right page', () => {
    cy.get('nav').find('a').eq(1).click();
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

  /* Check external links */
  it('User can click the Privacy Policy link and is redirected to the right page', () => {
    cy.get('footer > p > a').then(link => {
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });

  it('User can click "More about ISBN/ISMN/ISSN" links and is redirected to the right page', () => {
    cy.get('.buttonContainer a').each(link => {
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });

    cy.get('.issnContainer a').then(link => {
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });

  it('User can click social media links in the Footer and is redirected to the right page', () => {
    // During the tests, it came out that LinkedIn link is returning 999 status code for some reason, so it is excluded from the test
    // However, the link is still clickable and redirects to the right page. Should be investigated further.
    cy.get('.socialContainer a:not(:last-child)').each(link => {
      cy.request(link.prop('href')).its('status').should('eq', 200);
    });
  });
});

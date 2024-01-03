describe('Tunnistepalvelut - Etusivu', () => {
  // Note: writing as many assertions to one e2e test to reduce overhead.
  // For further information, see recommendations in Cypress docs:
  // https://docs.cypress.io/guides/references/best-practices#Creating-Tiny-Tests-With-A-Single-Assertion

  it('User may do basic interactions in the main page', () => {
    cy.visit('/');

    // LANGUAGE SELECTION
    cy.changeLanguage('EN');
    cy.get('html').should('have.attr', 'lang', 'en');
    cy.getBySel('main-page-title').invoke('text').should('equal', 'Identifier Services');

    cy.changeLanguage('SV');
    cy.get('html').should('have.attr', 'lang', 'sv');
    cy.getBySel('main-page-title').invoke('text').should('equal', 'Identifikatorservice');

    cy.changeLanguage('FI');
    cy.get('html').should('have.attr', 'lang', 'fi');
    cy.getBySel('main-page-title').invoke('text').should('equal', 'Tunnistepalvelut');

    /* ***************************************** */

    // NAVIGATION
    // Check that navigation has all links in place within nav
    cy.getBySel('nav-root').getBySelLike('nav-link-').should('have.length', 4);

    // Test finnish translations of each nav link
    cy.getBySel('nav-link-home')
      .should('have.attr', 'href', '/')
      .invoke('text')
      .should('equal', 'Etusivu');


    cy.getBySel('nav-link-publisher-registry')
      .should('have.attr', 'href', '/isbn-registry/publishers')
      .invoke('text')
      .should('equal', 'Kustantajarekisteri');


    cy.getBySel('nav-link-change-contactinfo')
      .should('have.attr', 'href', 'http://localhost:8080/contact-information-change-fin') // Note: defined in cypress env
      .invoke('text')
      .should('equal', 'Yhteystietojen muutoslomake (ISBN/ISMN)');

    // Test forms are available in nav
    cy.getBySel('nav-link-forms-button').invoke('text').should('equal', 'Hakulomakkeet');
    cy.getBySel('nav-link-forms-button').click();

    const formTestDataSelectors = {
      publisher: {text: 'Liittymislomake ISBN-/ISMN-järjestelmään', url: '/forms/isbn-ismn-publisher'},
      isbnismn: {text: 'ISBN/ISMN kirjoille ja nuottijulkaisuille', url: '/forms/isbn-ismn-publication'},
      issn: {text: 'ISSN sarjoille ja lehdille', url: '/forms/issn-publication'}
    };

    for (const [k, v] of Object.entries(formTestDataSelectors)) {
      cy.getBySel(`nav-link-forms-${k}`)
        .should('have.attr', 'href', v.url)
        .invoke('text')
        .should('equal', v.text);
    }

    // Close menu
    cy.get('body').click();


    /* ***************************************** */

    // BODY
    const externalIdentifierLinks = {
      isbn: 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/isbn-tunnus',
      ismn: 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/ismn-tunnus',
      issn: 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/issn-tunnus'
    };

    for (const [k, v] of Object.entries(externalIdentifierLinks)) {
      cy.checkExternalLink(`homepage-link-external-${k}`, v);
    }

    /* ***************************************** */

    // FOOTER
    cy.getBySel('footer').should('be.visible');

    // Test logo and its alt text
    cy.getBySel('footer-logo')
      .should('be.visible')
      .should('have.attr', 'src', 'https://extra.kansalliskirjasto.fi/kk_logo.svg')
      .should('have.attr', 'alt');

    // Test library contact information correctness
    cy.getBySel('footer-contact-information')
      .should('be.visible')
      .invoke('text')
      .should('equal', 'Kansalliskirjasto PL 15 (Unioninkatu 36) 00014 Helsingin yliopisto');

    // Test social media links
    const socialMediaLinks = {
      'facebook': 'https://facebook.com/Kansalliskirjasto',
      'twitter': 'https://twitter.com/NatLibFi',
      'youtube': 'https://www.youtube.com/channel/UCMCKdIT517O4D8o9-lesbvQ',
      'instagram': 'https://instagram.com/kansalliskirjasto/',
      'linkedin': 'https://fi.linkedin.com/company/nationallibraryfinland'
    };

    for (const [k, v] of Object.entries(socialMediaLinks)) {
      cy.checkExternalLink(`footer-socials-${k}`, v);
    }

    // Test accessibility statement
    cy.checkInternalLink('footer-accessibility', '/accessibility-statement', 'Saavutettavuusseloste');

    // Test privacy policy
    cy.checkExternalLink('footer-privacy', 'https://www.kansalliskirjasto.fi/fi/tietosuoja', 'Tietosuoja');
  });
});

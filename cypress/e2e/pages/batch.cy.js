describe('Tunnistepalvelut - Tunnuslista', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/public/isbn-registry/identifierbatches/1', async (req) => {
      return req.reply({fixture: 'responses/identifierBatch.json'});
    }).as('readIdentifierBatch');

    cy.intercept('GET', '/api/public/isbn-registry/publishers/1', {fixture: 'responses/publisher.json'});

    cy.visit('/isbn-registry/identifierbatches/1');
  });

  it('User can interact with all available interactions in batch view', () => {
    // Confirmation should be displayed and contain proper text
    cy.getBySel('identifierbatch-confirmation').should('be.visible');
    cy.getBySel('identifierbatch-confirmation-text-fin').invoke('text').should('equal', 'Vahvistan edustavani kustantajaa FooBar Publisher ja omistavani kustantajatunnuksen 978-951-550');
    cy.getBySel('identifierbatch-confirmation-text-swe').invoke('text').should('equal', 'Jag bekräftar att jag representerar förlaget FooBar Publisher och äger förlagsbeteckningen 978-951-550');
    cy.getBySel('identifierbatch-confirmation-text-eng').invoke('text').should('equal', 'I confirm I represent FooBar Publisher (publisher ID 978-951-550)');

    // Happy path
    cy.getBySel('identifierbatch-confirmation-yes').click();
    cy.url().should('equal', 'http://localhost:8080/isbn-registry/identifierbatches/1');

    // Turnstile notification is displayed and it contains proper text in all languages
    cy.getBySel('turnstile-notification-text')
      .should('be.visible')
      .invoke('text')
      .should('equal', 'Siirtymällä lataamaan tunnukset hyväksyt, että automaattista tunnistusta käytetään taustalla erottelemaan ihmiskäyttäjät robottikäyttäjistä. Automaattisen tunnistamisen yhteydessä tunnistamisen palveluntarjoaja (Cloudflare) saa tiedon IP-osoitteestasi.');

    cy.changeLanguage('EN');
    cy.getBySel('turnstile-notification-text')
      .should('be.visible')
      .invoke('text')
      .should('equal', 'By proceeding to download the identifiers you agree and consent that the site is protected by an automated detection service to distinguish human users from bot users. In the process, the service provider (Cloudflare) receives information on your IP-address.');

    cy.changeLanguage('SV');
    cy.getBySel('turnstile-notification-text')
      .should('be.visible')
      .invoke('text')
      .should('equal', 'Genom att ladda ner identifierna ger du samtycke till att en automatisk identifiering används för att skilja åt mänskliga användare från botanvändare. I samband med den automatiska identifieringen får tjänsteleverantören (Cloudflare) information om din IP-adress.');

    // Test publisher modal
    // Verify modal contents
    cy.getBySel('identifierbatch-view-publisher-button').click();
    cy.getBySel('publisher-modal').should('be.visible');
    cy.getBySel('publisher-modal-officialName').invoke('text').should('equal', 'FooBar Publisher');
    cy.getBySel('publisher-modal-otherNames').invoke('text').should('equal', 'OtherFooBar, OtherAnotherFooBar');
    cy.getBySel('publisher-modal-previousNames').invoke('text').should('equal', 'PriorFoo, AnotherPriorFoo');
    cy.getBySel('publisher-modal-address').invoke('text').should('equal', 'FooBar 123');
    cy.getBySel('publisher-modal-zip').invoke('text').should('equal', '00000');
    cy.getBySel('publisher-modal-city').invoke('text').should('equal', 'Foobarila');
    cy.getBySel('publisher-modal-phone').invoke('text').should('equal', '1234567');
    cy.getBySel('publisher-modal-www').invoke('text').should('equal', 'http://example.com');

    // Close modal
    cy.getBySel('publisher-modal-close-button').click();
    cy.getBySel('publisher-modal').should('not.exist');

    // Download batch file
    cy.intercept('POST', '/api/public/isbn-registry/identifierbatches/1/download', async (req) => {
      return req.reply({fixture: 'files/identifierBatch-1.txt'});
    }).as('downloadIdentifierbatch');

    // Check that the request happens to correct URL and response contains the specified file
    cy.getBySel('identifierbatch-view-download-batch-button').click();
    cy.wait('@downloadIdentifierbatch').should((interception) => {
      expect(interception.request.url).to.equal('http://localhost:8080/api/public/isbn-registry/identifierbatches/1/download');
      expect(interception.response.body).to.equal('This is a file is only for testing Identifier Services Public UI implementation of identifier batch text file download.');
    });
  });

  it('Selecting "no" for publisher confirmation redirects user to home page', () => {
    cy.getBySel('identifierbatch-confirmation-no').click();
    cy.url().should('equal', 'http://localhost:8080/?lng=fi');
  });
});

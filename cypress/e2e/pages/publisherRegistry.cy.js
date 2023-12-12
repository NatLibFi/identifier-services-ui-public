describe('Tunnistepalvelut - Kustantajarekisteri', () => {
  // Before each test, visit publisher registry page and change language to FI
  beforeEach(() => {
    // Intercept network call to respond to search with pre-defined fixture when entering the page
    cy.intercept('POST', '/api/public/isbn-registry/publishers/query', async (req) => {
      if (req.body.searchText === 'FooBar') {
        return req.reply({fixture: 'responses/publisherQueryResult.json'});
      }

      if (req.body.searchText === '') {
        const fixture = Number(req.body.limit) < 10 ? 'responses/publisherQueryResultFullLimited.json' : 'responses/publisherQueryResultFull.json';
        return req.reply({fixture});
      }

      if (req.body.searchText === 'Does not exist') {
        return req.reply({fixture: 'responses/publisherQueryResultEmpty.json'});
      }

      throw new Error('Unsupported API response');
    }).as('searchPublishers');

    cy.visit('/isbn-registry/publishers');
    cy.changeLanguage('FI');
  });

  it('User is able to interact with publisher search', () => {
    // By default the search should be carried out with empty searchText
    cy.getBySel('publisher-registry-search-results').find('tr').should('have.length', 7);

    // Check two first items for data
    cy.getBySel('publisher-registry-search-results-1-name').invoke('text').should('equal', 'FooBar Publisher');
    cy.getBySel('publisher-registry-search-results-1-otherNames').invoke('text').should('equal', 'OtherFooBar, OtherAnotherFooBar');
    cy.getBySel('publisher-registry-search-results-1-isActive').invoke('text').should('equal', 'Kyllä');
    cy.getBySel('publisher-registry-search-results-1-activeIdentifiers').invoke('text').should('equal', 'ISBN:978-951-550');

    cy.getBySel('publisher-registry-search-results-2-name').invoke('text').should('equal', 'Baz Publisher');
    cy.getBySel('publisher-registry-search-results-2-otherNames').invoke('text').should('equal', '');
    cy.getBySel('publisher-registry-search-results-2-isActive').invoke('text').should('equal', 'Kyllä');
    cy.getBySel('publisher-registry-search-results-2-activeIdentifiers').invoke('text').should('equal', 'ISBN:978-951-551');

    // Use search, expect to find one result
    cy.get('#search-input').type('FooBar');
    cy.getBySel('publisher-registry-search-form').submit();

    // Check table
    cy.getBySel('publisher-registry-search-results').find('tr').should('have.length', 2);
    cy.getBySel('publisher-registry-search-results').should('be.visible');
    cy.getBySel('publisher-registry-search-results-1').should('be.visible');
    cy.getBySel('publisher-registry-search-results-1-name').invoke('text').should('equal', 'FooBar Publisher');
    cy.getBySel('publisher-registry-search-results-1-otherNames').invoke('text').should('equal', 'OtherFooBar, OtherAnotherFooBar');
    cy.getBySel('publisher-registry-search-results-1-isActive').invoke('text').should('equal', 'Kyllä');
    cy.getBySel('publisher-registry-search-results-1-activeIdentifiers').invoke('text').should('equal', 'ISBN:978-951-550');

    cy.getBySel('publisher-registry-search-results-2').should('not.exist');

    // Clear search
    cy.get('#search-input').clear();
    cy.getBySel('publisher-registry-search-form').submit();

    // Use search, no results expected
    cy.get('#search-input').type('Does not exist');
    cy.getBySel('publisher-registry-search-form').submit();

    // Only header row should be displayed
    cy.getBySel('publisher-registry-search-results').find('tr').should('have.length', 1);

    // Clear search
    cy.get('#search-input').clear();
    cy.getBySel('publisher-registry-search-form').submit();

    // Test changing number of results displayed.
    // Default number of result shown should eq. 10, API mock returns 6 rows so with header row there should be 7 tr elements
    cy.getBySel('select-table-rows').should('have.value', '10');
    cy.getBySel('publisher-registry-search-results').find('tr').should('have.length', 7);


    // Change number of rows to 5
    // Default number of result shown should eq. 10, API mock returns 5 rows here so with header row there should be 6 tr elements
    cy.getBySel('select-table-rows').select('5');
    cy.getBySel('select-table-rows').should('have.value', '5');
    cy.getBySel('publisher-registry-search-results').find('tr').should('have.length', 6);
  });

  it('User can interact with single publisher modal', () => {
    // Intercept network call
    cy.intercept('GET', '/api/public/isbn-registry/publishers/1', {fixture: 'responses/publisher.json'});

    // Interact with table row
    cy.getBySel('publisher-registry-search-results-1').click();

    // Verify modal contents
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

    // Reopen and test closing using ESC-key
    cy.getBySel('publisher-registry-search-results-1').click();
    cy.getBySel('publisher-modal').should('be.visible');
    cy.get('body').type('{esc}');
    cy.getBySel('publisher-modal').should('not.exist');
  });
});

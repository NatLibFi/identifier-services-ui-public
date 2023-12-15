describe('Tunnistepalvelut - Liittymislomake', () => {
  beforeEach(() => {
    cy.intercept('POST', '/api/public/isbn-registry/requests/publishers', (req) => {
      return req.reply({statusCode: 201, fixture: 'responses/formCreateSucceeded.json'});
    }).as('postPublisherRegistryForm');

    cy.visit('/forms/isbn-ismn-publisher');
  });

  it('User can fill, edit, preview and submit the form. Validations in the form work as intended.', () => {
    // Check turnstile notification
    cy.turnstileFormNotificationIsDisplayed(); // Note: changes language to FI

    // Check that instructions for filling the form are visible
    cy.getBySel('publisher-registry-form-information').should('be.visible');

    // Check that there are 5 instructions regarding joining the publisher registry
    cy.getBySel('publisher-registry-form-information').within(() => {
      cy.get('ul > li').should('have.length', 5);
    });

    // Check external link that should be found in page
    cy.checkExternalLink('publisher-registry-form-instructions-link', 'https://www.kansalliskirjasto.fi/fi/palvelut/suomen-isbn-keskus/isbn-tunnus#ohjeet', 'ISBN-keskuksen kotisivuilla');

    // Continue to fill form
    cy.getBySel('publisher-form-accept-terms-button').click();


    // Kustantajan tiedot - Step 1
    // Test validations
    const firstPageInputFields = [
      'officialName',
      'address',
      'zip',
      'city',
      'phone',
      'contactPerson',
      'email',
      'www'
    ];

    // Clear required fields and type invalid data for fields with additional validation
    cy.get('input[name="officialName"]').type('1');
    cy.get('input[name="officialName"]').clear();
    cy.get('input[name="address"]').type('1');
    cy.get('input[name="address"]').clear();
    cy.get('input[name="zip"]').type('1');
    cy.get('input[name="city"]').type('1');
    cy.get('input[name="phone"]').type('1');
    cy.get('input[name="contactPerson"]').type('1');
    cy.get('input[name="contactPerson"]').clear();
    cy.get('input[name="email"]').type('1');
    cy.get('input[name="www"]').type('1');

    // Following fields validation errors are to be tested
    const validationErrors = {
      page1: [
        'officialName',
        'address',
        'zip',
        'city',
        'phone',
        'contactPerson',
        'email'
      ],
      page2: [
        'frequencyCurrent',
        'frequencyNext',
        'classificationOther'
      ]
    };

    // Run validation check
    cy.checkInputValidationErrors(validationErrors.page1);

    // The Next-button should be disabled
    cy.getBySel('publisher-form-next-button').should('be.disabled');

    // Clear and redo first page properly
    firstPageInputFields.forEach(inputField => cy.get(`input[name="${inputField}"]`).clear());

    // Type in data to continue test
    cy.get('input[name="officialName"]').type('Official name');
    cy.get('input[name="otherNames"]').type('Other name');
    cy.get('input[name="address"]').type('Street address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="www"]').type('www.example.com');
    cy.getBySel('publisher-form-next-button').click();

    // Kustannustominta - Step 2
    // Test page field validation
    cy.get('input[name="frequencyCurrent"]').type('123');
    cy.get('input[name="frequencyCurrent"]').clear();
    cy.get('input[name="frequencyNext"]').type('456');
    cy.get('input[name="frequencyNext"]').clear();
    cy.get('input[name="classificationOther"]').type('Other classification');
    cy.get('input[name="classificationOther"]').clear();

    // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
    cy.get('input[name="frequencyCurrent"]').click();

    // Run validation check
    cy.checkInputValidationErrors(validationErrors.page2);

    // The Next-button should be disabled
    cy.getBySel('publisher-form-next-button').should('be.disabled');

    // Type in data to continue test
    cy.get('input[name="frequencyCurrent"]').type('123');
    cy.get('input[name="frequencyNext"]').type('456');
    cy.getBySel('classification').click();
    cy.get('#react-select-2-option-0').click(); // TODO: better selector for multiselect
    cy.get('input[name="classificationOther"]').type('Other classification');
    cy.getBySel('publisher-form-next-button').click();

    // Organisaation lisätiedot - Step 3
    cy.get('input[name="affiliateOf"]').type('Affiliate of');
    cy.get('input[name="affiliates"]').type('Affiliates');
    cy.get('input[name="distributorOf"]').type('Distributor of');
    cy.get('input[name="distributors"]').type('Test distributors');
    cy.getBySel('publisher-form-next-button').click();

    // Esikatselu - Step 4
    // Labels to be displayed on the preview page when all fields are filled
    const previewTests = {
      officialName: 'Official name',
      otherNames: 'Other name',
      address: 'Street address',
      zip: '12345',
      city: 'City',
      phone: '123456789',
      contactPerson: 'Contact person',
      email: 'test@example.com',
      website: 'https://www.example.com', // Note: Automatically added https-prefix when user input does not contain protocol
      frequencyCurrent: '123',
      frequencyNext: '456',
      classification: 'Antiikki. Keräily',
      classificationOther: 'Other classification',
      affiliateOf: 'Affiliate of',
      affiliates: 'Affiliates',
      distributorOf: 'Distributor of',
      distributors: 'Test distributors'
    };

    // Check that preview page has 5 data containers
    cy.getBySel('publisher-form-preview').within(() => {
      cy.get('.listComponentContainer').should('have.length', 5);
    });

    // Check that preview page contains correct labels and values
    for (const [k, v] of Object.entries(previewTests)) {
      cy.getBySel(`list-component-${k}`).invoke('text').should('equal', v);
    }

    // Test that value can be changed from previous page
    cy.getBySel('publisher-form-back-button').click();
    cy.get('input[name="distributors"]').clear();
    cy.get('input[name="distributors"]').type('Changed distributors');
    cy.getBySel('publisher-form-next-button').click();

    cy.getBySel('list-component-distributors').invoke('text').should('equal', 'Changed distributors');

    // Submit form - note: interceptor will respond with success + id
    cy.getBySel('publisher-form-submit-button').click();

    // Verify response body contains what it should
    cy.wait('@postPublisherRegistryForm').then((interception) => {
      expect(interception.request.url).to.equal('http://localhost:8080/api/public/isbn-registry/requests/publishers');

      const expectedRequestBody = {
        ...previewTests,
        distributors: 'Changed distributors',
        classification: ['780'], // Note: classifications are sent to API using codes
        www: 'https://www.example.com', // Note: attribute name change website -> www
        langCode: 'fi-FI'
      };

      delete expectedRequestBody.website;

      cy.compareObjects(expectedRequestBody, interception.request.body);
    });

    // Test redirect and success message
    cy.formSubmittedCorrectly();
  });

  it('User can complete form with minimal information', () => {
    // Note: turnstile notification is tested in the previous tests and because of this, it's not re-tested here
    cy.changeLanguage('FI');

    // Continue to fill form
    cy.getBySel('publisher-form-accept-terms-button').click();

    // Kustantajan tiedot - Step 1
    cy.get('input[name="officialName"]').type('Official name');
    cy.get('input[name="address"]').type('Street address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="email"]').type('test@example.com');
    cy.getBySel('publisher-form-next-button').click();

    // Kustannustominta - Step 2
    cy.get('input[name="frequencyCurrent"]').type('123');
    cy.get('input[name="frequencyNext"]').type('456');
    cy.getBySel('classification').click();
    cy.get('#react-select-2-option-0').click(); // TODO: better selector for multiselect
    cy.getBySel('publisher-form-next-button').click();

    // Organisaation lisätiedot - Step 3
    cy.getBySel('publisher-form-next-button').click();

    // Esikatselu - Step 4
    const previewTests = {
      officialName: 'Official name',
      address: 'Street address',
      zip: '12345',
      city: 'City',
      phone: '123456789',
      contactPerson: 'Contact person',
      email: 'test@example.com',
      frequencyCurrent: '123',
      frequencyNext: '456',
      classification: 'Antiikki. Keräily'
    };

    // Check that preview page has 4 data containers since step 3 information was not given
    cy.getBySel('publisher-form-preview').within(() => {
      cy.get('.listComponentContainer').should('have.length', 4);
    });

    // Check that preview page contains correct labels and values
    for (const [k, v] of Object.entries(previewTests)) {
      cy.getBySel(`list-component-${k}`).invoke('text').should('equal', v);
    }

    // Submit form - note: interceptor will respond with success + id
    cy.getBySel('publisher-form-submit-button').click();

    // Verify response body contains what it should
    cy.wait('@postPublisherRegistryForm').then((interception) => {
      expect(interception.request.url).to.equal('http://localhost:8080/api/public/isbn-registry/requests/publishers');

      const expectedRequestBody = {
        ...previewTests,
        classification: ['780'], // Note: classifications are sent to API using codes
        langCode: 'fi-FI'
      };

      delete expectedRequestBody.website;

      cy.compareObjects(interception.request.body, expectedRequestBody);
    });

    // Test redirect and success message
    cy.formSubmittedCorrectly();
  });
});

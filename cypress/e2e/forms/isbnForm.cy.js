describe('Tunnistepalvelut - ISBN-/ISMN-lomake', () => {
  // run before each test
  beforeEach(() => {
    cy.intercept('POST', '/api/public/isbn-registry/requests/publications', (req) => {
      return req.reply({statusCode: 201, fixture: 'responses/formCreateSucceeded.json'});
    }).as('postIsbnIsmnForm');

    cy.visit('/forms/isbn-ismn-publication');
  });

  it('BOOK - User can fill the form with complete information, edit, preview and succesfully submit it', () => {
    // Check that turnstile notification is displayed
    cy.turnstileFormNotificationIsDisplayed();
    cy.getBySel('accept-form-terms-button').click();

    // Each step tests first validation

    // Perustiedot - Step 1
    cy.isbnFillStep1Validations();
    cy.isbnFillStep1();
    cy.getBySel('isbn-form-next-button').click();

    // Kustantajan tiedot - Step 2
    cy.isbnFillStep2Validations();
    cy.isbnFillStep2();
    cy.getBySel('isbn-form-next-button').click();

    // Kustannustoiminta - Step 3
    cy.isbnFillStep3Validations();
    cy.isbnFillStep3();
    cy.getBySel('isbn-form-next-button').click();

    // Julkaisun tiedot - Step 4
    cy.isbnFillStep4Validations();
    cy.isbnFillStep4();
    cy.getBySel('isbn-form-next-button').click();

    // Tekijät - Step 5
    cy.isbnFillStep5Validations();
    cy.isbnFillStep5();
    cy.getBySel('isbn-form-next-button').click();

    // Sarjan tiedot - Step 6
    cy.isbnFillStep6Validations();
    cy.isbnFillStep6();
    cy.getBySel('isbn-form-next-button').click();

    // Julkaisumuoto - Step 7
    cy.isbnFillStep7Validations();
    cy.isbnFillStep7();
    cy.getBySel('isbn-form-next-button').click();

    // Lisätiedot - Step 8
    cy.get('textarea[name="comments"]').type('Additional info');
    cy.getBySel('isbn-form-next-button').click();

    // Esikatselu - Step 9
    cy.get('.mainContainer').within(() => {
      // Check that preview page has 8 data containers
      cy.get('.listComponentContainer').should('have.length', 8);
    });

    // Check that user can go back to the previous step and edit a field
    cy.getBySel('isbn-form-back-button').click();
    cy.get('textarea[name="comments"]').clear();
    cy.get('textarea[name="comments"]').type('The new additional info');
    cy.getBySel('isbn-form-next-button').click();

    // Labels that should be displayed on the preview page
    const previewTests = {
      officialName: 'Official name',
      publisherIdentifierStr: '1234567890',
      address: 'Address',
      zip: '12345',
      city: 'City',
      phone: '1234567890',
      contactPerson: 'Contact person',
      email: 'test@example.com',
      publishedBefore: 'Kyllä',
      publishingActivity: 'Jatkuvaa',
      publishingActivityAmount: '123',
      title: 'Title',
      subtitle: 'Subtitle',
      language: 'suomi',
      month: 'tammikuu',
      //year: '2025', TODO: this would break each time when year will change
      series: 'Series',
      issn: '1234-5678',
      volume: '123',
      publicationFormat: 'Sekä painettuna että sähköisenä',
      type: 'Pehmeäkantinen',
      copies: '123',
      printingHouse: 'Printing house',
      printingHouseCity: 'Printing house city',
      edition: '1.',
      comments: 'The new additional info',
      publicationType: 'Kirja/kirjanen',
      publicationsPublic: 'Kyllä'
    };

    // Check that preview page has 8 data containers
    cy.getBySel('isbn-form-preview').within(() => {
      cy.get('.listComponentContainer').should('have.length', 8);
    });

    // Check that preview page contains correct labels and values
    for (const [k, v] of Object.entries(previewTests)) {
      cy.getBySel(`list-component-${k}`).invoke('text').should('equal', v);
    }

    // Submit form - note: interceptor will respond with success + id
    cy.getBySel('isbn-form-submit-button').click();

    // Verify response body contains what it should
    cy.wait('@postIsbnIsmnForm').then((interception) => {
      expect(interception.request.url).to.equal('http://localhost:8080/api/public/isbn-registry/requests/publications');

      // Note: many fields have different value in API format than what is displayed in UI
      // See function formatPublicationValues in src/frontend/components/form/isbnIsmnRegistrationForm/utils.js
      const expectedRequestBody = {
        ...previewTests,
        langCode: 'fi-FI',
        language: 'FIN',
        publicationsPublic: true, // Label is displayed in preview page, API call needs to include value
        publishedBefore: true,
        month: '01', // Transformed to two digit format in format function
        publicationType: 'BOOK', // Kirja, kirjanen in API format
        publicationFormat: 'PRINT_ELECTRONICAL', // Sekä painettuna että sähköisenä in API format
        publishingActivity: 'CONTINUOUS', // Jatkuvaa in API format
        fileformat: ['PDF'],
        type: ['PAPERBACK'],
        firstName1: 'First name',
        lastName1: 'Last name',
        role1: ['AUTHOR'],
        edition: '1' // Transformed to API format from the UI label
      };

      // Note: year parameter differ from API call and thus is not to be compared
      const comparableRequestBody = JSON.parse(JSON.stringify(interception.request.body)); // Deep copy
      delete comparableRequestBody.year; // Year cannot be compared reliably due to dynamically generating year options

      cy.compareObjects(expectedRequestBody, comparableRequestBody);
    });

    // Test redirect and success message
    cy.formSubmittedCorrectly();
  });

  it('DISSERTATION - User can fill the form with information and succesfully submit it', () => {
    // Note: author role selector is currently dependant on FI language
    // This could (and should) be improved
    cy.changeLanguage('FI');

    // Accept turnstile notification
    cy.getBySel('accept-form-terms-button').click();

    // Perustiedot - Step 1
    cy.isbnFillStep1(true); // true = isDissertation
    cy.getBySel('isbn-form-next-button').click();

    // Yliopiston tiedot - Step 2

    // Validate that only Helsinki University dissertations are accepted through form
    cy.get('select').select(2);
    cy.get('body').click();

    const step2ValidationErrorsSelect = ['isHelsinki'];

    // Run validation check for select fields
    cy.checkSelectValidationErrors(step2ValidationErrorsSelect);
    cy.getBySel('isbn-form-next-button').should('be.disabled');

    // Fill step 2 info
    cy.get('select').eq(0).select(1);
    cy.getBySel('isbn-form-next-button').click();

    // Yhteystiedot - Step 3

    // Validate step fields
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="contactPerson"]').clear();
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="address"]').clear();
    cy.get('input[name="zip"]').type('1');
    cy.get('input[name="city"]').type('1');
    cy.get('input[name="phone"]').type('abc');
    cy.get('input[name="email"]').type('abc');
    cy.get('body').click();

    const step3validationErrors = [
      'contactPerson',
      'address',
      'zip',
      'city',
      'phone',
      'email'
    ];

    // Run validation check for input fields
    cy.checkInputValidationErrors(step3validationErrors);
    cy.getBySel('isbn-form-next-button').should('be.disabled');

    // Clear inputs
    cy.get('input[name="zip"]').clear();
    cy.get('input[name="city"]').clear();
    cy.get('input[name="phone"]').clear();
    cy.get('input[name="email"]').clear();

    // Fill step 3 info
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('test@example.com');
    cy.getBySel('isbn-form-next-button').click();

    // Julkaisun tiedot - Step 4
    cy.isbnFillStep4();
    cy.getBySel('isbn-form-next-button').click();

    // Tekijät - Step 5
    cy.isbnFillStep5();
    cy.getBySel('isbn-form-next-button').click();

    // Sarjan tiedot - Step 6
    cy.isbnFillStep6();
    cy.getBySel('isbn-form-next-button').click();

    // Väitöskirjan julkaisumuoto - Step 7
    // Validations
    cy.get('select[name="publicationFormat"]').select(0);
    cy.get('body').click();

    const validationErrors = ['publicationFormat'];

    // Run validation check for selected fields
    cy.checkSelectValidationErrors(validationErrors);
    cy.getBySel('isbn-form-next-button').should('be.disabled');

    // Fill step 7 info
    cy.get('select[name="publicationFormat"]').select(3);
    cy.get('input[name="printingHouse"]').type('Printing house');
    cy.get('input[name="printingHouseCity"]').type('Printing house city');
    cy.getBySel('isbn-form-next-button').click();

    // Lisätiedot - Step 8
    cy.get('textarea[name="comments"]').type('Additional info');
    cy.getBySel('isbn-form-next-button').click();

    // Esikatselu - Step 9
    // Labels that should be displayed on the preview page
    const previewTests = {
      address: 'Address',
      zip: '12345',
      city: 'City',
      universityName: 'Helsingin yliopisto',
      phone: '1234567890',
      contactPerson: 'Contact person',
      email: 'test@example.com',
      title: 'Title',
      subtitle: 'Subtitle',
      language: 'suomi',
      month: 'tammikuu',
      //year: '2025', TODO: this would break each time when year will change
      series: 'Series',
      issn: '1234-5678',
      volume: '123',
      publicationFormat: 'Sekä painettuna että sähköisenä',
      printingHouse: 'Printing house',
      printingHouseCity: 'Printing house city',
      comments: 'Additional info',
      publicationType: 'Väitöskirja',
      publicationsPublic: 'Kyllä'
    };

    // Check that preview page has 8 data containers
    cy.getBySel('isbn-form-preview').within(() => {
      cy.get('.listComponentContainer').should('have.length', 7);
    });

    // Check that preview page contains correct labels and values
    for (const [k, v] of Object.entries(previewTests)) {
      cy.getBySel(`list-component-${k}`).invoke('text').should('equal', v);
    }

    // Submit form - note: interceptor will respond with success + id
    cy.getBySel('isbn-form-submit-button').click();

    // Verify response body contains what it should
    cy.wait('@postIsbnIsmnForm').then((interception) => {
      expect(interception.request.url).to.equal('http://localhost:8080/api/public/isbn-registry/requests/publications');

      // Note: many fields have different value in API format than what is displayed in UI
      // See function formatPublicationValues in src/frontend/components/form/isbnIsmnRegistrationForm/utils.js
      const expectedRequestBody = {
        ...previewTests,
        langCode: 'fi-FI',
        language: 'FIN',
        publicationsPublic: true, // Label is displayed in preview page, API call needs to include value
        month: '01', // Transformed to two digit format in format function
        publicationType: 'DISSERTATION',
        publicationFormat: 'PRINT_ELECTRONICAL', // Sekä painettuna että sähköisenä in API format
        fileformat: ['PDF'],
        type: ['PAPERBACK'],
        firstName1: 'First name',
        lastName1: 'Last name',
        role1: ['AUTHOR'],
        officialName: 'Helsingin yliopisto', // Helsingin yliopisto is the publisher this information is transfomed from universityName
        locality: 'Helsinki' // placed in formatting due to accepting only Helsingin yliopisto for dissertations
      };

      delete expectedRequestBody.universityName;

      // Note: year parameter differ from API call and thus is not to be compared
      const comparableRequestBody = JSON.parse(JSON.stringify(interception.request.body)); // Deep copy
      delete comparableRequestBody.year; // Year cannot be compared reliably due to dynamically generating year options

      cy.compareObjects(expectedRequestBody, comparableRequestBody);
    });

    // Test redirect and success message
    cy.formSubmittedCorrectly();
  });
});

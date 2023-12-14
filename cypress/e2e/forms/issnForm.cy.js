describe('Tunnistepalvelut - ISSN-lomake', () => {
  // run before each test
  beforeEach(() => {
    cy.intercept('POST', '/api/public/issn-registry/requests', (req) => {
      return req.reply({statusCode: 201, fixture: 'responses/formCreateSucceeded.json'});
    }).as('postIssnForm');

    cy.visit('/forms/issn-publication');
  });

  it.only('User can fill, edit, preview and submit the form', () => {
    // Check that turnstile notification is displayed
    cy.turnstileFormNotificationIsDisplayed();
    cy.changeLanguage('FI'); // tmp
    cy.getBySel('accept-form-terms-button').click();

    // Julkaisujen lukumäärä - Step 1
    // Version guide should be visible hand have three h3 title elements
    cy.getBySel('issn-version-guide').should('be.visible');
    cy.getBySel('issn-version-guide').find('h3').should('have.length', 3);

    cy.get('select').select(1); // Test with two items
    cy.getBySel('issn-form-next-button').click();

    // Julkaisijan tiedot - Step 2
    // Test validations
    // Clear required fields and type invalid data for fields with additional validation
    cy.get('input[name="official_name"]').type('1');
    cy.get('input[name="official_name"]').clear();
    cy.get('input[name="contact_person"]').type('1');
    cy.get('input[name="contact_person"]').clear();
    cy.get('input[name="email_common"]').type('1');
    cy.get('input[name="phone"]').type('1');
    cy.get('input[name="address"]').type('1');
    cy.get('input[name="address"]').clear();
    cy.get('input[name="zip"]').type('1');
    cy.get('input[name="city"]').type('1');
    cy.get('input[name="city"]').clear();

    // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
    cy.get('input[name="official_name"]').click();

    // With input above there are should be validation errors for fields: official_name, contact_person, email_common, phone, address, zip, city
    const validationErrors = [
      'official_name',
      'contact_person',
      'email_common',
      'phone',
      'address',
      'zip',
      'city'
    ];

    // Run validation check and verify user cannot progress
    cy.checkInputValidationErrors(validationErrors);
    cy.getBySel('issn-form-next-button').should('be.disabled');

    // Clear input fields that have input from validation test
    cy.get('input[name="email_common"]').clear();
    cy.get('input[name="phone"]').clear();
    cy.get('input[name="zip"]').clear();

    // Input information
    cy.get('input[name="official_name"]').type('Official name with typo');
    cy.get('input[name="contact_person"]').type('Contact person');
    cy.get('input[name="email_common"]').type('test@example.com');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.getBySel('issn-form-next-button').click();

    // Go back and edit official name value
    cy.getBySel('issn-form-back-button').click();
    cy.get('input[name="official_name"]').clear();
    cy.get('input[name="official_name"]').type('Official name');
    cy.getBySel('issn-form-next-button').click();

    // Julkaisun 1 tiedot - Step 3
    // Check field validations
    // Clear required fields and type invalid data for fields with additional validation
    cy.get('input[name="title_1"]').type('Title');
    cy.get('input[name="title_1"]').clear();
    cy.get('input[name="place_of_publication_1"]').type('Place');
    cy.get('input[name="place_of_publication_1"]').clear();
    cy.get('input[name="issued_from_year_1"]').type('test');
    cy.get('input[name="issued_from_number_1"]').type('2');
    cy.get('input[name="issued_from_number_1"]').clear();
    cy.get('select[name="frequency_1"]').select(0);
    cy.get('select[name="language_1"]').select(0);
    cy.get('select[name="publication_type_1"]').select(0);
    cy.get('select[name="medium_1"]').select(0);

    // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
    cy.get('input[name="title_1"]').click();

    // With input above there are should be validation errors for fields: title1, place_of_publication_1, issued_from_year_1, issued_from_number_1, frequency_1, language_1, publication_type_1, medium_1
    const validationErrorsInput = [
      'title_1',
      'place_of_publication_1',
      'issued_from_year_1',
      'issued_from_number_1'
    ];

    const validationErrorsSelect = [
      'frequency_1',
      'language_1',
      'publication_type_1',
      'medium_1'
    ];

    // Run validation check for input fields
    cy.checkInputValidationErrors(validationErrorsInput);

    // Run validation check for select fields
    cy.checkSelectValidationErrors(validationErrorsSelect);
    cy.getBySel('issn-form-next-button').should('be.disabled');

    // Clear fields
    cy.get('input[name="issued_from_year_1"]').clear();

    // Fill the form with the full set of valid publication information
    cy.get('input[name="title_1"]').type('Title 1');
    cy.get('input[name="subtitle_1"]').type('Subtitle 1');
    cy.get('input[name="place_of_publication_1"]').type('Place 1');
    cy.get('input[name="issued_from_year_1"]').type('2020');
    cy.get('input[name="issued_from_number_1"]').type('1');
    cy.get('select[name="frequency_1"]').select(1);
    cy.get('select[name="language_1"]').select(1);
    cy.get('select[name="publication_type_1"]').select(1);
    cy.get('select[name="medium_1"]').select(2);
    cy.get('input[name="url_1"]').type('https://example.com');
    cy.get('select[name="publication_was_issued_1"]').select(1);
    cy.get('input[name="previous_1"]').type('Previous 1');
    cy.get('input[name="previous_issn_1"]').type('1234-5678');
    cy.get('input[name="previous_last_issue_1"]').type('Previous last issue 1');
    cy.get('select[name="publication_has_main_series_1"]').select(1);
    cy.get('input[name="main_series_1"]').type('Main series 1');
    cy.get('input[name="main_series_issn_1"]').type('1234-5678');
    cy.get('select[name="publication_has_subseries_1"]').select(1);
    cy.get('input[name="subseries_1"]').type('Subseries 1');
    cy.get('input[name="subseries_issn_1"]').type('1234-5678');
    cy.get('select[name="publication_has_another_medium_1"]').select(1);
    cy.get('input[name="another_medium_1"]').type('Another medium 1');
    cy.get('input[name="another_medium_issn_1"]').type('1234-5678');
    cy.get('textarea[name="additional_info_1"]').type('Additional info 1');

    cy.getBySel('issn-form-next-button').click();

    // Julkaisun 2 tiedot - Step 4
    // Fill the form with the required fields only
    cy.get('input[name="title_2"]').type('Title 2');
    cy.get('input[name="place_of_publication_2"]').type('Place 2');
    cy.get('input[name="issued_from_year_2"]').type('2022');
    cy.get('input[name="issued_from_number_2"]').type('2');
    cy.get('select[name="frequency_2"]').select(3);
    cy.get('select[name="language_2"]').select(3);
    cy.get('select[name="publication_type_2"]').select(3);
    cy.get('select[name="medium_2"]').select(3);
    cy.getBySel('issn-form-next-button').click();

    // Esikatselu - Step 5
    cy.getBySel('issn-form-preview').should('be.visible');
    cy.getBySel('issn-form-preview-publisher').should('be.visible');
    cy.getBySel('issn-form-preview-publications').should('be.visible');

    // Publisher's information has valid data
    const publisherInfo = {
      officialName: 'Official name',
      contactPerson: 'Contact person',
      email: 'test@example.com',
      phone: '123456789',
      address: 'Address',
      zip: '12345',
      city: 'City'
    };

    for (const [k, v] of Object.entries(publisherInfo)) {
      cy.getBySel(`list-component-${k}`).invoke('text').should('equal', v);
    }

    // Both publication cards should be visible and available for expanding
    [1, 2].forEach(publicationIdx => cy.getBySel(`publication-card-${publicationIdx}`).click());

    // Publication 1 information has valid data
    const publicationData1 = {
      title: 'Title 1',
      subtitle: 'Subtitle 1',
      placeOfPublication: 'Place 1',
      issuedFromYear: '2020',
      issuedFromNumber: '1',
      frequency: 'Kerran vuodessa', // 'a' translated to Finnish
      language: 'suomi',
      publicationType: 'Aikakauslehti (maksullinen)',
      medium: 'sähköinen',
      url: 'https://example.com',
      previous: {
        title: 'Previous 1',
        issn: '1234-5678',
        lastIssue: 'Previous last issue 1'
      },
      mainSeries: {
        title: 'Main series 1',
        issn: '1234-5678'
      },
      subseries: {
        title: 'Subseries 1',
        issn: '1234-5678'
      },
      anotherMedium: {
        title: 'Another medium 1',
        issn: '1234-5678'
      },
      additionalInfo: 'Additional info 1'
    };

    const publicationData2 = {
      title: 'Title 2',
      placeOfPublication: 'Place 2',
      issuedFromYear: '2022',
      issuedFromNumber: '2',
      frequency: 'Kerran viikossa', // 'w' translated to Finnish
      language: 'englanti',
      publicationType: 'Henkilöstölehti',
      medium: 'CD-ROM'
    };

    // This 'beautiful' loop iterates over each key/value pair to validate that
    // both publications information are displayed correctly. Some keys are objects
    // so that the validation of data send in POST request is easier to validate.
    [publicationData1, publicationData2].forEach((publicationData, idx) => {
      for (const [k, v] of Object.entries(publicationData)) {
        if (typeof v === 'string') {
          cy.getBySel(`publication-card-${idx + 1}-${k}`).invoke('text').should('equal', v);
        } else if (typeof v === 'object') {
          for (const [ok, ov] of Object.entries(v)) {
            cy.getBySel(`publication-card-${idx + 1}-${k}-${ok}`).invoke('text').should('equal', ov);
          }
        }
      }
    });

    // Both publication cards should be accordions that can also be closed
    [1, 2].forEach(publicationIdx => cy.getBySel(`publication-card-${publicationIdx}-summary`).click());

    // Loop again to test that detailed publication data does not be visible
    [publicationData1, publicationData2].forEach((publicationData, idx) => {
      for (const [k, v] of Object.entries(publicationData)) {
        if (typeof v === 'string') {
          cy.getBySel(`publication-card-${idx + 1}-${k}`).should('not.be.visible');
        } else if (typeof v === 'object') {
          for (const ok of Object.keys(v)) {
            cy.getBySel(`publication-card-${idx + 1}-${k}-${ok}`).should('not.be.visible');
          }
        }
      }
    });

    // Submit form - note: interceptor will respond with success + id
    cy.getBySel('issn-form-submit-button').click();

    // Verify response body contains what it should
    cy.wait('@postIssnForm').then((interception) => {
      expect(interception.request.url).to.equal('http://localhost:8080/api/public/issn-registry/requests');

      // Note: many fields have different value in API format than what is displayed in UI
      // See function formatPublicationValues in src/frontend/components/form/isbnIsmnRegistrationForm/utils.js
      const expectedRequestBody = {
        form: {
          ...publisherInfo,
          publisher: publisherInfo.officialName,
          langCode: 'fi-FI'
        },
        publications: [
          {
            ...publicationData1,
            frequency: 'a',
            language: 'FIN',
            publicationType: 'JOURNAL',
            medium: 'ONLINE',
            // API requires the following values to be within arrays
            // see formatValues function inside src/frontend/components/form/issnRegistrationForm/utils.js
            previous: {
              title: ['Previous 1'],
              issn: ['1234-5678'],
              lastIssue: ['Previous last issue 1']
            },
            mainSeries: {
              title: ['Main series 1'],
              issn: ['1234-5678']
            },
            subseries: {
              title: ['Subseries 1'],
              issn: ['1234-5678']
            },
            anotherMedium: {
              title: ['Another medium 1'],
              issn: ['1234-5678']
            }
          },
          {
            ...publicationData2,
            frequency: 'w',
            language: 'ENG',
            publicationType: 'STAFF_MAGAZINE',
            medium: 'CDROM'
          }
        ]
      };

      delete expectedRequestBody.form.officialName; // Transformed to 'publisher' key for API

      // Verify request matches the expected value
      cy.compareObjects(interception.request.body, expectedRequestBody);

      // Test redirect and success message
      cy.formSubmittedCorrectly();
    });
  });
});

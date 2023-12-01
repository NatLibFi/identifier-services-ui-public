describe('Tunnistepalvelut - ISSN-lomake', () => {
  // run before each test
  beforeEach(() => {
    cy.visit('localhost:8080/forms/issn-publication');
    // See the Cloudflare info page and continue to the form
    cy.get('.turnstileContainer').should('be.visible');
    cy.get('.turnstileContainer button').click();
  });

  it('User can check instructions on the first page of the form', () => {
    // Check that instructions regarding publication versions are visible
    cy.get('.versionGuide').should('be.visible');

    // Check that there are 3 instruction blocks
    cy.get('.versionGuide').within(() => {
      cy.get('p').should('have.length', 3);
    });
  });

  it('User can fill the form, edit, preview and succesfully submit it', () => {
    cy.get('.formButtonsContainer > button').eq('1').as('nextButton'); // alias for the 'Next'-button

    // Julkaisujen lukumäärä - Step 1
    // Select to fill the form with two publications
    cy.get('select').select(1);
    cy.get('@nextButton').click();

    // Julkaisijan tiedot - Step 2
    // Fill the form with the full set of publisher information since all fields are required
    cy.get('input[name="official_name"]').type('Official name');
    cy.get('input[name="contact_person"]').type('Contact person');
    cy.get('input[name="email_common"]').type('test@example.com');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('@nextButton').click();

    // 1.julkaisun tiedot - Step 3
    // Fill the form with the full set of publication information
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
    cy.get('@nextButton').click();

    // 2.julkaisun tiedot - Step 4
    // Fill the form with the required fields only
    cy.get('input[name="title_2"]').type('Title 2');
    cy.get('input[name="place_of_publication_2"]').type('Place 2');
    cy.get('input[name="issued_from_year_2"]').type('2022');
    cy.get('input[name="issued_from_number_2"]').type('2');
    cy.get('select[name="frequency_2"]').select(3);
    cy.get('select[name="language_2"]').select(3);
    cy.get('select[name="publication_type_2"]').select(3);
    cy.get('select[name="medium_2"]').select(3);
    cy.get('@nextButton').click();

    // Esikatselu - Step 5
    cy.get('.mainContainer').within(() => {
      // Check that preview page has 2 data containers (publisher & publication)
      cy.get('.listComponentContainer').should('have.length', 2);

      // Check that information blocks for both publications are visible
      cy.get('.listComponentContainer')
        .eq('1')
        .within(() => {
          cy.get('.issnPublicationCards > div').should('have.length', 2);
        });
    });

    // Labels to be displayed on the preview page in Publisher's information section
    const publisherLabels = [
      ['Julkaisijan nimi', 'Publisher name'],
      ['Yhteyshenkilö', 'Contact person'],
      ['Sähköposti', 'Email'],
      ['Puhelinnumero', 'Phone number'],
      ['Lähiosoite', 'Address'],
      ['Postinumero', 'Postal code'],
      ['Postitoimipaikka', 'City']
    ];

    // Check that preview page contains correct publisher info labels
    cy.get('.listComponentContainer')
      .eq('0')
      .within(() => {
        for (const label of publisherLabels) {
          const regex = new RegExp((`${label.join('|')}`));
          cy.get('span.label').contains(regex).should('exist');
        }});

    // Check that all publisher info labels have a corresponding value which is not empty
    cy.get(
      '.MuiListItemText-root > .MuiTypography-root > .MuiGrid-container > :nth-child(2)'
    ).each($el => {
      expect($el.text()).to.not.equal('');
    });

    // Publication info blocks can be expanded by clicking on toggle button
    cy.get('.MuiAccordionSummary-expandIconWrapper').eq('0').click();
    cy.get('.MuiAccordionSummary-expandIconWrapper').eq('1').click();

    // Labels to be displayed on the preview page in the first Publication's information section
    const firstPublicationLabels = [
      ['Nimeke', 'Title'],
      ['Alanimeke', 'Subtitle'],
      ['Kustannuspaikka', 'Place of publication'],
      ['Ilmestynyt alkaen', 'Issued from'],
      ['Ilmestynyt alkaen', 'Issued from'],
      ['Ilmestymistiheys', 'Publishing frequency'],
      ['Kieli', 'Language'],
      ['Julkaisutyyppi', 'Publication type'],
      ['Julkaisumuoto', 'Format'],
      ['Julkaisun www-osoite', 'Web-address'],
      ['Aikaisemmat nimimuodot', 'Previous name forms'],
      ['ISSN', 'ISSN'],
      ['Viimeinen numero/vuosi', 'Last issue/year'],
      ['Pääsarja', 'Main series'],
      ['ISSN', 'ISSN'],
      ['Alasarja', 'Sub series'],
      ['ISSN', 'ISSN'],
      ['Toinen julkaisumuoto', 'Another medium'],
      ['ISSN', 'ISSN'],
      ['Lisätiedot', 'Additional details']
    ];

    // Labels to be displayed on the preview page in the second Publication's information section
    const secondPublicationLabels = [
      ['Nimeke', 'Title'],
      ['Kustannuspaikka', 'Place of publication'],
      ['Ilmestynyt alkaen', 'Issued from'],
      ['Ilmestynyt alkaen', 'Issued from'],
      ['Ilmestymistiheys', 'Publishing frequency'],
      ['Kieli', 'Language'],
      ['Julkaisutyyppi', 'Publication type'],
      ['Julkaisumuoto' , 'Format']
    ];

    // Check that preview page contains correct publication info labels
    // First publication
    cy.get('.listComponentContainer')
      .eq('1')
      .find('.MuiAccordion-root')
      .eq('0')
      .within(() => {
        for (const label of firstPublicationLabels) {
          const regex = new RegExp((`${label.join('|')}`));
          cy.contains(regex).should('be.visible');
        }
      });
    // Second publication
    cy.get('.listComponentContainer')
      .eq('1')
      .find('.MuiAccordion-root')
      .eq('1')
      .within(() => {
        for (const label of secondPublicationLabels) {
          const regex = new RegExp((`${label.join('|')}`));
          cy.contains(regex).should('be.visible');
        }
      });

    // Check that all publication info labels have a corresponding value which is not empty
    cy.get('.MuiAccordionDetails-root > div > :nth-child(2)').each($el => {
      expect($el.text()).to.not.equal('');
    });

    // Check that user can go back to the previous step and edit a field
    cy.get('.MuiGrid-item').contains('Official name');
    cy.get('.formSubmitButtonsContainer > button').eq('0').click();
    Cypress._.times(2, () =>
      cy.get('.formButtonsContainer > button').eq('0').click()
    );
    cy.get('input[name="official_name"]').clear();
    cy.get('input[name="official_name"]').type('Another name');
    Cypress._.times(3, () => cy.get('@nextButton').click());
    cy.get('.MuiGrid-item').should('not.contain', 'Official name');
    cy.get('.MuiGrid-item').contains('Another name');

    // Submit the form and check that it is succesfully submitted
    cy.submitForm();
  });

  // Validation - Julkaisijan tiedot - Step 2
  it('Validation - Step 2', () => {
    cy.get('.formButtonsContainer > button').eq('1').as('nextButton'); // alias for the 'Next'-button

    // Julkaisujen lukumäärä - Step 1
    // Select to fill the form with on publication to proceed to the next step
    cy.get('select').select(0);
    cy.get('@nextButton').click();

    // Julkaisijan tiedot - Step 2
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

    // Run validation check
    cy.checkInputValidationErrors(validationErrors);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Julkaisun tiedot - Step 3
  it('Validation - Step 3', () => {
    cy.get('.formButtonsContainer > button').eq('1').as('nextButton'); // alias for the 'Next'-button

    // Julkaisujen lukumäärä - Step 1
    // Select to fill the form with 1 publication to proceed to the next step
    cy.get('select').select(0);
    cy.get('@nextButton').click();

    // Julkaisijan tiedot - Step 2
    // Fill required fields to proceed to the next step
    cy.get('input[name="official_name"]').type('Official name');
    cy.get('input[name="contact_person"]').type('Contact person');
    cy.get('input[name="email_common"]').type('test@example.com');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('@nextButton').click();

    // Julkaisujen tiedot - Step 3
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

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');

    // User can fix the errors and proceed to the next step
    cy.get('input[name="title_1"]').type('Title');
    cy.get('input[name="place_of_publication_1"]').type('Place');
    cy.get('input[name="issued_from_year_1"]').clear();
    cy.get('input[name="issued_from_year_1"]').type('2022');
    cy.get('input[name="issued_from_number_1"]').type('2');
    cy.get('select[name="frequency_1"]').select(3);
    cy.get('select[name="language_1"]').select(3);
    cy.get('select[name="publication_type_1"]').select(3);
    cy.get('select[name="medium_1"]').select(3);

    // The Next-button should be enabled this time
    cy.get('@nextButton').should('not.be.disabled').click();
  });
});

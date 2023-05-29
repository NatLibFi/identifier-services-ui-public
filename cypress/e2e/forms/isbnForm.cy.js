describe('Tunnistepalvelut - ISBN-/ISMN-lomake', () => {
  // run before each test
  beforeEach(() => {
    cy.visit('localhost:8080/forms/isbn-ismn-publication');
    cy.get('.formButtonsContainer > button').eq('1').as('nextButton'); // alias for the 'Next'-button
  });

  it('BOOK - User can fill the form, edit, preview and succesfully submit it', () => {
    // Perustiedot - Step 1
    cy.isbnFillStep1();
    cy.get('@nextButton').click();

    // Kustantajan tiedot - Step 2
    cy.isbnFillStep2();
    cy.get('@nextButton').click();

    // Kustannustoiminta - Step 3
    cy.isbnFillStep3();
    cy.get('@nextButton').click();

    // Julkaisun tiedot - Step 4
    cy.isbnFillStep4();
    cy.get('@nextButton').click();

    // Tekijät - Step 5
    cy.isbnFillStep5();
    cy.get('@nextButton').click();

    // Sarjan tiedot - Step 6
    cy.isbnFillStep6();
    cy.get('@nextButton').click();

    // Julkaisumuoto - Step 7
    cy.isbnFillStep7();
    cy.get('@nextButton').click();

    // Lisätiedot - Step 8
    cy.get('textarea[name="comments"]').type('Additional info');
    cy.get('@nextButton').click();

    // Esikatselu - Step 9
    cy.get('.mainContainer').within(() => {
      // Check that preview page has 8 data containers
      cy.get('.listComponentContainer').should('have.length', 8);
    });

    // Labels to be displayed on the preview page
    const labels = [
      'Kustantajan nimi',
      'Kustantajatunnus',
      'Lähiosoite',
      'Postinumero',
      'Postitoimipaikka',
      'Puhelinnumero',
      'Yhteyshenkilö',
      'Sähköposti',
      'Nimeke',
      'Alanimeke',
      'Kieli',
      'Julkaisukuukausi',
      'Julkaisuvuosi',
      'Kustantanut aiemmin',
      'Julkaisutoiminta',
      'Arviolta kuinka monta julkaisua kustannatte kuluvana vuonna',
      'Julkaisu ilmestyy',
      'Kansityyppi',
      'Tiedostomuoto',
      'Tunnus',
      'Numero',
      'Julkinen',
      'Tyyppi'
    ];

    // Check that preview page contains correct info labels
    cy.get('.mainContainer').within(() => {
      for (const label of labels) {
        cy.get('span.label').contains(label).should('exist');
      }
    });

    // Check that all labels have a corresponding value which is not empty
    cy.get(
      '.MuiListItemText-root > .MuiTypography-root > .MuiGrid-container > :nth-child(2)'
    ).each($el => {
      expect($el.text()).to.not.equal('');
    });

    // Check that user can go back to the previous step and edit a field
    cy.get('.MuiGrid-item').contains('Additional info');
    cy.get('.formSubmitButtonsContainer > button').eq('0').click();
    cy.get('textarea[name="comments"]').clear();
    cy.get('textarea[name="comments"]').type('The new (super important) info');
    cy.get('@nextButton').click();
    cy.get('.MuiGrid-item').should('not.contain', 'Additional info');
    cy.get('.MuiGrid-item').contains('The new (super important) info');

    // Submit the form and check that it is succesfully submitted
    cy.submitForm();
  });

  // Validation - Perustiedot - Step 1
  it('BOOK - Validation - Step 1', () => {
    cy.get('select').eq(0).select(0);
    cy.get('select').eq(1).select(0);

    // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
    cy.get('select').eq(0).select(0);

    const validationErrorsSelect = ['publicationsPublic', 'publicationType'];

    // Run validation check for select fields
    cy.checkSelectValidationErrors(validationErrorsSelect);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Kustantajan tiedot - Step 2
  it('BOOK - Validation - Step 2', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1();
    cy.get('@nextButton').click();

    // Clear required fields and type invalid data for fields with additional validation
    cy.get('input[name="officialName"]').type('Name');
    cy.get('input[name="officialName"]').clear();
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="address"]').clear();
    cy.get('input[name="zip"]').type('1');
    cy.get('input[name="city"]').type('1');
    cy.get('input[name="phone"]').type('abc');
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="contactPerson"]').clear();
    cy.get('input[name="email"]').type('1');

    // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
    cy.get('input[name="zip"]').click();

    // With input above there are should be validation errors for fields: officialName, address, zip, city, phone, contactPerson, email
    const validationErrorsInput = [
      'officialName',
      'address',
      'zip',
      'city',
      'phone',
      'contactPerson',
      'email'
    ];

    // Run validation check for input fields
    cy.checkInputValidationErrors(validationErrorsInput);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Kustannustoimnta - Step 3
  it('BOOK - Validation - Step 3', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1();
    cy.get('@nextButton').click();

    // Fill the second step of the form to proceed to the third step
    cy.isbnFillStep2();
    cy.get('@nextButton').click();

    cy.get('select[name="publishingActivity"]').select(0);
    cy.get('input[name="publishingActivityAmount"]').type('123');
    cy.get('input[name="publishingActivityAmount"]').clear();
    cy.get('select[name="publishedBefore"]').select(0);

    // With input above there are should be validation errors for fields: publishingActivity, publishingActivityAmount
    const validationErrorsInput = ['publishingActivityAmount'];

    const validationErrorsSelect = ['publishingActivity'];

    // Run validation check for input fields
    cy.checkInputValidationErrors(validationErrorsInput);

    // Run validation check for select fields
    cy.checkSelectValidationErrors(validationErrorsSelect);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Julkaisun tiedot - Step 4
  it('BOOK - Validation - Step 4', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1();
    cy.get('@nextButton').click();

    // Fill the second step of the form to proceed to the third step
    cy.isbnFillStep2();
    cy.get('@nextButton').click();

    // Fill the third step of the form to proceed to the fourth step
    cy.isbnFillStep3();
    cy.get('@nextButton').click();

    cy.get('input[name="title"]').type('Title');
    cy.get('input[name="title"]').clear();
    cy.get('select[name="language"]').select(0);
    cy.get('select[name="publicationMonth"]').select(0);
    cy.get('select[name="publicationYear"]').select(0);
    cy.get('input[name="subtitle"]').type('Subtitle');

    // With input above there are should be validation errors for fields: title, language, publicationMonth, publicationYear
    const validationErrorsInput = ['title'];

    const validationErrorsSelect = [
      'language',
      'publicationMonth',
      'publicationYear'
    ];

    // Run validation check for input fields
    cy.checkInputValidationErrors(validationErrorsInput);

    // Run validation check for select fields
    cy.checkSelectValidationErrors(validationErrorsSelect);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Tekijät - Step 5
  it('BOOK - Validation - Step 5', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1();
    cy.get('@nextButton').click();

    // Fill the second step of the form to proceed to the third step
    cy.isbnFillStep2();
    cy.get('@nextButton').click();

    // Fill the third step of the form to proceed to the fourth step
    cy.isbnFillStep3();
    cy.get('@nextButton').click();

    // Fill the fourth step of the form to proceed to the fifth step
    cy.isbnFillStep4();
    cy.get('@nextButton').click();

    cy.get('input[name="firstName"]').type('First name');
    cy.get('input[name="lastName"]').type('Last name');
    cy.get('.isbnAuthorsFields > div:last-child').click(); // Click to open multiselect dropdown (author role)
    cy.get('#react-select-2-option-0').click(); // Select the first option
    cy.get('.isbnAuthorsFields ~ button').click(); // Add author
    cy.get('.renderAuthorsContainer button').click(); // Remove author

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Sarjan tiedot - Step 6
  it('BOOK - Validation - Step 6', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1();
    cy.get('@nextButton').click();

    // Fill the second step of the form to proceed to the third step
    cy.isbnFillStep2();
    cy.get('@nextButton').click();

    // Fill the third step of the form to proceed to the fourth step
    cy.isbnFillStep3();
    cy.get('@nextButton').click();

    // Fill the fourth step of the form to proceed to the fifth step
    cy.isbnFillStep4();
    cy.get('@nextButton').click();

    // Fill the fifth step of the form to proceed to the sixth step
    cy.isbnFillStep5();
    cy.get('@nextButton').click();

    cy.get('input[name="issn"]').type('abc');
    cy.get('input[name="volume"]').type('123');

    // With input above there are should be validation errors for fields: issn
    const validationErrorsInput = ['issn'];

    // Run validation check for input fields
    cy.checkInputValidationErrors(validationErrorsInput);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Julkaisumuoto - Step 7
  it('BOOK - Validation - Step 7', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1();
    cy.get('@nextButton').click();

    // Fill the second step of the form to proceed to the third step
    cy.isbnFillStep2();
    cy.get('@nextButton').click();

    // Fill the third step of the form to proceed to the fourth step
    cy.isbnFillStep3();
    cy.get('@nextButton').click();

    // Fill the fourth step of the form to proceed to the fifth step
    cy.isbnFillStep4();
    cy.get('@nextButton').click();

    // Fill the fifth step of the form to proceed to the sixth step
    cy.isbnFillStep5();
    cy.get('@nextButton').click();

    // Skip the sixth step of the form to proceed to the seventh step
    cy.get('@nextButton').click();

    cy.get('select[name="publicationFormat"]').select(3);
    cy.get('.subContainer > div > div:nth-child(2)').click(); // Click to open multiselect dropdown (publication type)
    cy.get('.subContainer > div > div:nth-child(7)').click(); // Click to open multiselect dropdown (file format)
    cy.get('input[name="copies"]').type('123');

    // With input above there are should be validation errors for fields: publicationType, fileFormat
    cy.get('.selectErrors').should('have.length', 2);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');

    // User can fix the errors and proceed to the next step
    cy.get('.subContainer > div > div:nth-child(2)').click(); // Click to open multiselect dropdown (publication type)
    cy.get('#react-select-3-option-0').click(); // Select the first option
    cy.get('.subContainer > div > div:nth-child(7)').click(); // Click to open multiselect dropdown (file format)
    cy.get('#react-select-4-option-0').click(); // Select the first option

    // The Next-button should be enabled this time
    cy.get('@nextButton').should('not.be.disabled').click();
  });

  it('DISSERTATION - User can fill the form, edit, preview and succesfully submit it', () => {
    // Perustiedot - Step 1
    cy.isbnFillStep1(true); // true = isDissertation
    cy.get('@nextButton').click();

    // Yliopiston tiedot - Step 2
    cy.get('select').eq(0).select(1);
    cy.get('@nextButton').click();

    // Yhteystiedot - Step 3
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('@nextButton').click();

    // Julkaisun tiedot - Step 4
    cy.isbnFillStep4();
    cy.get('@nextButton').click();

    // Tekijät - Step 5
    cy.isbnFillStep5();
    cy.get('@nextButton').click();

    // Sarjan tiedot - Step 6
    cy.isbnFillStep6();
    cy.get('@nextButton').click();

    // Väitöskirjan julkaisumuoto - Step 7
    cy.get('select[name="publicationFormat"]').select(3);
    cy.get('select[name="edition"]').select(1);
    cy.get('input[name="printingHouse"]').type('Printing house');
    cy.get('input[name="printingHouseCity"]').type('Printing house city');
    cy.get('@nextButton').click();

    // Lisätiedot - Step 8
    cy.get('textarea[name="comments"]').type('Additional info');
    cy.get('@nextButton').click();

    // Esikatselu - Step 9
    cy.get('.mainContainer').within(() => {
      // Check that preview page has 7 data containers
      cy.get('.listComponentContainer').should('have.length', 7);
    });

    // Labels to be displayed on the preview page
    const labels = [
      'Lähiosoite',
      'Postinumero',
      'Postitoimipaikka',
      'Puhelinnumero',
      'Yhteyshenkilö',
      'Sähköposti',
      'Nimeke',
      'Alanimeke',
      'Kieli',
      'Julkaisukuukausi',
      'Julkaisuvuosi',
      'Yliopisto',
      'Julkaisu ilmestyy',
      'Kirjapaino',
      'Valmistajan kotipaikka',
      'Painos',
      'Tunnus',
      'Numero',
      'Julkinen',
      'Tyyppi'
    ];

    // Check that preview page contains correct info labels
    cy.get('.mainContainer').within(() => {
      for (const label of labels) {
        cy.get('span.label').contains(label).should('exist');
      }
    });

    // Check that all labels have a corresponding value which is not empty
    cy.get(
      '.MuiListItemText-root > .MuiTypography-root > .MuiGrid-container > :nth-child(2)'
    ).each($el => {
      expect($el.text()).to.not.equal('');
    });

    // Check that user can go back to the previous step and edit a field
    cy.get('.MuiGrid-item').contains('Additional info');
    cy.get('.formSubmitButtonsContainer > button').eq('0').click();
    cy.get('textarea[name="comments"]').clear();
    cy.get('textarea[name="comments"]').type('The new (super important) info');
    cy.get('@nextButton').click();
    cy.get('.MuiGrid-item').should('not.contain', 'Additional info');
    cy.get('.MuiGrid-item').contains('The new (super important) info');

    // Submit the form and check that it is succesfully submitted
    cy.submitForm();
  });

  /* Validating only steps 2, 3 and 7 because the other steps are the same as in the BOOK form and have been tested above */
  // Validation - Yliopiston tiedot - Step 2
  it('DISSERTATION - Validation - Step 2', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1(true); // true = isDissertation
    cy.get('@nextButton').click();

    cy.get('select').select(2);
    cy.get('body').click();

    const validationErrorsSelect = ['isHelsinki'];

    // Run validation check for select fields
    cy.checkSelectValidationErrors(validationErrorsSelect);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Yhteystiedot - Step 3
  it('DISSERTATION - Validation - Step 3', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1(true); // true = isDissertation
    cy.get('@nextButton').click();

    // Fill the second step of the form to proceed to the third step
    cy.get('select').eq(0).select(1);
    cy.get('@nextButton').click();

    // Yhteystiedot - Step 3
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="contactPerson"]').clear();
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="address"]').clear();
    cy.get('input[name="zip"]').type('1');
    cy.get('input[name="city"]').type('1');
    cy.get('input[name="phone"]').type('abc');
    cy.get('input[name="email"]').type('abc');
    cy.get('body').click();

    const validationErrors = [
      'contactPerson',
      'address',
      'zip',
      'city',
      'phone',
      'email'
    ];

    // Run validation check for input fields
    cy.checkInputValidationErrors(validationErrors);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Väitöskirjan julkaisumuoto - Step 7
  it('DISSERTATION - Validation - Step 7', () => {
    // Fill the first step of the form to proceed to the second step
    cy.isbnFillStep1(true); // true = isDissertation
    cy.get('@nextButton').click();

    // Fill the second step of the form to proceed to the third step
    cy.get('select').eq(0).select(1);
    cy.get('@nextButton').click();

    // Fill the third step of the form to proceed to the fourth step
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="address"]').type('Address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('@nextButton').click();

    // Fill the fourth step of the form to proceed to the fifth step
    cy.isbnFillStep4();
    cy.get('@nextButton').click();

    // Fill the fifth step of the form to proceed to the sixth step
    cy.isbnFillStep5();
    cy.get('@nextButton').click();

    // Fill the sixth step of the form to proceed to the seventh step
    cy.isbnFillStep6();
    cy.get('@nextButton').click();

    cy.get('select[name="publicationFormat"]').select(0);
    cy.get('body').click();

    const validationErrors = ['publicationFormat'];

    // Run validation check for select fields
    cy.checkSelectValidationErrors(validationErrors);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');

    // User can fix the errors and proceed to the next step
    cy.get('select[name="publicationFormat"]').select(3);

    // The Next-button should be enabled this time
    cy.get('@nextButton').should('not.be.disabled').click();
  });
});

describe('Tunnistepalvelut - Liittymislomake', () => {
  // run before each test
  beforeEach(() => {
    cy.visit('localhost:8080/forms/isbn-ismn-publisher');
  });

  it('User can check instructions on the first page of the form', () => {
    // Check that instructions for filling the form are visible
    cy.get('.notesContainer').should('be.visible');

    // Check that there are 5 instructions and that the second one has a link
    cy.get('.notesContainer').within(() => {
      cy.get('ul > li').should('have.length', 5);
      cy.get('ul > li').eq(1).find('a').should('exist');
    });
  });

  it('User can fill the form, edit, preview and succesfully submit it', () => {
    cy.get('.notesContainer button').click();
    cy.get('.formButtonsContainer > button').eq('1').as('nextButton'); // alias for the 'Next'-button

    // Kustantajan tiedot - Step 1
    cy.get('input[name="officialName"]').type('Official name');
    cy.get('input[name="otherNames"]').type('Other name');
    cy.get('input[name="address"]').type('Street address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="www"]').type('www.example.com');
    cy.get('@nextButton').click();

    // Kustannustominta - Step 2
    cy.get('input[name="frequencyCurrent"]').type('123');
    cy.get('input[name="frequencyNext"]').type('456');
    // Open Classification codes -dropdown and select the first option
    cy.get('.MuiGrid-spacing-xs-2 > .MuiGrid-container').click();
    cy.get('#react-select-2-option-0').click();
    cy.get('input[name="classificationOther"]').type('Other classification');
    cy.get('@nextButton').click();

    // Organisaation lisätiedot - Step 3
    cy.get('input[name="affiliateOf"]').type('Affiliate of');
    cy.get('input[name="affiliates"]').type('Affiliates');
    cy.get('input[name="distributorOf"]').type('Distributor of');
    cy.get('input[name="distributors"]').type('Distributors');
    cy.get('@nextButton').click();

    // Esikatselu - Step 4
    cy.get('.mainContainer').within(() => {
      // Check that preview page has 5 data containers
      cy.get('.listComponentContainer').should('have.length', 5);
    });

    // Labels to be displayed on the preview page when all fields are filled
    const labels = [
      'Kustantajan nimi',
      'Muut nimet',
      'Puhelinnumero',
      'Sähköposti',
      'Yhteyshenkilö',
      'Verkkosivu',
      'Lähiosoite',
      'Postinumero',
      'Postitoimipaikka',
      'Tytäryhtiöt',
      'Emoyhtiöt',
      'Jakelijat',
      'Yritykset, joiden jakelija',
      'Arvio julkaisumäärästä (tämä vuosi)',
      'Arvio julkaisumäärästä (tuleva vuosi)',
      'Luokitus',
      'Muu luokitus'
    ];

    // Check that preview page contains correct labels
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
    cy.get('.MuiGrid-item').contains('Distributors');
    cy.get('.formSubmitButtonsContainer > button').eq('0').click();
    cy.get('input[name="distributors"]').clear();
    cy.get('input[name="distributors"]').type('Another distributors');
    cy.get('@nextButton').click();
    cy.get('.MuiGrid-item').should('not.contain', 'Distributors');
    cy.get('.MuiGrid-item').contains('Another distributors');

    // Submit the form
    cy.get('.formSubmitButtonsContainer > button').eq('1').click();

    // Check that the form was submitted successfully and success message is shown
    cy.get('.MuiAlert-message').should(
      'contain',
      'Lomake on lähetetty onnistuneesti'
    );

    // Wait for redirect to the home page and check that the redirect was successful
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500).then(() => {
      cy.location('pathname').should('equal', '/');
    });
  });

  // Validation - Kustantajan tiedot - Step 1
  it('Validation errors are shown when fields are not filled or filled with invalid data', () => {
    cy.get('.notesContainer button').click();
    cy.get('.formButtonsContainer > button').eq('1').as('nextButton');

    // Kustantajan tiedot - Step 1
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

    // With input above there are should be validation errors for fields: officialName, address, zip, city, phone, contactPerson, email
    const validationErrors = [
      'officialName',
      'address',
      'zip',
      'city',
      'phone',
      'contactPerson',
      'email'
    ];

    // Run validation check
    cy.checkValidationErrors(validationErrors);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');
  });

  // Validation - Kustannustominta - Step 2
  it('Validation errors are shown when required fields are not filled', () => {
    cy.get('.notesContainer button').click();
    cy.get('.formButtonsContainer > button').eq('1').as('nextButton');

    // Kustantajan tiedot - Step 1
    // Fill required fields of the first step to be able to proceed to the second step
    cy.get('input[name="officialName"]').type('Official name');
    cy.get('input[name="address"]').type('Street address');
    cy.get('input[name="zip"]').type('12345');
    cy.get('input[name="city"]').type('City');
    cy.get('input[name="phone"]').type('123456789');
    cy.get('input[name="contactPerson"]').type('Contact person');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('@nextButton').click();

    // Kustannustominta - Step 2
    // Clear required fields
    cy.get('input[name="frequencyCurrent"]').type('123');
    cy.get('input[name="frequencyCurrent"]').clear();
    cy.get('input[name="frequencyNext"]').type('456');
    cy.get('input[name="frequencyNext"]').clear();
    cy.get('input[name="classificationOther"]').type('Other classification');
    cy.get('input[name="classificationOther"]').clear();

    // Click somewhere else to trigger validation of the last field (required due to current validation implementation)
    cy.get('input[name="frequencyCurrent"]').click();

    // There are should be validation errors for fields: frequencyCurrent, frequencyNext, classificationOther
    const validationErrors = [
      'frequencyCurrent',
      'frequencyNext',
      'classificationOther'
    ];

    // Run validation check
    cy.checkValidationErrors(validationErrors);

    // The Next-button should be disabled
    cy.get('@nextButton').should('be.disabled');

    // User can fix the errors and proceed to the next step
    cy.get('input[name="frequencyCurrent"]').type('123');
    cy.get('input[name="frequencyNext"]').type('456');
    cy.get('.MuiGrid-spacing-xs-2 > .MuiGrid-container').click();
    cy.get('#react-select-2-option-0').click();

    // The Next-button should be enabled this time
    cy.get('@nextButton').should('not.be.disabled').click();
  });
});

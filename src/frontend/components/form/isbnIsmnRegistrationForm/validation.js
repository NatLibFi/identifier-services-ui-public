/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * Public UI service of Identifier Services system
 *
 * Copyright (C) 2023 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-ui-public
 *
 * identifier-services-ui-public program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * identifier-services-ui-public is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 */

import {ELECTRONICAL_FORMATS, FORMATS, PRINT_FORMATS, PUBLICATION_TYPES} from '../constants';
import {getRequiredFieldErrors, getErrors, getMaxLengthErrors} from '../validationUtils';
import {regexPatterns} from '../../validation';

export function validate(values) {
  const isDissertation = values.publicationType === 'DISSERTATION';

  const requiredFieldsArray = [
    // General required fields for all publication types
    'publicationsPublic',
    'publicationType',
    'address',
    'zip',
    'city',
    'phone',
    'contactPerson',
    'email',
    'title',
    'language',
    'publicationMonth',
    'publicationYear',
    'publicationFormat',
    // Required for all publication types except dissertation
    !isDissertation ? 'officialName' : null,
    !isDissertation ? 'publishingActivity' : null,
    // Required only for dissertations
    isDissertation ? 'isHelsinki' : null
  ];

  const generalFieldErrors = getErrors(validateGeneralFields());
  const nonDissertationFieldErrors = getErrors(validateNonDissertationFields(isDissertation));

  // Validate mandatory fields
  const requiredFieldsErrors = getRequiredFieldErrors(requiredFieldsArray, values);

  // Validating file format & type for all publication types except dissertation
  // Counter is used for testing whether next button should be disabled in format definition page
  const additionalFormatFieldErrors = {additionalFormatFields: nonDissertationFieldErrors.length};
  const maxLengthErrors = getAllMaxLengthErrors(values);

  const errorsForAllPublications = {
    ...generalFieldErrors,
    ...nonDissertationFieldErrors,
    ...requiredFieldsErrors,
    ...maxLengthErrors
  };

  // If additionalFormatField counter is zero, do not return it so form can be submitted
  if (additionalFormatFieldErrors.additionalFormatFields === 0) {
    return errorsForAllPublications;
  }

  return {...errorsForAllPublications, ...additionalFormatFieldErrors};

  function getAllMaxLengthErrors(values) {
    const max200Chars = [
      'title',
      'subtitle',
      'series'
    ];

    const max100Chars = [
      'officialName',
      'email',
      'contactPerson',
      'printingHouse',
      'typeOther',
      'fileformatOther'
    ];

    const max50Chars = [
      'city',
      'address',
      'firstName1',
      'lastName1',
      'firstName2',
      'lastName2',
      'firstName3',
      'lastName3',
      'firstName4',
      'lastName4',
      'mapScale',
      'printingHouseCity'
    ];

    const max20Chars = ['publisherIdentifierStr', 'volume'];

    return {
      ...getMaxLengthErrors(['comments'], 2000, values),
      ...getMaxLengthErrors(max200Chars, 200, values),
      ...getMaxLengthErrors(max100Chars, 100, values),
      ...getMaxLengthErrors(max50Chars, 50, values),
      ...getMaxLengthErrors(['phone'], 30, values),
      ...getMaxLengthErrors(max20Chars, 20, values),
      ...getMaxLengthErrors(['copies'], 10, values)
    };
  }

  function validateGeneralFields() {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    return [
      {fieldName: 'email', hasError: values.email && !regexPatterns.email.test(values.email), message: 'format.email'},
      {fieldName: 'zip', hasError: values.zip && !regexPatterns.zip.test(values.zip), message: 'postalAddress.zip.format'},
      {fieldName: 'city', hasError: values.city && !regexPatterns.city.test(values.city), message: 'format.city'},
      {fieldName: 'phone', hasError: values.phone && !regexPatterns.phone.test(values.phone), message: 'format.phone'},
      // In case below the message is blank, since we are displaying the error message in the InfoCard component
      {fieldName: 'publicationsPublic', hasError: !values.publicationsPublic || String(values.publicationsPublic).toLowerCase() !== 'true', message: 'emptyField'},
      {fieldName: 'publicationType', hasError: !values.publicationType, message: 'field.required'},
      {fieldName: 'issn', hasError: values.issn && !regexPatterns.issn.test(values.issn), message: 'format.issn'},
      {fieldName: 'isHelsinki', hasError: values.publicationType === PUBLICATION_TYPES.DISSERTATION && values.isHelsinki !== 'true', message: 'publicationRegistrationIsbnIsmn.form.otherUniversitites'},
      {fieldName: 'publishingActivityAmount', hasError: values.publishingActivityAmount && values.publishingActivityAmount.length > 5, message: 'format.publishingActivityAmount'}, // API requires publishing activity amount value to be not longer than 5 characters
      {
        fieldName: 'authors', hasError: !values.authors || values.authors.length === 0, message: {
          _error: 'At least one member must be enter'
        }
      },
      {
        fieldName: 'authors', hasError: values.authors && values.authors.length > 4, message: {
          _error: 'format.authorsLength'
        }
      },
      {
        fieldName: 'publicationMonth',
        hasError:
          // Display an error if publication date (month) is in the past
          values.publicationMonth && parseInt(values.publicationMonth) < currentMonth && parseInt(values.publicationYear) === currentYear, message: 'date.min'
      }
    ];
  }

  function validateNonDissertationFields(isDissertation) {
    if(isDissertation) {
      return [];
    }

    const publicationContainsPrint = values.publicationFormat === FORMATS.PRINT || values.publicationFormat === FORMATS.PRINT_ELECTRONICAL;
    const publicationContainsElec = values.publicationFormat === FORMATS.ELECTRONICAL || values.publicationFormat === FORMATS.PRINT_ELECTRONICAL;

    // If publication contains print format
    const containsPrintValidators = [
      // type is required
      {fieldName: 'type', hasError: !values.type || values.type.length === 0, message: 'field.required'},
      // if type selection includes OTHER_PRINT, need to explain type further
      {fieldName: 'typeOther', hasError: values.type?.map(t => t.value).includes(PRINT_FORMATS.OTHER_PRINT) && !values.typeOther, message: 'field.required'},
      // max length for typeOther is 100 characters
      {fieldName: 'typeOther', hasError: values.typeOther && values.typeOther.length > 100, message: 'format.maxLength'},
      // if defining edition, it must be given as number
      {fieldName: 'edition', hasError: values.edition && !regexPatterns.twoDigitInteger.test(values.edition), message: 'format.integer.twoDigits'},
      // if defining copies, it must be not longer than 10 characters
      {fieldName: 'copies', hasError: values.copies && values.copies.length > 10, message: 'format.copies'}
    ];

    // If publication contains electronic format
    const containsElecValidators = [
      // fileformat is required
      {fieldName: 'fileformat', hasError: !values.fileformat || values.fileformat.length === 0, message: 'field.required'},
      // if fileformat selection includes OTHER, need to explain type further
      {fieldName: 'fileformatOther', hasError: values.fileformat?.map(t => t.value).includes(ELECTRONICAL_FORMATS.OTHER) && !values.fileformatOther, message: 'field.required'},
      {fieldName: 'fileformatOther', hasError: values.fileformatOther && values.fileformatOther.length > 100, message: 'format.maxLength'}
    ];

    if (publicationContainsPrint && publicationContainsElec) {
      return [...containsPrintValidators, ...containsElecValidators];
    }

    if (publicationContainsPrint) {
      return containsPrintValidators;
    }

    if (publicationContainsElec) {
      return containsElecValidators;
    }
  }
}

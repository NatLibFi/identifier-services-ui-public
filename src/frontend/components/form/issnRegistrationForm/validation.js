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

import {getRequiredFieldErrors, getErrors, getMaxLengthErrors} from '../validationUtils';
import {regexPatterns} from '../../validation';

export function validate(values) {
  const requiredFieldsArray = [
    'official_name',
    'contact_person',
    'email_common',
    'phone',
    'address',
    'zip',
    'city'
  ];

  const requiredPublicationFields = [
    'title',
    'place_of_publication',
    'issued_from_year',
    'issued_from_number',
    'frequency',
    'language',
    'publication_type',
    'medium'
  ];

  const generalFieldErrors = getErrors(validateGeneralFields());
  const requiredFieldErrors = getRequiredFieldErrors(requiredFieldsArray, values);
  const maxLengthErrors = getAllMaxLengthErrors(values);
  const publicationErrors = {};

  // Adds publication errors to pre-defined object
  // TO DO: refactor
  validatePublications();

  return {
    ...generalFieldErrors,
    ...requiredFieldErrors,
    ...maxLengthErrors,
    ...publicationErrors
  };

  function getAllMaxLengthErrors(values) {
    const max100Chars = ['official_name', 'contact_person', 'email'];
    const max50Chars = ['address', 'city'];

    return {
      ...getMaxLengthErrors(max100Chars, 100, values),
      ...getMaxLengthErrors(max50Chars, 50, values),
      ...getMaxLengthErrors(['phone'], 30, values),
      ...getMaxLengthErrors(['zip'], 10, values)
    };
  }

  function validateGeneralFields() {
    return [
      {fieldName: 'email_common', hasError: values.email_common && !regexPatterns.email.test(values.email_common), message: 'format.email'},
      {fieldName: 'zip', hasError: values.zip && !regexPatterns.zip.test(values.zip), message: 'postalAddress.zip.format'},
      {fieldName: 'phone', hasError: values.phone && !regexPatterns.phone.test(values.phone), message: 'format.phone'}
    ];
  }

  // Note: uses values and errors of parent function scope
  function testMandatoryField(field) {
    if (!values[field] || values[field] === '') {
      publicationErrors[field] = 'field.required';
    }
  }

  function validatePublications() {
    // Iterate through all publications for validating publication's fields
    // Publication fields follow format <field>_<idx> where indexing starts at 1
    const publicationIdx = [...Array(Number(values.number_of_versions)).keys()].map(i => i +1);

    publicationIdx.forEach(idx => {
      // Mandatory field validations
      requiredPublicationFields.map(fname => `${fname}_${idx}`).forEach(field => testMandatoryField(field));

      // Conditional mandatory field validations

      // Other frequency
      if(values[`frequency_${idx}`] && values[`frequency_${idx}`] === 'z' && !values[`frequency_other_${idx}`]) {
        publicationErrors[`frequency_other_${idx}`] = 'field.required';
      }

      // Online publication URL
      if(values[`medium_${idx}`] && values[`medium_${idx}`] === 'ONLINE' && !values[`url_${idx}`]) {
        publicationErrors[`url_${idx}`] = 'field.required';
      }

      // Previous publication
      if(values[`publication_was_issued_${idx}`] && values[`publication_was_issued_${idx}`] === 'true') {
        const requiredPreviousPublicationFields = ['previous', 'previous_last_issue'];
        requiredPreviousPublicationFields.map(fname => `${fname}_${idx}`).forEach(field => testMandatoryField(field));
      }

      // Main series
      if(values[`publication_has_main_series_${idx}`] && values[`publication_has_main_series_${idx}`] === 'true') {
        const requiredPreviousPublicationFields = ['main_series'];
        requiredPreviousPublicationFields.map(fname => `${fname}_${idx}`).forEach(field => testMandatoryField(field));
      }

      // Subseries
      if(values[`publication_has_subseries_${idx}`] && values[`publication_has_subseries_${idx}`] === 'true') {
        const requiredPreviousPublicationFields = ['subseries'];
        requiredPreviousPublicationFields.map(fname => `${fname}_${idx}`).forEach(field => testMandatoryField(field));
      }

      // Another medium
      if(values[`publication_has_another_medium_${idx}`] && values[`publication_has_another_medium_${idx}`] === 'true') {
        const requiredPreviousPublicationFields = ['another_medium'];
        requiredPreviousPublicationFields.map(fname => `${fname}_${idx}`).forEach(field => testMandatoryField(field));
      }

      // ISSN format validations
      const issnFields = [
        'previous_issn',
        'main_series_issn',
        'subseries_issn',
        'another_medium_issn'
      ];

      issnFields.forEach(issnField => {
        if(values[`${issnField}_${idx}`] && !regexPatterns.issn.test(values[`${issnField}_${idx}`])) {
          publicationErrors[`${issnField}_${idx}`] = 'format.issn';
        }
      });

      if (values[`issued_from_year_${idx}`] && !regexPatterns.yearString.test(values[`issued_from_year_${idx}`])) {
        publicationErrors[`issued_from_year_${idx}`] = 'format.year';
      }

      // Publication field max length validations
      const maxLengthValidationsPublication = {
        '2000': ['additional_info'],
        '200': ['title', 'subtitle'],
        '100': ['place_of_publication', 'printer', 'issued_from_number', 'url', 'previous', 'main_series', 'subseries', 'another_medium'],
        '50': ['previous_last_issue', 'frequency_other', 'publication_type_other']
      };

      Object.keys(maxLengthValidationsPublication).forEach(l => {
        maxLengthValidationsPublication[l].forEach(f => {
          if(values[`${f}_${idx}`] && values[`${f}_${idx}`].length > Number(l)) {
            publicationErrors[`${f}_${idx}`] = 'format.maxLength';
          }
        });
      });
    });
  }
}

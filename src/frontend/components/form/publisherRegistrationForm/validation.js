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
    'officialName',
    'contactPerson',
    'phone',
    'email',
    'address',
    'zip',
    'city',
    'frequencyCurrent',
    'frequencyNext'
  ];

  const generalFieldErrors = getErrors(validateGeneralFields());
  const requiredFieldErrors = getRequiredFieldErrors(requiredFieldsArray, values);
  const maxLengthErrors = getAllMaxLengthErrors(values);
  const classificationErrors = getClassificationErrors(values);

  return {
    ...generalFieldErrors,
    ...requiredFieldErrors,
    ...maxLengthErrors,
    ...classificationErrors
  };

  function validateGeneralFields() {
    return [
      {fieldName: 'email', hasError: values.email && !regexPatterns.email.test(values.email), message: 'format.email'},
      {fieldName: 'zip', hasError: values.zip && !regexPatterns.zip.test(values.zip), message: 'postalAddress.zip.format'},
      {fieldName: 'city', hasError: values.city && !regexPatterns.city.test(values.city), message: 'format.city'},
      {fieldName: 'phone', hasError: values.phone && !regexPatterns.phone.test(values.phone), message: 'format.phone'}
    ];
  }

  function getAllMaxLengthErrors(values) {
    const max200Chars = [
      'otherNames',
      'affiliates',
      'distributorOf'
    ];

    const max100Chars = [
      'officialName',
      'contactPerson',
      'email',
      'www'
    ];

    const max50Chars = [
      'address',
      'classificationOther',
      'frequencyCurrent',
      'frequencyNext',
      'city',
      'affiliateOf',
      'distributors'
    ];

    return {
      ...getMaxLengthErrors(max200Chars, 200, values),
      ...getMaxLengthErrors(max100Chars, 100, values),
      ...getMaxLengthErrors(max50Chars, 50, values),
      ...getMaxLengthErrors(['phone'], 30, values)
    };
  }

  // At least one of two classification fields must be filled (classification or classificationOther)
  function getClassificationErrors(values) {
    const {classification = []} = values;
    const classificationErrors = {};

    if ((!classification || classification.length === 0) && values.classificationOther === undefined) {
      classificationErrors.classification = 'field.required';
    }

    if ((!values.classificationOther || values.classificationOther.length === 0) && (!classification || classification.length === 0)) {
      classificationErrors.classificationOther = 'field.required';
    }

    // Max. amount of classification keywords is 5
    if (values.classification?.length > 5) {
      classificationErrors.classification = 'classification.maxAmount';
    }

    return classificationErrors;
  }
}

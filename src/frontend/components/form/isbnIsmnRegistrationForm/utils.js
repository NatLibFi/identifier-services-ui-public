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

import moment from 'moment';

import {PAGES} from './constants';
import {PUBLICATION_TYPES, FORMATS, PRINT_FORMATS, ELECTRONICAL_FORMATS} from '../constants';
import {formatLanguage} from '../utils';

export function formatPublicationValues(values, langCode) {
  const formattedAuthors = formatAuthors(values.authors);

  const formattedValues = {
    ...values,
    ...formattedAuthors,
    langCode: formatLanguage(langCode),
    officialName: isDissertation(values) ? 'Helsingin yliopisto' : values.officialName,
    publicationsPublic: formatBoolean(values.publicationsPublic),
    publishedBefore: formatBoolean(values.publishedBefore),
    // API requires month value with leading zero if it's less than 10
    month: values.publicationMonth < 10 ? `0${values.publicationMonth}` : values.publicationMonth,
    year: values.publicationYear,
    type: isDissertation(values) ? getDissertationType(values) : formatType(values.type),
    fileformat: isDissertation(values) ? getDissertationFileformat(values) : formatType(values.fileformat),
    // The National Library only issues ISBN id's for dissertations made for University of Helsinki
    locality: isDissertation(values) ? 'Helsinki' : null,
    // Ensure that typeOther and fileformatOthercvalues are not sent to the API if corresponding type/fileformat is not OTHER (Muu)
    typeOther: values.type?.some(v => v.value === 'OTHER_PRINT') ? values.typeOther : null,
    fileformatOther: values.fileformat?.some(v => v.value === 'OTHER') ? values.fileformatOther : null
  };

  // Delete unnecessary values
  delete formattedValues.authors;
  delete formattedValues.publicationMonth;
  delete formattedValues.publicationYear;
  delete formattedValues.isHelsinki;
  delete formattedValues.firstName;
  delete formattedValues.lastName;
  delete formattedValues.roles;

  return formattedValues;

  function formatAuthors(authors) {
    const result = {};

    [1, 2, 3, 4].filter(v => authors.length >= v).forEach(v => {
      result[`firstName${v}`] = authors[v - 1].firstName;
      result[`lastName${v}`] = authors[v - 1].lastName;
      result[`role${v}`] = authors[v - 1].roles.map(r => r.value);
    });

    return result;
  }

  function isDissertation(values) {
    return values.publicationType === PUBLICATION_TYPES.DISSERTATION;
  }

  function getDissertationType(values) {
    if (values.publicationFormat === FORMATS.PRINT || values.publicationFormat === FORMATS.PRINT_ELECTRONICAL) {
      return [PRINT_FORMATS.PAPERBACK];
    }

    return [];
  }

  function getDissertationFileformat(values) {
    if (values.publicationFormat === FORMATS.ELECTRONICAL || values.publicationFormat === FORMATS.PRINT_ELECTRONICAL) {
      return [ELECTRONICAL_FORMATS.PDF];
    }

    return [];
  }

  function formatType(types) {
    return types ? types.map(v => v.value) : [];
  }

  function formatBoolean(value) {
    return value ? value.toLowerCase() === 'true' : undefined;
  }
}

// Get the months as options
export const getMonthOptions = (lang) => {
  moment.locale(lang);

  const months = moment.monthsShort();
  const options = [
    {label: '', value: ''},
    ...months.map((month, index) =>
      ({
        label: moment().month(month).format('MMMM').charAt(0).toUpperCase() + moment().month(month).format('MMMM').slice(1),
        value: index + 1 // In moment months are zero-indexed
      }))
  ];

  return options;
};

// Get the current year and set it and the next 5 years as options
export const getYearOptions = () => {
  const currentYear = moment().year();
  const years = [currentYear, currentYear + 1, currentYear + 2, currentYear + 3, currentYear + 4, currentYear + 5];
  const options = [
    {label: '', value: ''},
    ...years.map(year => ({label: year, value: year}))
  ];

  return options;
};

export function filterFormFields(formPages, publicationValues) {
  // Map scale field is used only for maps, removes the field if a type of the current publication is not a map
  const pages = publicationIsMap(publicationValues) ? removeFields(formPages, ['mapScale']) : {...formPages};
  const publishingFormat = getFormatIsbn(publicationValues);

  // Add publishing format fields based on selected format if format is selected
  // Otherwise return the page
  return publishingFormat === null ? pages : addFormatFields(pages, publishingFormat);

  function publicationIsMap(publicationValues) {
    return publicationValues && publicationValues.publicationType !== PUBLICATION_TYPES.MAP;
  }

  // Used for getting the format of a publication
  function getFormatIsbn(publicationValues) {
    if (publicationValues && publicationValues.publicationFormat) {
      const idx = Object.values(FORMATS).indexOf(publicationValues.publicationFormat);
      return idx === -1 ? null : publicationValues.publicationFormat;
    }

    return null;
  }

  // Used for removing fields from the ISBN form
  function removeFields(content, fieldsToRemove) {
  // Should not be used for the preview page, since it has no "content"
    const {preview, ...rest} = content; // eslint-disable-line no-unused-vars
    const newContent = content ? {...rest} : {};
    Object.keys(newContent).forEach(k => {
      newContent[k].fields = newContent[k].fields.filter(f => fieldsToRemove.indexOf(f.name) === -1);
    });

    return newContent;
  }

  // Format detail fields are added based on format type
  function addFormatFields(pages, format) {
    const newPages = {...pages};
    const additionalFields = format === FORMATS.PRINT_ELECTRONICAL
    // If format is print and electronic, add additional fields for both formats
      ? newPages[PAGES.FORMAT].additionalFields
        .flatMap(aFields => aFields.fields)
      // Leave only the first field with the name "edition" (print) and remove the second one (electronic) due to db schema limitation
        .filter((field, index, array) => field.name !== 'edition' || array.findIndex(f => f.name === 'edition') === index)
    // If format is either print or electronic, add additional fields for that format only
      : newPages[PAGES.FORMAT].additionalFields
        .find(f => f.format === format).fields;

    // Add all needed additional fields to the format page
    newPages[PAGES.FORMAT].fields = [...newPages[PAGES.FORMAT].fields, ...additionalFields];

    return newPages;
  }
}

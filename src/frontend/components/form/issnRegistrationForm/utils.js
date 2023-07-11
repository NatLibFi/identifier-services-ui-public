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

// Handles formatting of ISSN data for submission to the API
export const formatValues = (values, formattedLanguage) => {
  const {official_name, contact_person, email_common, phone, address, zip, city} = values;

  // Publisher values
  const formattedPublisherValues = {
    publisher: official_name,
    contactPerson: contact_person,
    email: email_common,
    langCode: formattedLanguage,
    phone: phone,
    address: address,
    zip: zip,
    city: city
  };

  // Format publication values
  const formattedPublicationValues = getPublicationItems(values);

  return {
    form: {...formattedPublisherValues},
    publications: [...formattedPublicationValues],
    turnstileToken: values.turnstileToken
  };
};

function getPublicationItems(values) {
  return [...Array(Number(values.number_of_versions)).keys()].map(idx => {
    const publicationIdx = idx + 1; // Form values start from 1
    return {
      title: values[`title_${publicationIdx}`],
      subtitle: values[`subtitle_${publicationIdx}`],
      placeOfPublication: values[`place_of_publication_${publicationIdx}`],
      printer: values[`printer_${publicationIdx}`],
      issuedFromYear: values[`issued_from_year_${publicationIdx}`],
      issuedFromNumber: values[`issued_from_number_${publicationIdx}`],
      frequency: values[`frequency_${publicationIdx}`],
      frequencyOther: values[`frequency_other_${publicationIdx}`],
      language: values[`language_${publicationIdx}`],
      publicationType: values[`publication_type_${publicationIdx}`],
      publicationTypeOther: values[`publication_type_other_${publicationIdx}`],
      medium: values[`medium_${publicationIdx}`],
      mediumOther: values[`medium_other_${publicationIdx}`],
      url: (values[`url_${publicationIdx}`] && values[`url_${publicationIdx}`].match(/https?:\/\/.+$/))
        // Return the value if url already contains http(s)://
        ? values[`url_${publicationIdx}`]
        : values[`url_${publicationIdx}`]
        // Add https:// prefix to the url if it is missing
          ? `https://${values[`url_${publicationIdx}`]}`
          // Otherwise return undefined (do not show the field or send to api)
          : undefined,
      previous: values[`publication_was_issued_${publicationIdx}`] === 'true' ? {
        title: [values[`previous_${publicationIdx}`]],
        issn: [values[`previous_issn_${publicationIdx}`] ?? ''],
        lastIssue: [values[`previous_last_issue_${publicationIdx}`]]
      } : undefined,
      mainSeries: values[`publication_has_main_series_${publicationIdx}`] === 'true' ? {
        title: [values[`main_series_${publicationIdx}`]],
        issn: [values[`main_series_issn_${publicationIdx}`] ?? '']
      } : undefined,
      subseries: values[`publication_has_subseries_${publicationIdx}`] === 'true' ? {
        title: [values[`subseries_${publicationIdx}`]],
        issn: [values[`subseries_issn_${publicationIdx}`] ?? '']
      } : undefined,
      anotherMedium: values[`publication_has_another_medium_${publicationIdx}`] === 'true' ? {
        title: [values[`another_medium_${publicationIdx}`]],
        issn: [values[`another_medium_issn_${publicationIdx}`] ?? '']
      } : undefined,
      additionalInfo: values[`additional_info_${publicationIdx}`]
    };
  });
}

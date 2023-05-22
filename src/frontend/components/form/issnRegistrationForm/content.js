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

import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
  issnPublicationFrequencyOptions,
  issnPublicationTypeOptions,
  issnFormPublicationsVersionOptions,
  mediumOptions,
  publishingLanguages,
  booleanOptions
} from '../constants';
import {PAGES} from './constants';

export function getFormPages(values) {
  const pages = {
    [PAGES.PUBLICATION_VERSIONS]: {
      renderType: 'element',
      fields: [
        {
          name: 'number_of_versions',
          type: 'select',
          width: 'half',
          label: 'form.issn.versionInfo.number_of_versions',
          options: issnFormPublicationsVersionOptions
        }
      ]
    },
    [PAGES.PUBLISHER_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'official_name',
          type: 'text',
          label: <FormattedMessage id="form.issn.publisherInfo.name"/>,
          width: 'half'
        },
        {
          name: 'contact_person',
          type: 'text',
          label: <FormattedMessage id="form.issn.publisherInfo.contact_person"/>,
          width: 'half'
        },
        {
          name: 'email_common',
          type: 'text',
          label: <FormattedMessage id="form.issn.publisherInfo.email"/>,
          width: 'half'
        },
        {
          name: 'phone',
          type: 'text',
          label: <FormattedMessage id="form.issn.publisherInfo.phone"/>,
          width: 'half'
        },
        {
          name: 'address',
          type: 'text',
          label: <FormattedMessage id="form.issn.publisherInfo.address"/>,
          width: 'half'
        },
        {
          name: 'zip',
          type: 'text',
          label: <FormattedMessage id="form.issn.publisherInfo.zip"/>,
          width: 'half'
        },
        {
          name: 'city',
          type: 'text',
          label: <FormattedMessage id="form.issn.publisherInfo.city"/>,
          width: 'half'
        }
      ]
    },
    [PAGES.PREVIEW]: 'preview'
  };

  const publicationPages = [...Array(Number(values.number_of_versions)).keys()].reduce((prev, idx) => ({
    [`${PAGES.PUBLICATION_BASIC_INFORMATION}_${idx + 1}`]: getPublicationFields(idx + 1), // Note: indexing in publication numbers is to start from one for naming purposes
    ...prev
  }), {});

  return {
    ...pages,
    ...publicationPages
  };

  // Note: uses values from parent function for logic of displaying fields
  function getPublicationFields(idx) {
    return {
      renderType: 'element',
      fields: [
        {
          name: `${'title'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.title"/>,
          instructions: <FormattedMessage id="form.issn.publicationInfo.title.instructions"/>,
          width: 'half'
        },
        {
          name: `${'subtitle'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.subtitle"/>,
          width: 'half'
        },
        {
          name: `${'place_of_publication'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.place_of_publication"/>,
          width: 'half'
        },
        {
          name: `${'issued_from_year'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.issued_from_year"/>,
          width: 'half'
        },
        {
          name: `${'issued_from_number'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.issued_from_number"/>,
          width: 'half'
        },
        {
          name: `${'frequency'}_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.frequency',
          width: 'half',
          options: issnPublicationFrequencyOptions
        },
        values[`frequency_${idx}`] === 'z' && {
          name: `${'frequency_other'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.other"/>,
          width: 'half'
        },
        {
          name: `language_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.language',
          width: 'half',
          options: publishingLanguages
        },
        {
          name: `${'publication_type'}_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.publication_type',
          width: 'half',
          options: issnPublicationTypeOptions
        },
        values[`publication_type_${idx}`] === 'OTHER_SERIAL' && {
          name: `${'publication_type_other'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationCard.other"/>,
          width: 'half'
        },
        {
          name: `medium_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.medium',
          width: 'half',
          options: mediumOptions
        },
        values[`medium_${idx}`] === 'PRINTED' && {
          name: `${'printer'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.printer"/>,
          width: 'half'
        },
        values[`medium_${idx}`] === 'OTHER' && {
          name: `${'medium_other'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.other"/>,
          width: 'half'
        },
        values[`medium_${idx}`] === 'ONLINE' && {
          name: `${'url'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.url"/>,
          width: 'half'
        },
        {
          name: `publication_was_issued_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.publication_was_issued',
          width: 'half',
          options: booleanOptions
        },
        values[`publication_was_issued_${idx}`] === 'true' && {
          name: `${'previous'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.previous"/>,
          width: 'half'
        },
        values[`publication_was_issued_${idx}`] === 'true' && {
          name: `${'previous_issn'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.issn"/>,
          width: 'half'
        },
        values[`publication_was_issued_${idx}`] === 'true' && {
          name: `${'previous_last_issue'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.last_issue"/>,
          width: 'half'
        },
        {
          name: `publication_has_main_series_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.publication_has_main_series',
          width: 'half',
          options: booleanOptions
        },
        values[`publication_has_main_series_${idx}`] === 'true' && {
          name: `${'main_series'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.main_series"/>,
          width: 'half'
        },
        values[`publication_has_main_series_${idx}`] === 'true' && {
          name: `${'main_series_issn'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.main_series_issn"/>,
          width: 'half'
        },
        {
          name: `publication_has_subseries_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.publication_has_subseries',
          width: 'half',
          options: booleanOptions
        },
        values[`publication_has_subseries_${idx}`] === 'true' && {
          name: `${'subseries'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.subseries"/>,
          width: 'half'
        },
        values[`publication_has_subseries_${idx}`] === 'true' && {
          name: `${'subseries_issn'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.subseries_issn"/>,
          width: 'half'
        },
        {
          name: `publication_has_another_medium_${idx}`,
          type: 'select',
          label: 'form.issn.publicationInfo.publication_has_another_medium',
          width: 'half',
          instructions: <FormattedMessage id="form.issn.publicationInfo.publication_has_another_medium.instructions"/>,
          options: booleanOptions
        },
        values[`publication_has_another_medium_${idx}`] === 'true' &&  {
          name: `${'another_medium'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.another_medium"/>,
          width: 'half'
        },
        values[`publication_has_another_medium_${idx}`] === 'true' && {
          name: `${'another_medium_issn'}_${idx}`,
          type: 'text',
          label: <FormattedMessage id="form.issn.publicationInfo.another_medium_issn"/>,
          width: 'half'
        },
        {
          name: `${'additional_info'}_${idx}`,
          type: 'textArea',
          ariaLabel: 'form.issn.publicationInfo.additional_info',
          label: <FormattedMessage id="form.issn.publicationInfo.additional_info"/>,
          width: 'half'
        }
      ].filter(v => v) // Removes fields that are left undefined
    };
  }
}

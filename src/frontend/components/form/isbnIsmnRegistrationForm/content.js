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

import MultipleAndCreatableSelectInstruction from './MultipleAndCreatableSelectInstruction.jsx';
import MultipleSelectInstruction from './MultipleSelectInstruction.jsx';
import {
  authorRoles,
  booleanOptions,
  editionOptions,
  electronicFormats,
  printFormats,
  publicationTypes,
  FORMATS,
  publishingLanguages,
  publisherPublishingActivityOptions,
  publicationFormatOptions
} from '../constants';
// Field array components
import RenderMultiSelect from '../render/RenderMultiSelect.jsx';
import RenderTextField from '../render/RenderTextField.jsx';

import {PAGES} from './constants';
import {getMonthOptions, getYearOptions} from './utils';

export function getFormPages(values) {
  return {
    [PAGES.AVAILABILITY_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'publicationsPublic',
          type: 'select',
          label: 'form.isbnIsmn.availability.publicationsPublic.label',
          title: <FormattedMessage id="form.isbnIsmn.availability.publicationsPublic"/>,
          options: booleanOptions
        },
        {
          name: 'publicationType',
          type: 'select',
          label: 'form.isbnIsmn.availability.type.label',
          title: <FormattedMessage id="form.isbnIsmn.availability.type"/>,
          options: publicationTypes
        }
      ]},
    [PAGES.PUBLISHER_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'officialName',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.name"/>,
          width: 'half'
        },
        {
          name: 'publisherIdentifierStr',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.publisherIdentifierStr"/>,
          width: 'half'
        },
        {
          name: 'address',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.address"/>,
          width: 'half'
        },
        {
          name: 'zip',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.zip"/>,
          width: 'half'
        },
        {
          name: 'city',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.city"/>,
          width: 'half'
        },
        {
          name: 'phone',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.phone"/>,
          width: 'half'
        },
        {
          name: 'contactPerson',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.contactPerson"/>,
          width: 'half'
        },
        {
          name: 'email',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publisherInfo.email"/>,
          width: 'half'
        }
      ]},
    [PAGES.PUBLISHING_ACTIVITIES]: {
      renderType: 'element',
      fields: [
        {
          name: 'publishedBefore',
          type: 'select',
          label: 'form.isbnIsmn.publishingActivities.hasPublishedBefore',
          width: 'half',
          options: booleanOptions
        },
        {
          name: 'publishingActivity',
          type: 'select',
          label: 'form.isbnIsmn.publishingActivities.occasionalOrContinuous',
          width: 'half',
          options: [
            {label: '', value: ''},
            ...publisherPublishingActivityOptions
          ]
        },
        {
          name: 'publishingActivityAmount',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publishingActivities.thisYear"/>,
          width: 'half'
        }
      ]
    },
    [PAGES.CONTACT_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'contactPerson',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.university.contactInfo.contactPerson"/>,
          width: 'half'
        },
        {
          name: 'address',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.university.contactInfo.address"/>,
          width: 'half'
        },
        {
          name: 'zip',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.university.contactInfo.zip"/>,
          width: 'half'
        },
        {
          name: 'city',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.university.contactInfo.city"/>,
          width: 'half'
        },
        {
          name: 'phone',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.university.contactInfo.phone"/>,
          width: 'half'
        },
        {
          name: 'email',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.university.contactInfo.email"/>,
          width: 'half'
        }
      ]},
    [PAGES.UNIVERSITY_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'isHelsinki',
          label: 'form.isbnIsmn.university.isHelsinki',
          type: 'select',
          width: 'half',
          options: booleanOptions
        }
      ]},
    [PAGES.BASIC_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publicationInfo.title"/>,
          width: 'half'
        },
        {
          name: 'subtitle',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.publicationInfo.subtitle"/>,
          width: 'half'
        },
        {
          name: 'language',
          type: 'select',
          label: 'form.isbnIsmn.publicationInfo.language',
          width: 'half',
          options: publishingLanguages
        },
        {
          name: 'mapScale',
          label: <FormattedMessage id="form.isbnIsmn.publicationInfo.scale"/>,
          type: 'text',
          width: 'half'
        },
        {
          name: 'publicationMonth',
          type: 'select',
          width: 'half',
          label: 'form.isbnIsmn.publicationInfo.publicationMonth',
          options: getMonthOptions()
        },
        {
          name: 'publicationYear',
          type: 'select',
          width: 'half',
          label: 'form.isbnIsmn.publicationInfo.publicationYear',
          options: getYearOptions()
        }
      ]},
    [PAGES.AUTHOR_INFORMATION]: {
      renderType: 'fieldArray',
      name: 'authors',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.authors.givenName"/>,
          width: 'half',
          required: true,
          component: RenderTextField
        },
        {
          name: 'lastName',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.authors.familyName"/>,
          width: 'half',
          required: true,
          component: RenderTextField
        },
        {
          name: 'roles',
          type: 'multiSelect',
          isMulti: true,
          instructions: <MultipleAndCreatableSelectInstruction/>,
          label: <FormattedMessage id="form.isbnIsmn.authors.role"/>,
          width: 'half',
          required: true,
          options: authorRoles,
          component: RenderMultiSelect,
          ariaLabel: 'form.isbnIsmn.authors.role'
        }
      ]},
    [PAGES.SERIES_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'series',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.series.title"/>,
          width: 'half'
        },
        {
          name: 'issn',
          type: 'text',
          label: <FormattedMessage id="common.issn"/>,
          width: 'half'
        },
        {
          name: 'volume',
          type: 'text',
          label: <FormattedMessage id="form.isbnIsmn.series.volume"/>,
          width: 'half'
        }
      ]},
    [PAGES.DISSERTATION_FORMAT]: {
      renderType: 'element',
      fields: [
        {
          name: 'publicationFormat',
          type: 'select',
          width: 'half',
          label: 'form.isbnIsmn.format.label',
          options: [
            {label: '', value: ''},
            {label: 'form.isbnIsmn.format.dissertation.option.printed', value: FORMATS.PRINT},
            {label: 'form.isbnIsmn.format.dissertation.option.electronic', value: FORMATS.ELECTRONICAL},
            {label: 'form.isbnIsmn.format.dissertation.option.both', value: FORMATS.PRINT_ELECTRONICAL}
          ]
        }
      ],
      additionalFields: [
        {
          name: 'dissertationAdditionalFields',
          fields: [
            {
              label: <FormattedMessage id="form.isbnIsmn.format.dissertation.option.printed.manufacturer"/>,
              name: 'printingHouse',
              type: 'text',
              width: 'half'
            },
            {
              label: <FormattedMessage id="form.isbnIsmn.format.dissertation.option.printed.city"/>,
              name: 'printingHouseCity',
              type: 'text',
              width: 'half'
            }
          ]
        }
      ]
    },
    [PAGES.FORMAT]: {
      renderType: 'element',
      name: 'formatDetails',
      fields: [
        {
          name: 'publicationFormat',
          type: 'select',
          width: 'half',
          label: 'form.isbnIsmn.format.label',
          options: [
            {label: '', value: ''},
            ...publicationFormatOptions
          ]
        }
      ],
      additionalFields: [
        {
          format: FORMATS.PRINT,
          fields: [
            {
              isMulti: true,
              label: <FormattedMessage id="form.isbnIsmn.format.printFormat"/>,
              name: 'type',
              type: 'multiSelect',
              instructions: <MultipleSelectInstruction/>,
              width: 'half',
              options: printFormats,
              ariaLabel: 'form.isbnIsmn.format.printFormat'
            },
            {
              label: <FormattedMessage id="form.isbnIsmn.format.printFormat.other"/>,
              name: 'typeOther',
              type: values.type?.some(type => type.value === 'OTHER_PRINT') ? 'text' : 'hidden',
              width: 'half'
            },
            {
              label: <FormattedMessage id="form.isbnIsmn.format.printFormat.printed.manufacturer"/>,
              name: 'printingHouse',
              type: 'text',
              width: 'half'
            },
            {
              label: <FormattedMessage id="form.isbnIsmn.format.printFormat.printed.city"/>,
              name: 'printingHouseCity',
              type: 'text',
              width: 'half'
            },
            {
              name: 'edition',
              type: 'select',
              width: 'half',
              label: 'form.isbnIsmn.format.printFormat.printed.edition',
              options: editionOptions
            },
            {
              label: <FormattedMessage id="form.isbnIsmn.format.printFormat.printed.copies"/>,
              name: 'copies',
              type: 'numeric',
              width: 'half'
            }
          ]},
        {
          format: FORMATS.ELECTRONICAL,
          fields: [
            {
              isMulti: true,
              label: <FormattedMessage id="form.isbnIsmn.format.fileFormat"/>,
              name: 'fileformat',
              type: 'multiSelect',
              instructions: <MultipleSelectInstruction/>,
              width: 'half',
              options: electronicFormats,
              ariaLabel: 'form.isbnIsmn.format.fileFormat'
            },
            {
              label: <FormattedMessage id="form.isbnIsmn.format.fileFormat.other"/>,
              name: 'fileformatOther',
              type: values.fileformat?.some(fileformat => fileformat.value === 'OTHER') ? 'text' : 'hidden',
              width: 'half'
            },
            {
              name: 'edition',
              type: 'select',
              width: 'half',
              label: 'form.isbnIsmn.format.printFormat.printed.edition',
              options: editionOptions
            }
          ]}
      ]
    },
    [PAGES.ADDITIONAL_DETAILS]: {
      renderType: 'element',
      fields: [
        {
          name: 'comments',
          type: 'textArea',
          ariaLabel: 'form.isbnIsmn.additionalDetails',
          label: <FormattedMessage id="form.isbnIsmn.additionalDetails"/>,
          width: 'half'
        }
      ]},
    [PAGES.PREVIEW]: 'preview'
  };
}

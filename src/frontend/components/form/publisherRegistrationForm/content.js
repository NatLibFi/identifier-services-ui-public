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
import {classificationCodes} from '../constants';
import {PAGES} from './constants';

export function getFormPages() {
  return {
    [PAGES.BASIC_INFORMATION]: {
      renderType: 'element',
      fields: [
        {
          name: 'officialName',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.name"/>,
          width: 'half'
        },
        {
          name: 'otherNames',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.otherNames"/>,
          width: 'half'
        },
        {
          name: 'address',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.address"/>,
          width: 'half'
        },
        {
          name: 'zip',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.zip"/>,
          width: 'half'
        },
        {
          name: 'city',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.city"/>,
          width: 'half'
        },
        {
          name: 'phone',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.phone"/>,
          width: 'half'
        },
        {
          name: 'contactPerson',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.contactPerson"/>,
          width: 'half'
        },
        {
          name: 'email',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.email"/>,
          width: 'half'
        },
        {
          name: 'www',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.basicInformation.website"/>,
          width: 'half'
        }
      ]
    },

    [PAGES.PUBLISHING_ACTIVITIES]: {
      renderType: 'element',
      fields: [
        {
          name: 'frequencyCurrent',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.publishingActivities.currentYear"/>,
          width: 'half'
        },
        {
          name: 'frequencyNext',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.publishingActivities.nextYear"/>,
          width: 'half'
        },
        {
          name: 'classification',
          type: 'multiSelect',
          isMulti: true,
          label: <FormattedMessage id="form.publisherRegistration.publishingActivities.classification"/>,
          placeholder: <FormattedMessage id="form.publisherRegistration.publishingActivities.classification.placeholder"/>,
          options: classificationCodes,
          width: 'half',
          instructions: <FormattedMessage id="form.publisherRegistration.publishingActivities.classification.instruction"/>,
          ariaLabel: 'form.publisherRegistration.publishingActivities.classification'
        },
        {
          name: 'classificationOther',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.publishingActivities.classificationOther"/>,
          width: 'half'
        }
      ]
    },

    [PAGES.ORGANIZATION_DETAILS]: {
      renderType: 'element',
      fields: [
        {
          name: 'affiliateOf',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.organization.affiliateOf"/>,
          width: 'half'
        },
        {
          name: 'affiliates',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.organization.affiliates"/>,
          width: 'half'
        },
        {
          name: 'distributorOf',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.organization.distributorOf"/>,
          width: 'half'
        },
        {
          name: 'distributors',
          type: 'text',
          label: <FormattedMessage id="form.publisherRegistration.organization.distributors"/>,
          width: 'half'
        }
      ]
    },
    [PAGES.PREVIEW]: 'preview'
  };
}

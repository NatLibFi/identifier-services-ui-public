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
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';

import '/src/frontend/css/common.css';
import ListComponent from '/src/frontend/components/ListComponent.jsx';

function Preview ({values}) {
  return (
    <div className='mainContainer'>
      <div className='listComponentContainer'>
        <Typography variant="h3" className='listComponentContainerHeader'>
          <FormattedMessage id="form.publisherRegistration.preview.publisherInformation"/>
        </Typography>
        <ListComponent
          fieldName="officialName"
          label={<FormattedMessage id="form.common.name"/>}
          value={values.officialName ?? ''}
        />
        {values.otherNames &&
          <ListComponent
            fieldName="otherNames"
            label={<FormattedMessage id="form.common.otherNames"/>}
            value={values.otherNames ?? ''}
          />
        }
        <ListComponent
          fieldName="phone"
          label={<FormattedMessage id="form.common.phone"/>}
          value={values.phone ?? ''}
        />
        <ListComponent
          fieldName="email"
          label={<FormattedMessage id="form.common.email"/>}
          value={values.email ?? ''}
        />
        <ListComponent
          fieldName="contactPerson"
          label={<FormattedMessage id="form.common.contactPerson"/>}
          value={values.contactPerson ?? ''}
        />
        {values.www &&
          <ListComponent
            fieldName="website"
            label={<FormattedMessage id="form.common.website"/>}
            value={values.www ?? ''}
          />
        }
      </div>
      <div className='listComponentContainer'>
        <Typography variant="h3" className='listComponentContainerHeader'>
          <FormattedMessage id="form.publisherRegistration.preview.postalAddress"/>
        </Typography>
        <ListComponent
          fieldName="address"
          label={<FormattedMessage id="form.common.address"/>}
          value={values.address ?? ''}
        />
        <ListComponent
          fieldName="zip"
          label={<FormattedMessage id="form.common.zip"/>}
          value={values.zip ?? ''}
        />
        <ListComponent
          fieldName="city"
          label={<FormattedMessage id="form.common.city"/>}
          value={values.city ?? ''}
        />
      </div>
      {(values.affiliates || values.affiliateOf || values.distributors || values.distributorOf)
          && (
            <div className='listComponentContainer'>
              <Typography variant="h3" className='listComponentContainerHeader'>
                <FormattedMessage id="form.publisherRegistration.preview.organizationDetails"/>
              </Typography>
              {values.affiliates && (
                <ListComponent
                  fieldName="affiliates"
                  label={<FormattedMessage id="form.common.affiliates"/>}
                  value={values.affiliates ?? ''}
                />
              )}
              {values.affiliateOf && (
                <ListComponent
                  fieldName="affiliateOf"
                  label={<FormattedMessage id="form.common.affiliateOf"/>}
                  value={values.affiliateOf ?? ''}
                />
              )}
              {values.distributors && (
                <ListComponent
                  fieldName="distributors"
                  label={<FormattedMessage id="form.common.distributors"/>}
                  value={values.distributors ?? ''}
                />
              )}
              {values.distributorOf && (
                <ListComponent
                  fieldName="distributoOfs"
                  label={<FormattedMessage id="form.common.distributorOf"/>}
                  value={values.distributorOf ?? ''}
                />
              )}
            </div>
          )}
      <div className='listComponentContainer'>
        <Typography variant="h3" className='listComponentContainerHeader'>
          <FormattedMessage id="form.publisherRegistration.preview.publishingFrequency"/>
        </Typography>
        <ListComponent
          fieldName="frequencyCurrent"
          label={<FormattedMessage id="form.common.currentYear"/>}
          value={values.frequencyCurrent ?? ''}
        />
        <ListComponent
          fieldName="frequencyNext"
          label={<FormattedMessage id="form.common.nextYear"/>}
          value={values.frequencyNext ?? ''}
        />
      </div>
      <div className='listComponentContainer'>
        <Typography variant="h3" className='listComponentContainerHeader'>
          <FormattedMessage id="form.common.classification"/>
        </Typography>
        <ListComponent
          fieldName="classification"
          label={<FormattedMessage id="form.common.classification"/>}
          value={values.classification?.map(i => i.value) ?? []}
        />
        {values.classificationOther && (
          <ListComponent
            fieldName="classificationOther"
            label={<FormattedMessage id="form.common.classificationOther"/>}
            value={values.classificationOther ?? ''}
          />
        )}
      </div>
    </div>
  );
}

Preview.propTypes = {
  values: PropTypes.object.isRequired
};

export default Preview;

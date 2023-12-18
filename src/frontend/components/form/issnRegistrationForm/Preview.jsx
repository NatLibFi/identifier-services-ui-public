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
import PublicationCard from './PublicationCard.jsx';

function Preview ({values}) {
  const {form, publications} = values;

  return (
    <div data-test='issn-form-preview' className="mainContainer">
      {/* Publisher */}
      <div data-test='issn-form-preview-publisher' className="listComponentContainer">
        <Typography variant="h3" className="listComponentContainerHeader">
          <FormattedMessage id="form.issn.preview.publisherInfo" />
        </Typography>
        <ListComponent
          fieldName="officialName"
          label={<FormattedMessage id="form.issn.preview.name" />}
          value={form.publisher ?? ''}
        />
        <ListComponent
          fieldName="contactPerson"
          label={<FormattedMessage id="form.common.contactPerson" />}
          value={form.contactPerson ?? ''}
        />
        <ListComponent
          fieldName="email"
          label={<FormattedMessage id="form.common.email" />}
          value={form.email ?? ''}
        />
        <ListComponent
          fieldName="phone"
          label={<FormattedMessage id="form.common.phone" />}
          value={form.phone ?? ''}
        />
        <ListComponent
          fieldName="address"
          label={<FormattedMessage id="form.common.address" />}
          value={form.address ?? ''}
        />
        <ListComponent
          fieldName="zip"
          label={<FormattedMessage id="form.common.zip" />}
          value={form.zip ?? ''}
        />
        <ListComponent
          fieldName="city"
          label={<FormattedMessage id="form.common.city" />}
          value={form.city ?? ''}
        />
      </div>
      {/* Publications data */}
      <div data-test='issn-form-preview-publications' className="listComponentContainer">
        <Typography variant="h3" className="listComponentContainerHeader">
          <FormattedMessage id="common.publications" />
        </Typography>
        <div className="issnPublicationCards">
          {publications.map((publication, index) => (
            <PublicationCard key={index} publication={publication} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

Preview.propTypes = {
  values: PropTypes.object
};

export default Preview;

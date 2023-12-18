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
import {PropTypes, oneOfType} from 'prop-types';

import {Grid} from '@mui/material';

import RenderArray from './RenderArray.jsx';
import RenderClassification from './RenderClassification.jsx';
import {classificationCodes} from '../constants.js';

/* Renders component based on value type and fieldName */
function RenderListComponent({value, fieldName, label}) {
  /* Rendering Array type of values is handled separately at current stage */
  if (Array.isArray(value)) {
    return <RenderArray value={value} fieldName={fieldName} label={label} />;
  }

  /* Rendering of non-object values is defined here */
  function getValue() {
    if (fieldName === 'classification') {
      return <RenderClassification value={value} array={classificationCodes} />;
    }

    if (['comments', 'additionalInfo', 'additional_info'].includes(fieldName)) {
      // <pre> wrapper is used to preserve line breaks
      return <pre className="comments">{value}</pre>;
    }

    return value ? value : <FormattedMessage id="common.noValue" />;
  }

  return (
    <>
      {label && (
        <Grid item xs={6}>
          <span className="label">{label}:</span>
        </Grid>
      )}
      <Grid data-test={`list-component-${fieldName}`} item xs={6}>
        {getValue()}
      </Grid>
    </>
  );
}

RenderListComponent.propTypes = {
  value: oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.object
  ]),
  fieldName: PropTypes.string,
  label: oneOfType([PropTypes.string, PropTypes.object])
};

export default RenderListComponent;

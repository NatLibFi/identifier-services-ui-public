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
import PropTypes, {oneOfType} from 'prop-types';

import {Grid, Chip} from '@mui/material';

import '/src/frontend/css/listComponent.css';
import '/src/frontend/css/forms/common.css';

import {classificationCodes} from '../constants';

function RenderArray({value, fieldName, label}) {
  // Used as a helper function for rendering the label of a single Classification Code (Publisher registration form -> Preview)
  const renderClassification = (value, array) => {
    const currentValue = array.find((item) => item.value === value);
    return currentValue ? <FormattedMessage id={currentValue.label} /> : undefined;
  };

  // Non-edit renders for array fields
  switch (fieldName) {
    case 'classification':
      return (
        <div className="classificationCodes">
          <Grid item xs={6}>
            <span className="label">{label}:</span>
          </Grid>
          <div data-test={`list-component-${fieldName}`}>
            {value.length === 0 ? (
              <FormattedMessage id="common.noValue" />
            ) : (
              value.map((item) => (
                <Grid key={item} item>
                  <Chip label={renderClassification(item, classificationCodes)} />
                </Grid>
              ))
            )}
          </div>
        </div>
      );
    case 'publisherIdentifier':
      return (<div data-test={`list-component-${fieldName}`} >{value.map((item) => <Chip key={item} label={item} />)}</div>);
    case 'previousNames':
      return (
        <div className="classificationCodes">
          <Grid item xs={6}>
            <span className="label">{label}:</span>
          </Grid>
          <div data-test={`list-component-${fieldName}`}>
            {value.map((item) => (
              <Grid key={item} item>
                <Chip label={item} />
              </Grid>
            ))}
          </div>
        </div>
      );
    case 'publicationType':
    case 'printFormat':
      return (
        <Grid item container className="arrayContainer">
          <Grid item xs={6}>
            <span className="label">{label}:</span>
          </Grid>
          <Grid data-test={`list-component-${fieldName}`} item xs={6}>
            {value.map((item) => (
              <Chip
                key={item}
                label={
                  <FormattedMessage
                    id={`form.printFormat.${item === 'OTHER' ? 'other_electronical' : item?.toLowerCase()
                    }`}
                  />
                }
              />
            ))}
          </Grid>
        </Grid>
      );
    case 'fileformat':
      return (
        <Grid item container className="arrayContainer">
          <Grid item xs={6}>
            <span className="label">{label}:</span>
          </Grid>
          <Grid data-test={`list-component-${fieldName}`} item xs={6}>
            {value.map((item) => (
              <Chip
                key={item}
                label={<FormattedMessage id={`form.fileFormat.${item?.toLowerCase()}`} />}
              />
            ))}
          </Grid>
        </Grid>
      );
    case 'type':
      return (
        <Grid item container className="arrayContainer">
          <Grid item xs={6}>
            <span className="label">{label}:</span>
          </Grid>
          <Grid data-test={`list-component-${fieldName}`} item xs={6}>
            {value.map((item) => (
              <Chip
                key={item}
                label={
                  <FormattedMessage id={`form.printFormat.${item?.toLowerCase()}`} />
                }
              />
            ))}
          </Grid>
        </Grid>
      );
    default:
      return (
        <Grid item container className="arrayContainer">
          <Grid item xs={6}>
            <span className="label">{label}:</span>
          </Grid>
          <Grid data-test={`list-component-${fieldName}`} item xs={6}>
            {value.map((item) => (
              <Chip
                key={item}
                label={<FormattedMessage id={`common.${item?.toLowerCase()}`} />}
              />
            ))}
          </Grid>
        </Grid>
      );
  }
}

RenderArray.propTypes = {
  value: PropTypes.array,
  fieldName: PropTypes.string,
  label: oneOfType([PropTypes.string, PropTypes.object])
};

export default RenderArray;

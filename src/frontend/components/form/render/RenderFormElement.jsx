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
import {Field} from 'react-final-form';
import PropTypes from 'prop-types';

import {Grid, Typography, Link} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';

import PopoverComponent from '../../PopoverComponent.jsx';
import {translateOptions} from '../utils.js';
import RenderTextField from './RenderTextField.jsx';
import RenderTextArea from './RenderTextArea.jsx';
import RenderSelect from './RenderSelect.jsx';
import RenderMultiSelect from './RenderMultiSelect.jsx';

import '/src/frontend/css/forms/common.css';

function RenderFormElement (props) {
  const {array, fieldName, publicationIsbnValues, intl} = props;

  return array.map((formField) => {
    // Options that should not be translated (month and year translations comes straight from the moment library)
    const nonTranslatableOptions = ['publicationYear', 'publicationMonth'];
    // Translation of options for select and multiselect
    const translatedOptions =
      (formField.type === 'select' || formField.type === 'multiSelect') &&
      !nonTranslatableOptions.includes(formField.name)
        ? translateOptions(formField.options, intl)
        : formField.options;

    switch (formField.type) {
      case 'select':
        return (
          <Grid key={formField.name} item xs={formField.width === 'half' ? 6 : 12}>
            {formField.title && (
              <Typography className="selectTitle">{formField.title}</Typography>
            )}
            <Field
              className="selectField"
              component={RenderSelect}
              label={intl.formatMessage({id: formField.label})}
              name={formField.name}
              type={formField.type}
              options={translatedOptions}
              publicationValues={publicationIsbnValues}
              defaultValue={formField.defaultValue}
              isDisabled={formField.isDisabled}
              infoIconComponent={
                formField.instructions && (
                  <PopoverComponent
                    icon={<HelpIcon />}
                    infoText={formField.instructions}
                  />
                )
              }
            />
          </Grid>
        );
      case 'multiSelect':
        return (
          <Grid
            key={formField.name}
            container
            item
            xs={formField.width === 'half' ? 6 : 12}
          >
            <Grid item xs={12}>
              <Field
                className="selectField"
                component={RenderMultiSelect}
                label={formField.label}
                placeholder={formField?.placeholder}
                infoIconComponent={
                  formField.instructions && (
                    <PopoverComponent
                      icon={<HelpIcon />}
                      infoText={formField.instructions}
                    />
                  )
                }
                name={formField.name}
                type={formField.type}
                options={translatedOptions}
                isMulti={formField.isMulti}
                ariaLabel={formField.ariaLabel}
              />
            </Grid>
          </Grid>
        );
      case 'numeric':
        return (
          <Grid key={formField.name} item xs={formField.width === 'full' ? 12 : 6}>
            <Field
              className="textField"
              component={RenderTextField}
              label={formField.label}
              name={formField.name}
              type="text"
              min={0}
              disabled={Boolean(formField.name === 'publisher')}
            />
          </Grid>
        );
      case 'text':
        return (
          <Grid key={formField.name} item xs={formField.width === 'full' ? 12 : 6}>
            <Field
              className="textField"
              component={RenderTextField}
              label={formField.label}
              name={formField.name}
              type={formField.type}
              infoIconComponent={
                formField.instructions && (
                  <PopoverComponent
                    icon={<HelpIcon />}
                    infoText={formField.instructions}
                  />
                )
              }
              disabled={formField.disable}
            />
            {formField.link && (
              <>
                <PopoverComponent icon={<HelpIcon />} infoText={formField.instructions} />
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href={formField.link}
                  color="primary"
                  underline="always"
                >
                  {' '}
                  additional information{' '}
                </Link>
              </>
            )}
          </Grid>
        );
      case 'textArea':
        return (
          <Grid key={formField.name} item xs={formField.width === 'full' ? 12 : 6}>
            <Field
              className="textArea full"
              component={RenderTextArea}
              name={fieldName ? fieldName : formField.name}
              label={formField.label}
              type="multiline"
              ariaLabel={formField.ariaLabel}
            />
          </Grid>
        );
      default:
        return null;
    }
  });
}

RenderFormElement.propTypes = {
  array: PropTypes.array,
  fieldName: PropTypes.string,
  publicationIsbnValues: PropTypes.object,
  intl: PropTypes.object
};

export default RenderFormElement;

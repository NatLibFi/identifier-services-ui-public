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
import Select from 'react-select';
import {FormattedMessage, useIntl} from 'react-intl';
import {PropTypes, oneOfType} from 'prop-types';

import {Typography} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

import '/src/frontend/css/errorMessage.css';

function RenderMultiSelect (props) {
  const {
    input,
    label,
    placeholder,
    options,
    className,
    isMulti,
    ariaLabel,
    meta: {touched, error}
  } = props;

  const intl = useIntl();

  return (
    <>
      <Select
        aria-label={ariaLabel ? intl.formatMessage({id: ariaLabel}) : 'unknown'}
        isMulti={isMulti}
        {...input}
        error={touched && error}
        options={
          input.name === 'classification'
            ? options.sort((a, b) => a.label.localeCompare(b.label))
            : options
        }
        placeholder={placeholder || label}
        className={className}
        value={input.value}
        onBlur={() => input.onBlur(input.value)}
        onChange={(value) => input.onChange(value)}
      />
      {touched && error && (
        <Typography variant="caption" color="error" className="selectErrors">
          <ErrorIcon fontSize="inherit" />
          <FormattedMessage id={`error.${error}`} />
        </Typography>
      )}
    </>
  );
}

RenderMultiSelect.propTypes = {
  input: PropTypes.object.isRequired,
  label: oneOfType([PropTypes.string, PropTypes.object]),
  placeholder: oneOfType([PropTypes.string, PropTypes.object]),
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
  isMulti: PropTypes.bool,
  ariaLabel: PropTypes.string,
  meta: PropTypes.object.isRequired
};

export default RenderMultiSelect;

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
import {FieldArray} from 'react-final-form-arrays';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {translateOptions} from '../utils';

function FieldArrayElement (props) {
  const {name, content, formValues, intl, changeFormFields} = props;

  const addToFields = (fields) => {
    // Construct and add
    const entityAttributes = content.map(f => f.name);
    const newEntity = entityAttributes.reduce((prev, k) => ({...prev, [k]: formValues[k]}), {});

    fields.push(newEntity);

    // Empty values from temp fields using function form parent form
    entityAttributes.forEach(k => changeFormFields(k, undefined));
  };

  const validateContent = (content, formValues) => {
    const emptyRequiredFields = content
      .filter(f => f.required)
      .map(f => f.name)
      .filter(name => !Object.keys(formValues).includes(name) || formValues[name].length === 0);

    return emptyRequiredFields.length > 0 || formValues?.authors?.length > 3;
  };

  return (
    <FieldArray name={name}>
      {({fields}) => (
        <div>
          <div className='isbnAuthorsFields'>
            {content.map((field) => (
              <Field
                data-test={field.name}
                key={field.name}
                {...field}
                // Options are transmitted as translated versions
                options={translateOptions(field.options, intl)}
              />
            ))}
          </div>
          <Button
            data-test='isbn-form-add-author-button'
            disableRipple
            className='addIsbnAuthorButton'
            aria-label="Add"
            variant="outlined"
            color="primary"
            startIcon={<AddIcon/>}
            disabled={validateContent(content, formValues)}
            onClick={() => addToFields(fields)}
          >
            <FormattedMessage id="form.button.label.add"/>
          </Button>
        </div>
      )}
    </FieldArray>
  );
}

FieldArrayElement.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  formValues: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  changeFormFields: PropTypes.func.isRequired
};

export default FieldArrayElement;

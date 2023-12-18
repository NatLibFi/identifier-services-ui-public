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
import PropTypes from 'prop-types';
import {v4 as uuidv4} from 'uuid';
import {FormattedMessage} from 'react-intl';

import {Button, Chip, Typography, Card, CardContent} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import '/src/frontend/css/subComponents/cards/authorCard.css';

/* Rendering <Chip> element for each item in the array of authors (tekijät).
Used in the ISBN/ISMN form on Preview page */

function AuthorCard ({authors, handleRemove}) {
  return (
    (authors && authors.length) ? authors.map((author, index) => (
      <Card key={uuidv4()} className='authorCard'>
        <CardContent className='authorCardContent'>
          <div className='authorCardBlock'>
            <Typography className='label'>
              <FormattedMessage id="form.isbnIsmn.authors.card.name"/>
            </Typography>
            <Typography data-test={`author-${index+1}-name`}>
              {author.firstName} {author.lastName}
            </Typography>
          </div>
          <div className='authorCardBlock'>
            <Typography data-test={`author-${index+1}-roles`} className='label'>
              <FormattedMessage id="form.isbnIsmn.authors.card.roles"/>
            </Typography>
            {author.roles.map(role => (
              <Chip
                key={uuidv4()}
                label={role.label}
                color="default"
              />
            ))}
          </div>
        </CardContent>
        {handleRemove &&
        <Button
          data-test='remove-author-button'
          disableRipple
          color="error"
          startIcon={<DeleteIcon/>}
          onClick={() => handleRemove(index)}>
          <FormattedMessage id="form.button.label.delete"/>
        </Button>
        }
      </Card>
    )) : null
  );
}

AuthorCard.propTypes = {
  authors: PropTypes.array,
  handleRemove: PropTypes.func
};

export default AuthorCard;

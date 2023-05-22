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
import {PropTypes} from 'prop-types';

import {List, ListItem, Typography, Button, Link} from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import '/src/frontend/css/forms/publisherRegistrationForm.css';

function RenderInformation ({setInformation}) {
  const notes = ['note0', 'note1', 'note2', 'note3', 'note4'];

  return (
    <div className='notesContainer'>
      <Typography>
        <strong>
          <FormattedMessage id="form.publisherRegistration.instructions.title"/>
        </strong>
      </Typography>
      <List>
        {notes.map(item => (
          item === 'note1'
            ? (
              <ListItem key={item} className='notesList'>
                <StopIcon fontSize="small"/>
                <Typography>
                  <FormattedMessage id={`form.publisherRegistration.instructions.${item}.part1`}/>
                  <Link target="_blank" rel="noopener" href="https://www.kiwi.fi/display/ISBNjaISMN/ISBN-+ja+ISMN-tunnuksen+merkitseminen">
                    <FormattedMessage id={`form.publisherRegistration.instructions.${item}.link`}/>
                    <OpenInNewIcon fontSize="small"/>
                  </Link>
                  <FormattedMessage id={`form.publisherRegistration.instructions.${item}.part2`}/>
                </Typography>
              </ListItem>)
            : (
              <ListItem key={item} className='notesList'>
                <StopIcon fontSize="small"/>
                <Typography>
                  <FormattedMessage id={`form.publisherRegistration.instructions.${item}`}/>
                </Typography>
              </ListItem>)
        ))}
      </List>
      <Button disableRipple variant="contained" color="primary" onClick={() => setInformation(false)}>
        <FormattedMessage id="form.button.label.proceed"/>
      </Button>
    </div>
  );
}

RenderInformation.propTypes = {
  setInformation: PropTypes.func.isRequired
};

export default RenderInformation;

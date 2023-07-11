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

import {Typography, Button} from '@mui/material';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';

import '/src/frontend/css/mainPage/instructions/isbnIsmn.css';

function IsbnInfoBox ({language}) {
  // Get correct links for each language
  const getIsbnLink = (language) => {
    if (language === 'fi') {
      return 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/isbn-tunnus';
    }

    if (language === 'sv') {
      return 'https://www.kansalliskirjasto.fi/sv/tjanster/isbn-nummer';
    }

    return 'https://www.kansalliskirjasto.fi/en/services/isbn';
  };

  const getIsmnLink = (language) => {
    if (language === 'fi') {
      return 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/ismn-tunnus';
    }

    if (language === 'sv') {
      return 'https://www.kansalliskirjasto.fi/sv/tjanster/ismn-nummer';
    }

    return 'https://www.kansalliskirjasto.fi/en/services/ismn';
  };

  return (
    <div className="isbnIsmnContainer">
      <Typography variant="h3" color="primary">
        <FormattedMessage id="common.isbn-ismn" />
      </Typography>
      <hr />
      <Typography paragraph>
        <FormattedMessage
          id="homePage.instructions.isbn-ismn.text"
          values={{lineBreak: <br />}}
        />
      </Typography>
      <div className="buttonContainer">
        <Button
          disableRipple
          href={getIsbnLink(language)}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <FormattedMessage id="homePage.link" values={{link: 'ISBN'}} />
            <MenuBookOutlinedIcon />
          </span>
        </Button>
        <Button
          disableRipple
          href={getIsmnLink(language)}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <FormattedMessage id="homePage.link" values={{link: 'ISMN'}} />
            <MusicNoteOutlinedIcon />
          </span>
        </Button>
      </div>
    </div>
  );
}

IsbnInfoBox.propTypes = {
  language: PropTypes.string.isRequired
};

export default IsbnInfoBox;

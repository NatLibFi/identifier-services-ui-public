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

import {Card, Link, Typography} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import '/src/frontend/css/subComponents/cards/infoCard.css';

function EditionInfoCard ({infoText, language}) {
  // Get correct link for each language
  const getLink = (language) => {
    if (language === 'fi') {
      return 'https://www.kansalliskirjasto.fi/fi/palvelut/suomen-isbn-keskus/isbn-tunnus#ohjeet';
    }

    if (language === 'sv') {
      return 'https://www.kansalliskirjasto.fi/sv/tjanster/finlands-isbn-central/isbn-nummer#anvisningar';
    }

    return 'https://www.kansalliskirjasto.fi/en/services/finlands-national-isbn-agency/isbn#instructions';
  };

  return (
    <Card className='infoLink'>
      <Typography variant="subtitle1" className='infoLinkHeader'>
        <InfoOutlinedIcon/>
        <Link href={getLink(language)} target='_blank' rel='noreferrer'>
          <FormattedMessage id={infoText}/>
          <OpenInNewIcon/>
        </Link>
      </Typography>
    </Card>
  );
}

EditionInfoCard.propTypes = {
  infoText: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

export default EditionInfoCard;

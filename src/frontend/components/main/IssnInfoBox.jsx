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

import {Typography, Button, Link} from '@mui/material';
import {Newspaper, OpenInNew} from '@mui/icons-material';

import '/src/frontend/css/mainPage/instructions/issn.css';

function IssnInfoBox({language}) {
  // Get correct links for each language
  const getIssnLink = (language) => {
    if (language === 'fi') {
      return 'https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/issn-tunnus';
    }

    if (language === 'sv') {
      return 'https://www.kansalliskirjasto.fi/sv/tj%C3%A4nster/tjanster-organisationer/issn-nummer';
    }

    return 'https://www.kansalliskirjasto.fi/en/services/services-organizations/issn';
  };

  return (
    <div className="issnContainer">
      <Typography variant="h3" color="primary">
        <FormattedMessage id="common.issn" />
      </Typography>
      <hr />
      <Typography paragraph>
        <FormattedMessage
          id="homePage.instructions.issn.text"
          values={{
            lineBreak: <br />,
            link: (
              <Link
                href="https://portal.issn.org/"
                target="_blank"
                rel="noreferrer"
              >
                ISSN Portal
                <OpenInNew fontSize="small" />
              </Link>
            )
          }}
        />
      </Typography>
      <Button
        data-test='homepage-link-external-issn'
        disableRipple
        color="primary"
        href={getIssnLink(language)}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <FormattedMessage id="homePage.link" values={{link: 'ISSN'}} />
          <Newspaper />
        </span>
      </Button>
    </div>
  );
}

IssnInfoBox.propTypes = {
  language: PropTypes.string.isRequired
};

export default IssnInfoBox;

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

import {Typography, Button, Link} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import '/src/frontend/css/mainPage/instructions/issn.css';

function IssnInfoBox () {
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
              </Link>
            )
          }}
        />
      </Typography>
      <Button
        disableRipple
        color="primary"
        href="https://www.kansalliskirjasto.fi/fi/palvelut/palvelut-organisaatioasiakkaille/issn-tunnus"
        target="_blank"
        rel="noreferrer"
      >
        <span>
          <FormattedMessage id="homePage.link" values={{link: 'ISSN'}} />
          <NewspaperIcon />
        </span>
      </Button>
    </div>
  );
}

export default IssnInfoBox;

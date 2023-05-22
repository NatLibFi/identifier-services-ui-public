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

import {Container, Typography, Paper} from '@mui/material';
import '/src/frontend/css/mainPage/banner.css';

function MainPageBanner () {
  return (
    <div className="bannerContainer">
      <Container className="textContainer">
        <Typography variant="h1">
          <FormattedMessage id="homePage.title" />
        </Typography>

        <div>
          {[1, 2, 3].map((item) => (
            <Paper key={item}>
              <Typography variant="h2">
                <FormattedMessage id={`homePage.description.part${item}`} />
              </Typography>
            </Paper>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MainPageBanner;

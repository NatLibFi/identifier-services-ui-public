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

import {AppBar, Grid} from '@mui/material';

import MobileMenu from './MobileMenu.jsx';
import DesktopMenu from './DesktopMenu.jsx';

import '/src/frontend/css/navigationBar/defaultNav.css';

function MenuBar({language, contactInformationChangeUrl}) {
  // Get the correct link for each language
  const getLink = () => {
    if (
      !contactInformationChangeUrl ||
      typeof contactInformationChangeUrl !== 'object'
    ) {
      return '';
    }

    return contactInformationChangeUrl[language] ?? '';
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          {/* Desktop menu is displayed when screen width > 600px */}
          <DesktopMenu getLink={getLink} />
          {/* Mobile menu is displayed when screen width < 600px */}
          <MobileMenu getLink={getLink} />
        </AppBar>
      </Grid>
    </Grid>
  );
}

MenuBar.propTypes = {
  language: PropTypes.string.isRequired,
  contactInformationChangeUrl: PropTypes.object
};

export default MenuBar;

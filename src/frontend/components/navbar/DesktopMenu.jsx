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

import React, {useState} from 'react';
import {NavLink as Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

import {
  Menu,
  Button,
  MenuItem,
  Typography,
  Link as MUILink
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function DesktopMenu({getLink, language}) {
  const [anchorElDesktop, setAnchorElDesktop] = useState(null);

  const desktopMenuIsOpen = Boolean(anchorElDesktop);

  const handleOpenDesktopMenu = e => setAnchorElDesktop(e.currentTarget);

  const handleCloseDesktopMenu = () => setAnchorElDesktop(null);

  function getLinkWithLang(path) {
    return `${path}?lng=${language}`;
  }

  return (
    <nav data-test='nav-root' className="desktopMenu">
      <Link data-test='nav-link-home' exact to={getLinkWithLang('/')}>
        <div className="menuIcon">
          <HomeIcon fontSize="default" color="primary" />
          <FormattedMessage id="menu.home" />
        </div>
      </Link>
      <Link data-test='nav-link-publisher-registry' exact to={getLinkWithLang('/isbn-registry/publishers')}>
        <Typography className="menuItem">
          <FormattedMessage id="menu.publisherRegistry" />
        </Typography>
      </Link>
      <div>
        <Button
          data-test='nav-link-forms-button'
          disableRipple
          aria-controls={desktopMenuIsOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={desktopMenuIsOpen ? 'true' : undefined}
          endIcon={<ArrowDropDown />}
          onClick={handleOpenDesktopMenu}
        >
          <FormattedMessage id="menu.forms" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorElDesktop}
          open={desktopMenuIsOpen}
          onClose={handleCloseDesktopMenu}
        >
          <MenuItem
            data-test='nav-link-forms-publisher'
            component={Link}
            to={getLinkWithLang('/forms/isbn-ismn-publisher')}
            onClick={handleCloseDesktopMenu}
          >
            <Typography className="menuItem">
              <FormattedMessage id="menu.forms.publisherRegistration" />
            </Typography>
          </MenuItem>
          <MenuItem
            data-test='nav-link-forms-isbnismn'
            component={Link}
            to={getLinkWithLang('/forms/isbn-ismn-publication')}
            onClick={handleCloseDesktopMenu}
          >
            <Typography className="menuItem">
              <FormattedMessage id="menu.forms.publicationRegistration.isbn-ismn" />
            </Typography>
          </MenuItem>
          <MenuItem
            data-test='nav-link-forms-issn'
            component={Link}
            to={getLinkWithLang('/forms/issn-publication')}
            onClick={handleCloseDesktopMenu}
          >
            <Typography className="menuItem">
              <FormattedMessage id="menu.forms.publicationRegistration.issn" />
            </Typography>
          </MenuItem>
        </Menu>
      </div>
      <MUILink data-test='nav-link-change-contactinfo' href={getLink()} target="_blank" rel="noreferrer">
        <Typography className="menuItem menuItemWithIcon">
          <FormattedMessage id="menu.forms.contactInformationChange" />
          <OpenInNewIcon fontSize="small" />
        </Typography>
      </MUILink>
    </nav>
  );
}

DesktopMenu.propTypes = {
  language: PropTypes.string.isRequired,
  getLink: PropTypes.func.isRequired
};

export default DesktopMenu;

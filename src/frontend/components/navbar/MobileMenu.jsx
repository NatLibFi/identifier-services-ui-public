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
  Divider,
  ListItemIcon,
  Link as MUILink
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import NewspaperIcon from '@mui/icons-material/Newspaper';

function MobileMenu({getLink, language}) {
  const [anchorElMobile, setAnchorElMobile] = useState(null);

  const mobileMenuIsOpen = Boolean(anchorElMobile);

  const handleOpenMobileMenu = e => setAnchorElMobile(e.currentTarget);

  const handleCloseMobileMenu = () => setAnchorElMobile(null);

  function getLinkWithLang(path) {
    return `${path}?lng=${language}`;
  }

  return (
    <nav className="mobileMenu">
      <MenuItem
        component={Link}
        to={getLinkWithLang('/')}
        onClick={handleCloseMobileMenu}
        tabIndex={0}
      >
        <Typography className="menuIcon">
          <HomeIcon fontSize="default" color="primary" />
          <FormattedMessage id="menu.home" />
        </Typography>
      </MenuItem>
      <Button
        disableRipple
        aria-controls={mobileMenuIsOpen ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={mobileMenuIsOpen ? 'true' : undefined}
        startIcon={<MenuIcon />}
        onClick={handleOpenMobileMenu}
      >
        <FormattedMessage id="menu.mobile" />
      </Button>
      <Menu
        open={mobileMenuIsOpen}
        onClose={handleCloseMobileMenu}
        anchorEl={anchorElMobile}
      >
        <MenuItem
          component={Link}
          to={getLinkWithLang('/isbn-registry/publishers')}
          onClick={handleCloseMobileMenu}
        >
          <ListItemIcon>
            <FormatListBulletedIcon fontSize="small" />
          </ListItemIcon>
          <Typography className="mobileMenuItem">
            <FormattedMessage id="menu.publisherRegistry" />
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          component={Link}
          to={getLinkWithLang('/forms/isbn-ismn-publisher')}
          onClick={handleCloseMobileMenu}
        >
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <Typography className="mobileMenuItem">
            <FormattedMessage id="menu.forms.publisherRegistration" />
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to={getLinkWithLang('/forms/isbn-ismn-publication')}
          onClick={handleCloseMobileMenu}
        >
          <ListItemIcon>
            <CollectionsBookmarkIcon fontSize="small" />
          </ListItemIcon>
          <Typography className="mobileMenuItem">
            <FormattedMessage id="menu.forms.publicationRegistration.isbn-ismn" />
          </Typography>
        </MenuItem>
        <MenuItem
          component={Link}
          to={getLinkWithLang('/forms/issn-publication')}
          onClick={handleCloseMobileMenu}
        >
          <ListItemIcon>
            <NewspaperIcon fontSize="small" />
          </ListItemIcon>
          <Typography className="mobileMenuItem">
            <FormattedMessage id="menu.forms.publicationRegistration.issn" />
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem
          component={MUILink}
          href={getLink()}
          onClick={handleCloseMobileMenu}
          target="_blank"
          rel="noreferrer"
        >
          <ListItemIcon>
            <AlternateEmailIcon fontSize="small" />
          </ListItemIcon>
          <Typography className="mobileMenuItem">
            <FormattedMessage id="menu.forms.contactInformationChange" />
          </Typography>
        </MenuItem>
      </Menu>
    </nav>
  );
}

MobileMenu.propTypes = {
  getLink: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired
};

export default MobileMenu;

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

import {AppBar, Grid, Menu, Button, MenuItem, Typography, Link as MUILink} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import '/src/frontend/css/navigationBar/defaultNav.css';

function MenuBar ({language, contactInformationChangeUrl}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Get the correct link for each language
  const getLink = () => {
    if(!contactInformationChangeUrl || typeof contactInformationChangeUrl !== 'object') {
      return '';
    }

    return contactInformationChangeUrl[language] ?? '';
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <nav className='publicMenu'>
            <Link exact to="/">
              <div className='menuIcon'>
                <HomeIcon fontSize="default" color="primary"/>
                <FormattedMessage id="menu.home"/>
              </div>
            </Link>
            <Link exact to="/isbn-registry/publishers">
              <Typography className='menuItem'>
                <FormattedMessage id="menu.publisherRegistry"/>
              </Typography>
            </Link>
            <div>
              <Button
                disableRipple
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                endIcon={<ArrowDropDown/>}
                onClick={handleClick}
              >
                <FormattedMessage id="menu.forms"/>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/forms/isbn-ismn-publisher" onClick={handleClose}>
                  <Typography className='menuItem'>
                    <FormattedMessage id="menu.forms.publisherRegistration"/>
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/forms/isbn-ismn-publication" onClick={handleClose}>
                  <Typography className='menuItem'>
                    <FormattedMessage id="menu.forms.publicationRegistration.isbn-ismn"/>
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} to="/forms/issn-publication" onClick={handleClose}>
                  <Typography className='menuItem'>
                    <FormattedMessage id="menu.forms.publicationRegistration.issn"/>
                  </Typography>
                </MenuItem>
              </Menu>
            </div>
            <MUILink href={getLink()} target="_blank" rel="noreferrer">
              <Typography className='menuItem menuItemWithIcon'>
                <FormattedMessage id="menu.forms.contactInformationChange"/>
                <OpenInNewIcon fontSize="small"/>
              </Typography>
            </MUILink>
          </nav>
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

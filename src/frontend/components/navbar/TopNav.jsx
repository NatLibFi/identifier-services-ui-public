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
import {Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FormattedMessage, useIntl} from 'react-intl';

import {AppBar, Menu, MenuItem, Typography} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';

import '/src/frontend/css/navigationBar/topNav.css';

function TopNav(props) {
  const {currentLanguage, availableLanguages, handleLanguageChange, environment} = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const {pathname, search} = useLocation();
  const intl = useIntl();

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function changeLang(newLanguage) {
    handleLanguageChange(newLanguage);
    setAnchorEl(null);
  }

  const TestHeader = () => {
    const testArray = ['development', 'staging'];

    return (
      testArray.includes(environment) && (
        <div className='testHeader'>
          THIS IS A TEST ENVIRONMENT / TÄMÄ ON TESTIYMPÄRISTÖ
        </div>
      )
    );
  };

  return (
    <AppBar position="static" className='appBar'>
      <TestHeader />
      <div className='navbarContainer'>
        {/* Main logo & Tunnistepalvelut H1 title */}
        <div className='navbarInnerContainer'>
          <Link to={`/${search}`} className='mainLogo'>
            <img
              src="https://extra.kansalliskirjasto.fi/kk_logo.svg"
              alt={intl.formatMessage({id: 'altText.logo.library'})}
            />
          </Link>
          {/* Show "Tunnistepalvelut" H1 title on all pages except the home page */}
          {pathname !== '/' &&
            <Typography variant="h1" className='topNavTitle'>
              <FormattedMessage id="homePage.title" />
            </Typography>
          }
        </div>
        {/* Language select menu */}
        <div className='languageContainer'>
          <button data-test='language-select-button' className='languageSelect' onClick={handleClick}>
            <LanguageIcon />
            <span>{currentLanguage.toUpperCase()}</span>
            <ArrowDropDown />
          </button>
          <Menu
            data-test='language-select-list'
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}
            onClose={() => setAnchorEl(null)}
          >
            {availableLanguages.map(language => (
              <MenuItem
                key={language}
                onClick={() => changeLang(language)}
              >
                {language.toUpperCase()}
                {currentLanguage === language ? <CheckIcon /> : null}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </AppBar>
  );
}

TopNav.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleLanguageChange: PropTypes.func,
  environment: PropTypes.string
};

export default TopNav;

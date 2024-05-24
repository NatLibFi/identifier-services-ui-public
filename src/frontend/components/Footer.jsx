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
import {FormattedMessage, useIntl} from 'react-intl';

import {Grid, Box, IconButton, Link} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import '/src/frontend/css/footer.css';

function Footer({customerServiceContact, language}) {
  const intl = useIntl();
  const {phone, email} = customerServiceContact;

  function getLinkWithLang(path) {
    return `${path}?lng=${language}`;
  }

  return (
    <footer data-test='footer'>
      <Grid item xs={12} className="footerContainer">
        <Box component="span">
          <img
            data-test='footer-logo'
            src="https://extra.kansalliskirjasto.fi/kk_logo.svg"
            alt={intl.formatMessage({id: 'altText.logo.library'})}
            width={125}
          />
        </Box>
        <Box data-test='footer-contact-information' component="span">
          <span className="footerBoldText">
            <FormattedMessage id="footer.library" /> <br />
          </span>
          <FormattedMessage id="footer.address" /> <br />
          <FormattedMessage id="footer.zip" />
        </Box>
        <Box component="span">
          <span className="footerBoldText">
            <FormattedMessage id="footer.contact" /> <br />
          </span>
          {phone}
          <br />
          {email}
        </Box>
        <Box component="span">
          <span className="footerBoldText">
            <FormattedMessage id="footer.socials" />
          </span>
          <span className="socialContainer">
            <IconButton
              data-test='footer-socials-facebook'
              href="https://facebook.com/Kansalliskirjasto"
              target="_blank"
              rel="noreferrer"
              aria-label="facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              data-test='footer-socials-twitter'
              href="https://twitter.com/NatLibFi"
              target="_blank"
              rel="noreferrer"
              aria-label="twitter"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              data-test='footer-socials-youtube'
              href="https://www.youtube.com/channel/UCMCKdIT517O4D8o9-lesbvQ"
              target="_blank"
              rel="noreferrer"
              aria-label="youtube"
            >
              <YouTubeIcon />
            </IconButton>
            <IconButton
              data-test='footer-socials-instagram'
              href="https://instagram.com/kansalliskirjasto/"
              target="_blank"
              rel="noreferrer"
              aria-label="instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              data-test='footer-socials-linkedin'
              href="https://fi.linkedin.com/company/nationallibraryfinland"
              target="_blank"
              rel="noreferrer"
              aria-label="linkedin"
            >
              <LinkedInIcon />
            </IconButton>
          </span>
          <FormattedMessage data-test='footer-copyright' id="footer.copyright" />
        </Box>
      </Grid>
      <p>
        <Link
          data-test='footer-accessibility'
          href={getLinkWithLang('/accessibility-statement')}
        >
          <FormattedMessage id="footer.accessibilityStatement" />
        </Link>
        <Link
          data-test='footer-privacy'
          className="privacyPolicyLink"
          href={getLinkWithLang('/privacy-policy')}
        >
          <FormattedMessage id="footer.privacyPolicy" />
        </Link>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  customerServiceContact: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default Footer;

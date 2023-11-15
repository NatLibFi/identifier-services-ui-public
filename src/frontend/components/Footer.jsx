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
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import '/src/frontend/css/footer.css';

function Footer({customerServiceContact}) {
  const intl = useIntl();
  const {phone, email} = customerServiceContact;

  return (
    <footer>
      <Grid item xs={12} className="footerContainer">
        <Box component="span">
          <img
            src="https://extra.kansalliskirjasto.fi/kk_logo.svg"
            alt={intl.formatMessage({id: 'altText.logo.library'})}
            width={125}
          />
        </Box>
        <Box component="span">
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
              href="https://facebook.com/Kansalliskirjasto"
              target="_blank"
              rel="noreferrer"
              aria-label="facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com/NatLibFi"
              target="_blank"
              rel="noreferrer"
              aria-label="twitter"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://www.youtube.com/channel/UCMCKdIT517O4D8o9-lesbvQ"
              target="_blank"
              rel="noreferrer"
              aria-label="youtube"
            >
              <YouTubeIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com/kansalliskirjasto/"
              target="_blank"
              rel="noreferrer"
              aria-label="instagram"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://fi.linkedin.com/company/nationallibraryfinland"
              target="_blank"
              rel="noreferrer"
              aria-label="linkedin"
            >
              <LinkedInIcon />
            </IconButton>
          </span>
          <FormattedMessage id="footer.copyright" />
        </Box>
      </Grid>
      <p>
        <Link
          href="/accessibility-statement"
        >
          <FormattedMessage id="footer.accessibilityStatement" />
        </Link>
        <Link
          className="privacyPolicyLink"
          href="https://www.kansalliskirjasto.fi/fi/tietosuoja"
          target="_blank"
          rel="noreferrer"
        >
          <FormattedMessage id="footer.privacyPolicy" />
          <OpenInNewIcon fontSize="small" />
        </Link>
      </p>
    </footer>
  );
}

Footer.propTypes = {
  customerServiceContact: PropTypes.object.isRequired
};

export default Footer;

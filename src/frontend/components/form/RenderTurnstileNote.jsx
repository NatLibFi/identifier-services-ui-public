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
import {PropTypes} from 'prop-types';

import {Typography, Button, Link, Alert} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import '/src/frontend/css/forms/turnstileNotification.css';

function RenderTurnstileNotification({setInformation, identifierBatch = false, formType}) {
  return (
    <div className={setInformation ? 'turnstileContainer' : 'notificationContainer'}>
      <Alert severity='error'>
        <Typography>
          <strong>
            <FormattedMessage id="form.turnstile.title" />
          </strong>
        </Typography>

        {
          formType === 'isbnIsmn' &&
          <Typography className="isbnIsmnInstructions">
            <FormattedMessage id={'form.isbnIsmn.instructions'} />
          </Typography>
        }

        <Typography data-test='turnstile-notification-text'>
          <FormattedMessage id={identifierBatch ? 'form.turnstile.info.batchdownload' : 'form.turnstile.info'} />
        </Typography>

        <Typography>
          <Link target="_blank" rel="noopener" href="https://www.cloudflare.com/privacypolicy/">
            <FormattedMessage id={'form.turnstile.link.privacy'} />
            <OpenInNewIcon fontSize="small" />
          </Link>
          <Link target="_blank" rel="noopener" href="https://www.cloudflare.com/website-terms/">
            <FormattedMessage id={'form.turnstile.link.terms'} />
            <OpenInNewIcon fontSize="small" />
          </Link>
        </Typography>

        {
          typeof setInformation === 'function' &&
          <Button disableRipple variant="contained" color="primary" onClick={() => setInformation(false)}>
            <FormattedMessage id="form.button.label.proceed" />
          </Button>
        }
      </Alert>
    </div>
  );
}

RenderTurnstileNotification.propTypes = {
  setInformation: PropTypes.func,
  identifierBatch: PropTypes.bool,
  formType: PropTypes.string
};

export default RenderTurnstileNotification;

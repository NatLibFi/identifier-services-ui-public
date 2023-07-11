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

import {Alert, AlertTitle} from '@mui/material';

// Component takes several props: type, message, title, icon, action and variant
// - type affects the color of the banner and choice of icon e.g. "error" (red), "warning" (orange), "info" (blue), "success" (green)
// - message and title are displayed as they are given as parameters
// - icon determines whether the banner should have an icon or not, default is null (show icon), set to false to hide icon
// - action is a function that is called when the user clicks the close button on the banner, default is null
// - variant is used for styling, default is "standard", other options are "filled" and "outlined"
function NotificationBanner (props) {
  const {
    type,
    message,
    title,
    icon=null,
    action=null,
    variant='standard'
  } = props;

  return (
    <div className="notificationBanner">
      <Alert
        icon={icon}
        severity={type || 'info'}
        onClose={action}
        variant={variant}
      >
        <AlertTitle>
          {title}
        </AlertTitle>
        {message}
      </Alert>
    </div>
  );
}

NotificationBanner.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.bool,
  action: PropTypes.func,
  variant: PropTypes.string
};

export default NotificationBanner;

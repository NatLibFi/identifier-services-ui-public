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
import {PropTypes, oneOfType} from 'prop-types';
import {Popover, Typography} from '@mui/material';

import '/src/frontend/css/popoverComponent.css';

function PopoverComponent (props) {
  const {infoText, icon, keyboardFocus = true} = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div className="rootPopover">
      <Typography
        tabIndex={keyboardFocus ? 0 : -1}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        onKeyPress={handlePopoverOpen}
      >
        {icon}
      </Typography>
      <Popover
        disableRestoreFocus
        id="mouse-over-popover"
        className="popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        onClose={handlePopoverClose}
      >
        <div className="paper">{infoText}</div>
      </Popover>
    </div>
  );
}

PopoverComponent.propTypes = {
  infoText: oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  icon: PropTypes.element.isRequired,
  keyboardFocus: PropTypes.bool
};

export default PopoverComponent;

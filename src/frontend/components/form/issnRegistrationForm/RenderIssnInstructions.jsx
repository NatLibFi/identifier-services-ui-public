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

import {Typography} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import '/src/frontend/css/forms/issnRegistrationForm.css';

// Component is used on the first step of the ISSN registration form for rendering instructions
function RenderIssnInstructions() {
  return (
    <div data-test='issn-version-guide' className="versionGuide">
      <Typography variant="h3">
        <FormattedMessage id="form.issn.publicationInfo.instructions.part5" />
      </Typography>
      <Typography paragraph>
        <FormattedMessage id="form.issn.publicationInfo.instructions.part6" />
      </Typography>
      <Typography variant="h3">
        <FormattedMessage id="form.issn.publicationInfo.instructions.part3" />
      </Typography>
      <Typography paragraph>
        <FormattedMessage id="form.issn.publicationInfo.instructions.part4" />
      </Typography>
      <Typography variant="h3">
        <FormattedMessage id="form.issn.publicationInfo.instructions.part1" />
      </Typography>
      <Typography paragraph>
        <FormattedMessage id="form.issn.publicationInfo.instructions.part2" values={{lineBreak: <br />}} />
        <span className="issnElectronicVersionInfo">
          <FormattedMessage id="form.issn.publicationInfo.instructions.part7" values={{icon: <InfoIcon />}} />
        </span>
      </Typography>
    </div>
  );
}

export default RenderIssnInstructions;

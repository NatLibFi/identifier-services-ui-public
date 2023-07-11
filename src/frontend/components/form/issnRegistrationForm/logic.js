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

import {PAGES} from './constants';

export function getSteps(content) {
  const steps = [
    PAGES.PUBLICATION_VERSIONS,
    PAGES.PUBLISHER_INFORMATION
  ];

  // Insert publication pages
  const publicationSteps = [];

  Object.keys(content).forEach(page => {
    if(page.includes(PAGES.PUBLICATION_BASIC_INFORMATION)) {
      publicationSteps.push(page);
    }
  });

  // Order publication pages
  publicationSteps.sort((a, b) => {
    return a.localeCompare(b);
  });

  // Push sorted pages
  publicationSteps.forEach(pstep => steps.push(pstep));

  // Insert preview
  steps.push(PAGES.PREVIEW);

  return steps;
}

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
import {PUBLICATION_TYPES} from '../constants';

export function getSteps(publicationValues) {
  const pages = [
    PAGES.AVAILABILITY_INFORMATION,
    PAGES.BASIC_INFORMATION,
    PAGES.AUTHOR_INFORMATION,
    PAGES.SERIES_INFORMATION,
    PAGES.ADDITIONAL_DETAILS,
    PAGES.PREVIEW
  ];

  if (publicationValues && publicationValues.publicationType === PUBLICATION_TYPES.DISSERTATION) {
    pages.splice(1, 0, PAGES.UNIVERSITY_INFORMATION);
    pages.splice(2, 0, PAGES.CONTACT_INFORMATION);
    pages.splice(6, 0, PAGES.DISSERTATION_FORMAT);
  } else {
    pages.splice(1, 0, PAGES.PUBLISHER_INFORMATION);
    pages.splice(2, 0, PAGES.PUBLISHING_ACTIVITIES);
    pages.splice(6, 0, PAGES.FORMAT);
  }

  return pages;
}

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

export const regexPatterns = {
  integerString: /^\d+$/,
  yearString: /^[0-9]{4}$/,
  twoDigitInteger: /^\d{1,2}$/,
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/i,
  zip: /^\d{5}$/,
  city: /^[a-zåäöA-ZÅÄÖ\s-]{2,}$/,
  phone: /^[+0-9()\s-]{5,}$/,
  issn: /^\d{4}-\d{3}[0-9X]{1}$/
};

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

/**
 * Adds header for request
 * @returns Object containing request headers
 */
export function getHeaders() {
  return {
    'Content-Type': 'application/json'
  };
}

/**
 * Returns object with given values extended with query defaults if values are not defined.
 * @param {object} values Values to include to request body for /query endpoints
 * @returns Formatted body
 */
export function getQueryWithDefaults(values) {
  return formatBody({
    ...values,
    searchText: values.searchText || '',
    limit: values.limit || 10,
    offset: values.offset || 0
  });
}

/**
 * Redirects to path or refreshes the page using static setTimeout
 * @param {object} history History object
 * @param {string} path Path to redirect (if empty, refreshes page)
 * @param {object} state History state to use when pushing new path to history
 * @param {string} search Query params
 */
export function redirect(history, pathname = '', state={}, search) {
  const redirectTime = 500;
  if (pathname === '' || history.location.pathname === pathname) {
    setTimeout(history.go(0), redirectTime); // njsscan-ignore: eval_nodejs
  }

  return setTimeout(() => history.push({pathname, state, search}), redirectTime);
}

/**
 * Strip empty values from request bodies and return stringified JSON
 * @param {object} body Request body tot strip empty values from
 */
export function formatBody(body) {
  return Object.entries(body).reduce((acc, [k, value]) => isEmptyStringOrUndefined(value) ? {...acc} : {...acc, [k]: value}, {});

  function isEmptyStringOrUndefined(value) {
    return value === undefined || value === null;
  }
}

// Get language to use based on local storage, order of user preferred languages and language versions available in the app
export function getPrimaryLanguage(parsedLng, availableLanguages) {
  // Default to Finnish if no language parameters is included to URL
  if (!parsedLng) {
    return 'fi';
  }

  // Use selected language if it is available, otherwise use Finnish
  return availableLanguages.find(language => language === parsedLng) || 'fi';
}

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

import fetch from 'node-fetch';
import HttpStatus from 'http-status';

import {getHeaders, formatBody, redirect} from '/src/frontend/actions/util';

/**
 * Get configuration to run the app in
 * @returns Returns parsed configuration on success and default configuration which turns on maintenance mode on failure.
 */
export const getConfig = async () => {
  const defaultConfig = {
    maintenance: true,
    contactInformationChangeUrl: {},
    customerServiceContact: {}
  };

  try {
    const response = await fetch('/api/config', {
      method: 'GET',
      headers: getHeaders()
    });

    if (response.status === HttpStatus.OK) {
      const configuration = await response.json();
      return configuration;
    }

    throw new Error('Could not load configuration from API');
  } catch (err) {
    return defaultConfig;
  }
};


/**
  * Send form request to API
  * @param values Values of request entry
  * @param url URL to send the request to
  * @param history History object allowing redirects
  * @param setSnackbarMessage Function that allows display of success message
  * @returns Returns true and redirects to home page on success, otherwise returns false
*/
export async function createRequest(values, url, history, setSnackbarMessage) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(formatBody(values))
    });

    if (response.status === HttpStatus.CREATED) {
      setSnackbarMessage({severity: 'success', intlId: 'serviceMessage.registration.success'});
      redirect(history, '/', {messageId: '', type: 'success'});
      return true;
    }

    throw new Error();

  } catch (err) {
    // Return generic error message
    setSnackbarMessage({severity: 'error', intlId: 'serviceMessage.registration.error'});
    return false;
  }
}


/**
 * Download identifier batch as a text file
 * @param {string} id ID of identifier batch
 * @param {string} turnstileToken Turnstile token
 * @returns Returns true on success and false on failure. Success also invokes a download as side effect.
 */
export const downloadIdentifierBatch = async (id, turnstileToken) => {
  try {
    const response = await fetch(`/api/public/isbn-registry/identifierbatches/${id}/download`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({turnstileToken})
    });

    if (response.status === HttpStatus.OK) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // as is a temporary link we use for downloading a file
      const a = document.createElement('a');

      a.href = url;
      // get filename from response header & format it
      a.download = response.headers
        .get('content-disposition')
        .split('filename=')[1]
        .slice(1, -1);
      document.body.appendChild(a);
      a.click();
      a.remove();
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

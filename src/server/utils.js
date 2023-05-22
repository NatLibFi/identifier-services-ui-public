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

import HttpStatus from 'http-status';
import httpProxy from 'express-http-proxy';

import {DISABLE_TURNSTILE, CONTACT_INFORMATION_CHANGE_URL, CUSTOMER_SERVICE_CONTACT, NODE_ENV, MAINTENANCE_MODE, NOTIFICATION_BANNER, SITE_KEY} from './config';

export function provideFrontendConfig(_, res) {
  const frontendConfig = {
    siteKey: SITE_KEY,
    environment: NODE_ENV,
    disableTurnstile: DISABLE_TURNSTILE,
    maintenance: MAINTENANCE_MODE,
    notificationBanner: NOTIFICATION_BANNER,
    contactInformationChangeUrl: CONTACT_INFORMATION_CHANGE_URL,
    customerServiceContact: CUSTOMER_SERVICE_CONTACT
  };

  return res.status(HttpStatus.OK).json(frontendConfig);
}

// Handles proxying necessary API calls for public UI
export function proxyRequests(target, proxyOpts) {
  const availableEndpoints = [
    {regex: /^\/isbn-registry\/publishers\/query$/, method: 'POST'},
    {regex: /^\/isbn-registry\/publishers\/[0-9]+$/, method: 'GET'},
    {regex: /^\/isbn-registry\/identifierbatches\/[0-9]+$/, method: 'GET'},
    {regex: /^\/isbn-registry\/identifierbatches\/[0-9]+\/download$/, method: 'POST'},
    {regex: /^\/issn-registry\/requests$/, method: 'POST'},
    {regex: /^\/isbn-registry\/requests\/publishers$/, method: 'POST'},
    {regex: /^\/isbn-registry\/requests\/publications$/ , method: 'POST'}
  ];

  return (req, res, next) => {
    const configuredProxy = httpProxy(target, proxyOpts);
    const endpoint = availableEndpoints.find(endpoint => endpoint.method === req.method && req.url.match(endpoint.regex));

    if(MAINTENANCE_MODE) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Maintenance mode is enabled. Refusing to interact with API.'});
    }

    if (endpoint) {
      return configuredProxy(req, res, next);
    }
    return res.status(HttpStatus.FORBIDDEN).json({message: 'Forbidden'});

  };
}

export function parseBoolean(value) {
  if (value === undefined) {
    return false;
  }

  if (Number.isNaN(Number(value))) {
    return value.length > 0 && !(/^(?:false)$/ui).test(value);
  }

  return Boolean(Number(value));
}

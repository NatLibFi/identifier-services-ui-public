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

import express from 'express';
import helmet from 'helmet';
import https from 'https';
import path from 'path';

import {createLogger} from '@natlibfi/melinda-backend-commons';

import {HELMET_CONFIG, HTTP_PORT, HTTPS_PORT, MAINTENANCE_MODE, NODE_ENV, TLS_CERT, TLS_KEY} from './config';
import {getConfiguredProxy} from './proxy';
import {provideFrontendConfig} from './utils';

export default async function run() {
  const logger = createLogger();
  const app = express();

  // Header config
  app.disable('x-powered-by');

  // Use helmet everywhere but development with its associated config
  if(NODE_ENV !== 'development') {
    app.use(helmet(HELMET_CONFIG));
  }

  // FE config management
  app.get('/api/config', provideFrontendConfig);

  // Proxy API calls
  app.use('/api', getConfiguredProxy());

  // Serve static files
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Fallback to index
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
  });

  // Error management
  app.use(handleErrors);

  // Log config options if necessary
  if(MAINTENANCE_MODE) {
    logger.warn('Maintenance mode is enabled. Proxy will not send requests to API.');
  }

  // If TLS configuration is not provided do not allow operation
  if (!TLS_CERT || !TLS_KEY) {
    const server = app.listen(HTTP_PORT, () => logger.info(`Started identifier-services-ui-public HTTP server on PORT ${HTTP_PORT}`));
    return server;
  }

  // Return https server with defined cert and key
  const tlsConfig = {
    key: TLS_KEY,
    cert: TLS_CERT
  };

  const server = https.createServer(tlsConfig, app).listen(HTTPS_PORT, () => {
    logger.info(`Started identifier-services-ui-public HTTPS server on port ${HTTPS_PORT}`);
  });

  return server;

  function handleErrors(err, req, res, next) {
    if(err) {
      logger.warn('Proxy has encountered an error');
      logger.debug(`${err.message}`);

      return res.status(500).json({message: 'Unknown error occurred'});
    }

    logger.warn('Unknown error occurred!');

    next();
  }
}

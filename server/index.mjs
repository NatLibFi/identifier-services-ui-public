import compression from 'compression';
import express from 'express';
import helmet from 'helmet';

import { fileURLToPath } from 'url';
import path from 'path';

import {
  HELMET_CONFIG,
  HTTP_PORT,
  LOG_LEVEL,
  MAINTENANCE_MODE,
  NODE_ENV,
  NOTIFICATION_BANNER,
  TURNSTILE_SITEKEY,
} from './config.mjs';

import { createApplicationLogger, createExpressLogger } from './logging.mjs';
import { getConfiguredProxy } from './proxy.mjs';
import { isDevelopmentEnvironment, isProductionEnvironment } from './utils.mjs';

import packageJson from '../package.json' with { type: 'json' };

// CJS -> MJS transition requires this
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = createApplicationLogger(LOG_LEVEL);
const app = express();

const staticFolder = '../dist';

// Header config
app.disable('x-powered-by');

// Enable logging for express server
app.use(createExpressLogger(LOG_LEVEL, false));

// Use helmet everywhere but development with its associated config
if (!isDevelopmentEnvironment()) {
  logger.info('Applying HELMET configuration');
  app.use(helmet(HELMET_CONFIG));
}

// Application runtime config
app.get('/config', (req, res) => {
  return res.json({
    environment: NODE_ENV,
    maintenance: MAINTENANCE_MODE,
    turnstileSiteKey: TURNSTILE_SITEKEY,
    notificationBanner: NOTIFICATION_BANNER,
  });
});

// Proxy API calls
app.use('/api', getConfiguredProxy());

// Serve static files
app.use(compression(), express.static(path.resolve(__dirname, staticFolder)));

// Fallback to serving React application
// Note old catch-all route definition broke in migration from Express v4 to v5:
// https://expressjs.com/en/guide/migrating-5.html#path-syntax
app.get('/{*path}', (req, res) => {
  return res.sendFile(path.join(__dirname, `${staticFolder}/index.html`));
});

// Error management
app.use(handleErrors);

// Sanity: 404 handler (check app handler if this is matched)
app.use(handleNotFound);

// Log config options if necessary
if (MAINTENANCE_MODE) {
  logger.warn('Maintenance mode is enabled. Proxy will not send requests to API.');
}

logger.info(`Started Identifier Services UI Public v${packageJson.version} HTTP server on PORT ${HTTP_PORT}`);
const server = app.listen(HTTP_PORT);

// Shutdown gracefully
process
  .on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('SIGUSR2', shutdown)
  .on('uncaughtException', (err) => {
    logger.error('Uncaught exception', err);
    shutdown();
  });

function shutdown() {
  logger.info('Received signal resulting to shutdown process, starting shutting down gracefully');
  if (!isProductionEnvironment()) {
    return process.exit(0);
  }

  server.close(() => {
    logger.info('HTTP server was closed - exiting process');
    process.exit(0);
  });
}

function handleErrors(err, req, res) {
  logger.warn('Webserver has encountered an error: ', err.message);

  const responseBody = {
    type: 'about:blank',
    status: 500,
    title: 'Internal Server Error',
    detail: 'The server could not process the API call due to an unexpected error.',
    instance: req.url,
  };

  res.set('Content-Type', 'application/problem+json');
  return res.status(500).send(responseBody);
}

function handleNotFound(req, res) {
  const problemDocument = {
    type: 'about:blank',
    status: 404,
    title: 'Not found',
    detail: 'Requested resource was not found',
    instance: req.path,
  };

  res.set('Content-Type', 'application/problem+json');
  return res.status(404).json(problemDocument);
}

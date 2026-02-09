import expressWinston from 'express-winston';
import { DateTime } from 'luxon';
import winston from 'winston';

// Loggers are singletons (see e.g., https://refactoring.guru/design-patterns/singleton)
let APPLICATION_LOGGER;
let EXPRESS_LOGGER;

/**
 * Gets express logger
 * @returns express-winston logger
 */
export function getExpressLogger() {
  if (!EXPRESS_LOGGER) {
    throw new Error('express logger has not been created');
  }

  return EXPRESS_LOGGER;
}

/**
 * Creates express logger
 * @param {string} logLevel - loglevel for logger
 * @param {boolean} enableProxy - whether proxy is enabled or not
 * @param {string|undefined} ipAddressHeader - HTTP request header ip address is saved to (if other than )
 * @returns {Object} logger created by expressWinston.logger
 */
export function createExpressLogger(logLevel, enableProxy, ipAddressHeader) {
  const useCustomMessage = enableProxy && ipAddressHeader;
  const customMessage = useCustomMessage
    ? `{{req.headers["${ipAddressHeader}"]}} HTTP {{req.method}} {{req.path}} - {{res.statusCode}} {{res.responseTime}}ms`
    : undefined;
  const message = useCustomMessage
    ? customMessage
    : '{{req.ip}} HTTP {{req.method}} {{req.path}} - {{res.statusCode}} {{res.responseTime}}ms';

  EXPRESS_LOGGER = expressWinston.logger({
    meta: true,
    msg: message,
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    ignoreRoute: (req, _res) => {
      // For now do not log common assets to avoid log bloat
      const loggingBlacklist = [/^\/config/, /^\/favicon.ico/, /^\/index.html/, /^\/assets\/.*\.(css|js)/];
      const doNotLog = loggingBlacklist.some((assetRegExp) => assetRegExp.test(req.path));
      return doNotLog;
    },
    ...createLoggerOptions(logLevel),
  });

  return EXPRESS_LOGGER;
}

/**
 * Get application logger
 * @returns {Object} instance of winston.Logger if logger has been created, otherwise throws error
 */
export function getApplicationLogger() {
  if (!APPLICATION_LOGGER) {
    throw new Error('application logger has not been created');
  }

  return APPLICATION_LOGGER;
}

/**
 * Reset application logger for testing purposes
 */
export function resetApplicationLogger() {
  APPLICATION_LOGGER = undefined;
  return;
}

/**
 * Create application logger
 * @param {string} logLevel - log level to apply
 * @returns {Object} instance of winston.Logger
 */
export function createApplicationLogger(logLevel = 'info') {
  APPLICATION_LOGGER = winston.createLogger({
    ...createLoggerOptions(logLevel),
  });
  return APPLICATION_LOGGER;
}

/**
 * Create options for Winston logger
 * @param {string} logLevel - log level to apply
 * @returns {Object} object containing winston logger options
 */
function createLoggerOptions(logLevel = 'info') {
  const timestamp = winston.format((info) => ({
    ...info,
    timestamp: DateTime.now().toISO(),
  }));

  return {
    format: winston.format.combine(timestamp(), winston.format.printf(formatMessage)),
    transports: [
      new winston.transports.Console({
        level: logLevel,
        silent: logLevel === 'silent',
      }),
    ],
  };

  function formatMessage(winstonPrintfOpts) {
    return `${winstonPrintfOpts.timestamp} - ${winstonPrintfOpts.level}: ${winstonPrintfOpts.message}`;
  }
}

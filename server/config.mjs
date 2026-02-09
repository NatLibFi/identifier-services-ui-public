import { parseBoolean, parseFile, parseSingleQuotedValue, readEnvironmentVariable } from './utils.mjs';

/* PROCESS ENVIRONMENT */
export const NODE_ENV = readEnvironmentVariable('NODE_ENV', {
  defaultValue: 'development',
});

export const HTTP_PORT = readEnvironmentVariable('HTTP_PORT', {
  defaultValue: 8080,
  format: (v) => Number(v),
});

export const MAINTENANCE_MODE = readEnvironmentVariable('MAINTENANCE_MODE', {
  defaultValue: false,
  format: (v) => parseBoolean(v),
});

export const NOTIFICATION_BANNER = readEnvironmentVariable('NOTIFICATION_BANNER', {
  defaultValue: {},
  format: parseSingleQuotedValue,
});

export const LOG_LEVEL = readEnvironmentVariable('LOG_LEVEL', {
  defaultValue: 'info',
});

/* API CONNECTION */
export const API_HOST = readEnvironmentVariable('API_HOST', {
  defaultValue: 'https://localhost:8081',
});
export const API_PATH_PREFIX = readEnvironmentVariable('API_PATH_PREFIX', {
  defaultValue: '',
});
export const API_KEY = readEnvironmentVariable('API_KEY', { defaultValue: '' });
export const API_CLIENT_CERTIFICATE_KEY = readEnvironmentVariable('API_CLIENT_CERTIFICATE_KEY', {
  defaultValue: '',
  format: parseFile,
});
export const API_CLIENT_CERTIFICATE_CERT = readEnvironmentVariable('API_CLIENT_CERTIFICATE_CERT', {
  defaultValue: '',
  format: parseFile,
});

/* TURNSTILE */
export const TURNSTILE_SITEKEY = readEnvironmentVariable('TURNSTILE_SITEKEY', { defaultValue: '' });

/* OTHER CONFIGURATION */
export const HELMET_CONFIG = readEnvironmentVariable('HELMET_CONFIG', {
  defaultValue: {},
  format: JSON.parse,
});

export const PROXY_CUSTOM_HEADER = readEnvironmentVariable('PROXY_CUSTOM_HEADER', { defaultValue: '' });

export const PROXY_IP_SRC_HEADER = readEnvironmentVariable('PROXY_IP_SRC_HEADER', { defaultValue: 'x-forwarded-for' });

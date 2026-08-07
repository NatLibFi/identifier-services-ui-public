import httpProxy from 'express-http-proxy';

import * as CONFIG from './config.mjs';

export function getConfiguredProxy() {
  return httpProxy(CONFIG.API_HOST, createProxyOpts());
}

function createProxyOpts() {
  const proxyOpts = {};

  proxyOpts.proxyReqOptDecorator = preprocessRequest;
  proxyOpts.proxyReqPathResolver = appendPrefixToPath;
  proxyOpts.https = CONFIG.API_HOST.startsWith('https://');
  proxyOpts.filter = filterRequest;

  return proxyOpts;
}

// Disallow proxy during maintenance
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function filterRequest(req, _res) {
  if (CONFIG.MAINTENANCE_MODE) {
    return false;
  }

  // API V2
  const allowedEndpoints = [
    { regex: /^\/monograph\/publishers\/search$/, method: 'POST' }, // search publishers
    { regex: /^\/monograph\/publishers\/[0-9]+$/, method: 'GET' }, // read publisher information
    { regex: /^\/monograph\/isbn-publisher-ranges\/[0-9]+$/, method: 'GET' }, // get ISBN publisher range information
    { regex: /^\/monograph\/ismn-publisher-ranges\/[0-9]+$/, method: 'GET' }, // get ISBN publisher range information
    { regex: /^\/monograph\/isbn-publisher-ranges\/[0-9]+\/get-identifiers$/, method: 'POST' }, // get ISBN publisher range identifier list
    { regex: /^\/monograph\/ismn-publisher-ranges\/[0-9]+\/get-identifiers$/, method: 'POST' }, // get ISBN publisher range identifier list
    { regex: /^\/monograph\/publisher-requests$/, method: 'POST' }, // send monograph publisher requests
    { regex: /^\/monograph\/publication-requests$/, method: 'POST' }, // send monograph publication requests
    { regex: /^\/serial\/publication-requests$/, method: 'POST' }, // send serial publication requests
  ];

  const endpointIsAllowed = allowedEndpoints.some(
    (endpoint) => endpoint.method === req.method && endpoint.regex.test(req.url),
  );

  return endpointIsAllowed;
}

// Append the prefix to path if it's defined in env
function appendPrefixToPath(req) {
  return CONFIG.API_PATH_PREFIX ? `${CONFIG.API_PATH_PREFIX}${req.url}` : req.url;
}

// Set decorator options based on the environment configuration
function preprocessRequest(proxyReqOpts, srcReq) {
  if (CONFIG.API_KEY) {
    proxyReqOpts.headers['X-Api-Key'] = CONFIG.API_KEY;
  }

  if (CONFIG.API_CLIENT_CERTIFICATE_KEY && CONFIG.API_CLIENT_CERTIFICATE_CERT) {
    proxyReqOpts.key = CONFIG.API_CLIENT_CERTIFICATE_KEY;
    proxyReqOpts.cert = CONFIG.API_CLIENT_CERTIFICATE_CERT;
  }

  if (CONFIG.PROXY_IP_SRC_HEADER && CONFIG.PROXY_CUSTOM_HEADER && CONFIG.PROXY_CUSTOM_HEADER.startsWith('x-')) {
    proxyReqOpts.headers[CONFIG.PROXY_CUSTOM_HEADER] = srcReq.headers[CONFIG.PROXY_IP_SRC_HEADER];
  }

  return proxyReqOpts;
}

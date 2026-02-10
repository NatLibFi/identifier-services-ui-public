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

  const allowedEndpointsV1 = [
    { regex: /^\/public\/isbn-registry\/publishers\/query$/, method: 'POST' },
    { regex: /^\/public\/isbn-registry\/publishers\/[0-9]+$/, method: 'GET' },
    { regex: /^\/public\/isbn-registry\/identifierbatches\/[0-9]+$/, method: 'GET' },
    { regex: /^\/public\/isbn-registry\/identifierbatches\/[0-9]+\/download$/, method: 'POST' },
    { regex: /^\/public\/issn-registry\/requests$/, method: 'POST' },
    { regex: /^\/public\/isbn-registry\/requests\/publishers$/, method: 'POST' },
    { regex: /^\/public\/isbn-registry\/requests\/publications$/, method: 'POST' },
  ];

  const endpointIsAllowed = allowedEndpointsV1.find(
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

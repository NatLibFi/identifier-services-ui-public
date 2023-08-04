import httpProxy from 'express-http-proxy';

import * as config from './config';

/**
 * Getter for configured http proxy
 * @returns httpProxy from express-http-proxy configured with environmental values
 */
export function getConfiguredProxy() {
  return httpProxy(config.API_HOST, createProxyOpts());
}

function createProxyOpts() {
  const proxyOpts = {};

  proxyOpts.proxyReqOptDecorator = preprocessRequest;
  proxyOpts.proxyReqPathResolver = appendPrefixToPath;
  proxyOpts.filter = filterRequest;
  proxyOpts.https = config.API_HOST.startsWith('https://');

  return proxyOpts;
}

// Append the prefix to path if it's defined in env
function appendPrefixToPath(req) {
  return config.API_PATH_PREFIX ? `${config.API_PATH_PREFIX}${req.url}` : req.url;
}

// Filter allowed requests based on type and path
// eslint-disable-next-line no-unused-vars
function filterRequest(req, _res) {
  if(config.MAINTENANCE_MODE) {
    console.log('Maintenance mode is enabled: won\'t proxy calls to api');
    return false;
  }

  const allowedEndpoints = [
    {regex: /^\/public\/isbn-registry\/publishers\/query$/, method: 'POST'},
    {regex: /^\/public\/isbn-registry\/publishers\/[0-9]+$/, method: 'GET'},
    {regex: /^\/public\/isbn-registry\/identifierbatches\/[0-9]+$/, method: 'GET'},
    {regex: /^\/public\/isbn-registry\/identifierbatches\/[0-9]+\/download$/, method: 'POST'},
    {regex: /^\/public\/issn-registry\/requests$/, method: 'POST'},
    {regex: /^\/public\/isbn-registry\/requests\/publishers$/, method: 'POST'},
    {regex: /^\/public\/isbn-registry\/requests\/publications$/ , method: 'POST'}
  ];

  const endpointIsAllowed = allowedEndpoints.find(endpoint => endpoint.method === req.method && req.url.match(endpoint.regex));
  return endpointIsAllowed;
}

// Set decorator options based on the environment configuration
// eslint-disable-next-line no-unused-vars
function preprocessRequest(proxyReqOpts, _srcReq) {
  // For development purposes only
  if(config.ALLOW_SELF_SIGNED) {
    proxyReqOpts.rejectUnauthorized = false;
  }

  if(config.API_KEY) {
    proxyReqOpts.headers['X-Api-Key'] = config.API_KEY;
  }

  if(config.API_CLIENT_CERTIFICATE_KEY && config.API_CLIENT_CERTIFICATE_CERT) {
    proxyReqOpts.key = config.API_CLIENT_CERTIFICATE_KEY;
    proxyReqOpts.cert = config.API_CLIENT_CERTIFICATE_CERT;
  }

  // Do not pass authorization header forward
  delete proxyReqOpts.headers['authorization'];
  delete proxyReqOpts.headers['Authorization'];

  return proxyReqOpts;
}

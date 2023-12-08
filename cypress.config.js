/* eslint-disable no-unused-vars */
const {defineConfig} = require('cypress');

// Use pre-defined dotenv configuration when running cypress
const cypressEnvironmentConfig = require('dotenv').config({path: '.env.local.cypress'});

module.exports = defineConfig({
  e2e: {
    // API request responses are mocked so running over HTTP for e2e test use case is ok
    baseUrl: 'http://localhost:8080',
    testIsolation: true,
    setupNodeEvents(on, config) {
      config.env = {
        ...cypressEnvironmentConfig.parsed,
        ...config.env
      };
      return config;
    }
  }
});

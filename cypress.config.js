/* eslint-disable no-unused-vars */
const {defineConfig} = require('cypress');

module.exports = defineConfig({
  e2e: {
    // API request responses are mocked so running over HTTP for e2e test use case is ok
    baseUrl: 'http://localhost:8080',
    testIsolation: true
  }
});

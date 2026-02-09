import express from 'express';

// Create express app using given runtime config
// that is to be served from /config
function createExpress(config) {
  const expressApp = express();
  expressApp.get('/config', (_req, res) => {
    const devRuntimeEnv = {
      maintenance: config.maintenance,
      environment: 'development', // DO NOT CHANGE. Vite is never used outside of development context in this project.
      notificationBanner: config.notificationBanner,
    };

    return res.json(devRuntimeEnv);
  });

  return expressApp;
}

// Custom plugin for handling proxy in dev env
const reactDevProxy = (frontendConfig) => {
  // Sets response value for route handler
  const devExpressApp = createExpress(frontendConfig);

  return {
    name: 'configure-server',
    config() {
      return {
        server: {
          proxy: {
            '/config': {},
          },
        },
      };
    },
    configureServer(server) {
      server.middlewares.use(devExpressApp);
    },
  };
};

export default reactDevProxy;

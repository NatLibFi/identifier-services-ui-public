import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// For bundle analyzing use these:
// import { visualizer } from 'rollup-plugin-visualizer';
// import { defineConfig, loadEnv, type PluginOption } from 'vite';

import path from 'path';
import tailwindcss from '@tailwindcss/vite';

//@ts-expect-error @natlibfi .mjs without typings
import { parseBoolean, parseSingleQuotedValue } from './server/utils.mjs';

//@ts-expect-error mjs without typings
import reactDevProxy from './vite-plugin-react-dev-proxy.mjs';

export interface FrontendConfig {
  maintenance: boolean;
  notificationBanner: {
    title: {
      fi: string;
      sv: string;
      en: string;
    };
    text: {
      fi: string;
      sv: string;
      en: string;
    };
  };
}

// Required for mocking /config endpoint
let frontendConfig: FrontendConfig | undefined;

const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  const env = loadEnv('dev', process.cwd(), '');
  frontendConfig = {
    maintenance: parseBoolean(env.MAINTENANCE_MODE),
    notificationBanner: parseSingleQuotedValue(env.NOTIFICATION_BANNER),
  };
}

const plugins = getPlugins(isDev, frontendConfig);

// https://vite.dev/config/
export default defineConfig({
  plugins,
  build: {
    chunkSizeWarningLimit: 2000, // for this application large chunks are not a problem
    license: { fileName: 'license.md' },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: true,
    proxy: {
      '^/api': {
        target: 'http://localhost:8081',
        rewrite: (path) => path.replace(/^\/api/, ''),
        // Uncomment if you need to investigate requests proxied to api
        /*
        configure: (proxy, options) => {
          proxy.on('proxyReq', function (proxyReq, req, res) {
          })
        }
        */
      },
    },
  },
});

// In dev load dev-proxy since /config handler is required, otherwise load only react
function getPlugins(isDev: boolean, frontendConfig: FrontendConfig | undefined) {
  const basePlugins = [react(), tailwindcss()];

  if (isDev) {
    return [...basePlugins, reactDevProxy(frontendConfig)];
  }

  return basePlugins;

  // Just for when analyzing bundle
  // return [...basePlugins, visualizer({ open: true }) as PluginOption];
}

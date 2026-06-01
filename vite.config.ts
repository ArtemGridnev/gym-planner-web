/// <reference types="vitest/config" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiUrl = env.VITE_API_URL;
  const trainingSessionsRemoteUrl = env.VITE_TRAINING_SESSIONS_REMOTE_URL;

  if (!apiUrl) {
    throw new Error('VITE_API_URL is not defined');
  }

  if (!trainingSessionsRemoteUrl) {
    throw new Error('VITE_TRAINING_SESSIONS_REMOTE_URL is not defined');
  }

  return {
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }),
      federation({
        name: 'host',
        remotes: {
          trainingSessions: trainingSessionsRemoteUrl,
        },
        shared: {
          react: { requiredVersion: false },
          'react-dom': { requiredVersion: false },
          '@mui/material': { requiredVersion: false },
          '@emotion/react': {
            requiredVersion: false,
          },
          '@emotion/styled': {
            requiredVersion: false,
          },
          '@tanstack/react-query': {
            requiredVersion: false,
          },
        },
      }),
    ],
    build: {
      target: 'esnext',
    },

    server: {
      proxy: {
        '/api': {
          target: apiUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      },
    },

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
    },
  };
});
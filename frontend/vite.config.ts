import { lingui } from "@lingui/vite-plugin";
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    define: {
      'process.env': process.env,
    },
    plugins: [
      react({
        babel: {
          plugins: ["macros"],
        },
      }),
      lingui(),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },
    clearScreen: false,
    server: {
      port: 1420,
      strictPort: true,
      proxy: {
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
      watch: {
        ignored: ['**/src-tauri/**'],
      },
    },
  };
});

// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',

  vite: {
    plugins: [
      tailwindcss(),
      svgr({
        include: '**/*.svg?react',
      }),
    ],
  },
  redirects: {
    '/dashboard': '/dashboard/instituciones',
  },

  env: {
    schema: {
      BACKEND_URL: envField.string({
        access: 'public',
        context: 'client',
        url: true,
        default: 'http://localhost:8080',
      }),
    },
  },

  integrations: [react()],
  adapter: vercel(),
});

// @ts-check
import { defineConfig, envField } from 'astro/config';

import vercel from '@astrojs/vercel/serverless';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  output: 'server',
  adapter: vercel(),
  env: {
  schema: {
	AIRPORT_DATA_API_KEY: envField.string({ context: "client", access: "public" }),
	FLIGHT_DATA_API_KEY: envField.string({ context: "client", access: "public" }),
	},
  },		  

  integrations: [icon(), svelte()]
});

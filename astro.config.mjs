import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/embed/'),
    }),
  ],
  output: 'static',
  site: 'https://observatorio-etp.pages.dev',
  compressHTML: true,
});

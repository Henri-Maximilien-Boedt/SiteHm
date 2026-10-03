// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // TODO: remplacer par le vrai domaine (question 11)
  site: 'https://sitehm.pages.dev',
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    routing: {
      prefixDefaultLocale: true, // => /fr et /en (pas de racine implicite)
    },
  },
  trailingSlash: 'ignore',
  redirects: { '/': '/fr' },
  build: { format: 'directory' },
  image: {
    // formats modernes générés par Astro <Image> (sharp)
    // AVIF/WebP + fallback, srcset auto
  },
});

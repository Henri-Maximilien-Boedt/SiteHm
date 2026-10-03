# Déploiement — Cloudflare Pages

Sortie **statique** (`output: 'static'`), donc **aucun adapter** nécessaire.

## Via le dashboard Cloudflare Pages
1. Connecter le repo GitHub `Henri-Maximilien-Boedt/SiteHm`.
2. Build settings :
   - **Framework preset** : Astro
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Node version** : 20+ (variable `NODE_VERSION=20`)
3. Déployer. La racine `/` redirige vers `/fr` (redirect défini dans `astro.config.mjs`).

## Via Wrangler (CLI)
```bash
npm run build
npx wrangler pages deploy dist --project-name sitehm
```

## À faire avant la prod
- Mettre le vrai domaine dans `astro.config.mjs` (`site:`) pour le sitemap/OG.
- `public/_headers` gère le cache (assets immuables) et quelques en-têtes de sécurité.
- Fonts déjà self-hostées (`public/fonts/`, `src/styles/fonts.css`).

## Scripts utiles
- `node scripts/gen-content.mjs` : régénère les entrées photos/séries depuis `mockups/assets` (+ EXIF).
- `node scripts/fonts.mjs` : re-télécharge les fonts woff2 en local.

# CLAUDE.md

Guide pour travailler sur ce dépôt. Voir `README.md` pour la doc complète.

## Projet
Portfolio personnel d'Henri-Maximilien Boedt (photographe / dev web / cofondateur L&M Computing).
Direction visuelle **« Nocturne »** : fond near-black, un seul accent braise `#E8541B`, la photo est le design.
**Astro statique** + TypeScript, WebGL (OGL), Lenis, View Transitions, i18n FR/EN, déploiement Cloudflare Pages.

## Commandes
```bash
npm run dev       # dev (http://localhost:4321)
npm run build     # build statique → dist/
npm run preview   # sert dist/ (pour un Lighthouse réaliste)
node scripts/gen-content.mjs   # régénère images + contenu depuis photos/ (originaux)
node scripts/fonts.mjs         # re-télécharge les fonts woff2 locales
```

## Architecture (où se trouve quoi)
- **URLs** → `src/pages/{fr,en}/` (index, photographie/, photographie/[serie], travail/). `/` → `/fr`.
- **Logique de page** dans des composants : `components/home/{Home,WebGLWall}.astro`, `components/photo/{SeriesIndex,SeriesPage}.astro`, `components/work/Work.astro`.
- **Layout** : `layouts/Base.astro` (head, fonts + preload, grain, Cursor, ClientRouter, Lenis).
- **Contenu** : collections `series` + `photos` (`src/content/`, schéma dans `src/content.config.ts`). Une photo = un `.md` + un `.jpg` co-localisés.
- **i18n** : tous les libellés dans `src/i18n/ui.ts` (`t = useTranslations(lang)`).
- **Design tokens** : `src/styles/tokens.css`. Reset/utilitaires : `global.css`. Fonts : `fonts.css` (généré).

## Pipeline images (IMPORTANT pour la qualité)
Les images servies sont **générées depuis les originaux** `photos/` (non versionnés) par `scripts/gen-content.mjs` :
- `src/content/.../*.jpg` = **masters 2560px/q88** → source de `<Image>` (Astro ré-optimise en AVIF/WebP).
- `public/photos/*.jpg` = **1280px/q82** → mur WebGL + cartes/aperçus.
- Ne JAMAIS pointer la collection vers des copies déjà réduites (perte de netteté).
- Le mapping fichier → série/titre/EXIF est en haut de `gen-content.mjs`.

## Conventions
- **Pas de tiret cadratin `—`** dans le texte visible (convention design) → `·`, `,`, `.`, `/`.
- `prefers-reduced-motion` doit couper loader, WebGL, parallaxe, curseur. Toujours tester les deux modes.
- Un seul accent (`--ember`), un seul fond, fonts self-hostées (aucune requête externe).
- Cible : Lighthouse perf ≥ 90, a11y = 100 (ne pas régresser). Contrastes AA, `alt` sur chaque image.
- Mobile : fallback DOM du mur, pas de curseur custom.

## View Transitions (lifecycle)
- `ClientRouter` activé dans `Base.astro`. Les scripts de page s'initialisent sur `astro:page-load` et se nettoient sur `astro:before-swap` (annuler rAF, disconnect IO, abort listeners).
- L'accueil WebGL utilise **`data-astro-reload`** sur ses liens (portes, sélecteur de langue) pour forcer un full-load et préserver ses scripts.
- Le curseur (`Cursor.astro`) est `transition:persist`.
- Transition d'élément partagé : `transition:name={`cover-${slug}`}` sur la vignette (index) ET le hero (série).

## Pièges
- **Nouvelle route dynamique / nouvelle entrée de collection → redémarrer `npm run dev`** (le HMR ne les enregistre pas toujours ; sinon 404).
- **Node 25** : une exception dans un frontmatter peut faire planter le build avec une assertion libuv obscure. L'erreur réelle (ex. `ENOENT`) est juste au-dessus.
- `<Image>` est **lazy** par défaut (hors écran non chargé) — ne pas se baser sur `img.complete` pour attendre toutes les images.
- Lire un fichier au build côté composant : utiliser `process.cwd()`, PAS `import.meta.url` (qui pointe vers `dist/chunks/` au build).
- `gen-content.mjs` lit l'EXIF depuis un `analysis.json` en scratchpad (chemin absolu) — régénérer si besoin, non critique pour le build.

## État du contenu
- Textes CV / séries = **placeholder balisé** (`// ... à confirmer`) en attente du contenu réel (dates, bio, Assembly/Oz, établissement, EN).
- Taxonomie séries : `motorsport` (Spa/Paul Ricard, portraits only) · `seoul` (DDP + rue + Busan) · `paysage` (Alpes/Sicile/Etna) · `nuit` (Osaka + ukai).
- CV PDF = bouton mock, à brancher.

## Git / déploiement
- Remote : `github.com/Henri-Maximilien-Boedt/SiteHm`, branche `main`.
- `photos/` (originaux ~150 Mo) est **gitignoré** ; le build n'en a pas besoin (il utilise `src/content` + `public`).
- Cloudflare Pages : build `npm run build`, output `dist`, pas d'adapter. Voir `DEPLOY.md`.
- Mettre le vrai domaine dans `astro.config.mjs` (`site:`) avant la prod.

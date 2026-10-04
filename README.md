# SiteHm — Portfolio « Nocturne »

Portfolio personnel d'**Henri-Maximilien Boedt** : photographe, développeur web, cofondateur de L&M Computing.
À la fois portfolio photo, CV, et vitrine web design. Direction visuelle **Nocturne** : galerie sombre, un seul accent braise, la photo est le design.

**Stack** : [Astro](https://astro.build) (statique) · TypeScript · WebGL ([OGL](https://github.com/oframe/ogl)) · [Lenis](https://lenis.darkroom.engineering/) (smooth scroll) · View Transitions natives · i18n FR/EN · déploiement Cloudflare Pages.

---

## Démarrage rapide

```bash
npm install          # dépendances
npm run dev          # serveur de dev  → http://localhost:4321
npm run build        # build statique  → dist/
npm run preview      # sert le build de prod localement
```

> Node 20+ requis. (Développé sous Node 25 — voir « Pièges connus ».)

---

## Structure du projet

```
SiteHm/
├─ astro.config.mjs        config Astro : i18n (/fr /en), redirect / → /fr, site (domaine)
├─ tsconfig.json
├─ DEPLOY.md               notice de déploiement Cloudflare Pages
├─ scripts/
│  ├─ gen-content.mjs      (re)génère les photos + entrées de contenu depuis les originaux
│  └─ fonts.mjs            (re)télécharge les fonts woff2 en local
├─ public/
│  ├─ photos/              images web pour le mur WebGL + les cartes (1280px)
│  ├─ fonts/               fonts woff2 self-hostées
│  ├─ _headers            cache + sécurité (Cloudflare Pages)
│  └─ favicon.svg
├─ photos/                 ⚠️ originaux haute-résolution (NON versionnés, ~150 Mo, locaux)
└─ src/
   ├─ pages/               = les URLs
   │  ├─ fr/ · en/         index, photographie/, photographie/[serie], travail/
   ├─ layouts/Base.astro   <head>, fonts, grain, curseur, ClientRouter, Lenis
   ├─ components/
   │  ├─ home/             Home.astro + WebGLWall.astro (mur OGL)
   │  ├─ photo/            SeriesIndex.astro + SeriesPage.astro
   │  ├─ work/Work.astro   page Travail/CV
   │  ├─ Cursor.astro · SubNav.astro · Stub.astro
   ├─ content/
   │  ├─ series/<slug>.md  une entrée par série (+ image de couverture)
   │  └─ photos/<serie>/   une entrée .md + .jpg par photo
   ├─ content.config.ts    schéma des collections (séries, photos)
   ├─ i18n/ui.ts           textes FR/EN + helpers de langue
   └─ styles/
      ├─ tokens.css        design system (couleurs, typo, motion, z-index)
      ├─ global.css        reset + utilitaires + reduced-motion
      └─ fonts.css         @font-face (généré par scripts/fonts.mjs)
```

---

## Design system (`src/styles/tokens.css`)

| Rôle | Valeur |
|---|---|
| Fond | `--bg: #09090A` (near-black) |
| Encre | `--ink: #F3EFE8` (blanc chaud) · `--ink-dim: #cfc9bf` |
| Accent unique | `--ember: #E8541B` (braise) |
| Labels | `--muted: #8b8b94` (AA sur fond noir) |
| Display | Clash Display (`--font-display`) |
| Texte | Satoshi (`--font-body`) |
| Mono | Space Mono (`--font-mono`) — EXIF, labels, terminal |

Un seul accent, une seule couleur de fond, fonts self-hostées. **Convention** : pas de tiret cadratin (`—`) dans le texte visible ; utiliser `·`, `,`, `.` ou `/`.

---

## i18n (FR / EN)

- Routes : `/fr/...` et `/en/...` (config `i18n` d'Astro, `prefixDefaultLocale: true`). `/` redirige vers `/fr`.
- Tous les libellés d'interface sont dans **`src/i18n/ui.ts`** (objet `ui.fr` / `ui.en`).
- Dans un composant : `const t = useTranslations(lang); t('nav.home')`.
- Le sélecteur de langue utilise `switchLangPath()` pour garder la page équivalente.

**Pour traduire/ajuster un libellé** : édite `src/i18n/ui.ts`.

---

## Gérer le contenu

### Ajouter / modifier une photo

Chaque photo = **un fichier image + un petit `.md`** dans `src/content/photos/<serie>/` :

```markdown
---
series: "seoul"
title:
  fr: "DDP · escalier"
  en: "DDP · staircase"
src: ./DSC_2693.jpg          # image co-localisée dans le même dossier
location: "Séoul"
date: "2024-06-01"
order: 1                      # ordre dans la série
exif:
  focal: "28mm"
  aperture: "f/2.8"
  shutter: "1/1000s"
  iso: 100
---
```

→ dépose le `.jpg` à côté, crée le `.md`, c'est tout. Astro génère les versions optimisées (AVIF/WebP, srcset) automatiquement.

### Ajouter / modifier une série

Un `.md` dans `src/content/series/` :

```markdown
---
title: { fr: "Séoul", en: "Seoul" }
order: 2
speedBlur: 1
location: "Corée du Sud"
year: "2024"
cover: ./DSC_2904.jpg         # couverture PAYSAGE de préférence
---
```

Séries actuelles : `motorsport`, `seoul` (inclut Busan), `paysage` (Alpes/Sicile/Etna), `nuit` (Japon/Osaka/ukai).

### Régénérer tout le contenu depuis les originaux

Les images de `src/content` et `public/photos` sont **générées** à partir des originaux de `photos/` :

```bash
node scripts/gen-content.mjs
```

Produit : masters **2560px/q88** pour `src/content` (source de `<Image>`) + **1280px/q82** pour `public/photos` (mur WebGL, cartes), et réécrit les `.md` avec l'EXIF. La correspondance fichier → série/titre est éditable **en haut du script**.

> ⚠️ La netteté des photos vient des **originaux** : ne jamais pointer la collection vers des copies déjà réduites.

### CV / Travail

Le texte du CV (dates, bio, projets, compétences, « Terres explorées ») est actuellement **du placeholder balisé** dans `src/components/work/Work.astro` (objets `experience`, `formation`, `projects`, `skills`, `lands`). À remplacer par le contenu réel.

---

## Les pages, en bref

- **Accueil** (`Home.astro` + `WebGLWall.astro`) : loader compteur, nom cinétique, **mur de photos WebGL** (OGL) draggable avec distorsion liquide au curseur. Fallback DOM si WebGL indisponible ou `reduced-motion`. Deux portes : Photographie / Travail.
- **Photographie** (`SeriesIndex.astro`) : index éditorial des 4 séries → clic vers une série (transition d'élément partagé vignette → hero).
- **Série** (`SeriesPage.astro`) : scroll narratif, parallaxe, **layout orienté** (paysages en plein cadre, portraits en colonnes), lightbox clavier (← → Échap).
- **Travail/CV** (`Work.astro`) : timeline, cartes projets, compétences, « Terres explorées », **terminal interactif** (`help`, `about`, `skills`, `projects`, `contact`, `cv`, `clear`).

---

## Fonts self-hostées

Aucune requête externe. Les woff2 sont dans `public/fonts/`, les `@font-face` dans `src/styles/fonts.css` (généré). Les 2 fonts above-the-fold sont **préchargées** (lues depuis `fonts.css` par `Base.astro`).

Pour re-télécharger / changer les graisses : édite les sources dans `scripts/fonts.mjs` puis `node scripts/fonts.mjs`.

---

## Accessibilité & performance

- **Lighthouse** (desktop) : Performance **≥ 90**, Accessibilité **100** sur toutes les pages.
- `prefers-reduced-motion` : loader, mur WebGL, parallaxe, curseur custom → tous coupés, site 100 % utilisable.
- Mobile : mur WebGL remplacé par le fallback DOM, pas de curseur custom.
- Contrastes AA, `alt` sur chaque photo, navigation clavier, `lang` correct par page.
- Leviers perf : SSR statique, `<Image>` AVIF/WebP + srcset, OGL en import dynamique (idle), textures uploadées 1/frame, images du mur en `lazy`, fonts préchargées.

---

## Déploiement

Sortie **statique** → **Cloudflare Pages**, aucun adapter. Build command `npm run build`, dossier `dist`. Détails dans **`DEPLOY.md`**.

Avant la prod : renseigner le vrai domaine dans `astro.config.mjs` (`site:`) pour le sitemap / OG.

---

## Pièges connus

- **Nouvelles routes / contenu** : après avoir ajouté une page dynamique ou une entrée de collection, **redémarrer `npm run dev`** (le HMR n'enregistre pas toujours les nouvelles routes).
- **Node 25** : une erreur levée dans le frontmatter d'un composant peut faire planter le build avec une assertion libuv peu parlante. Chercher l'erreur réelle juste au-dessus (ex. `ENOENT`).
- **View Transitions** : l'accueil (WebGL) utilise `data-astro-reload` sur ses liens pour forcer un chargement complet (préserve les scripts). Les scripts des sous-pages s'initialisent sur `astro:page-load` et se nettoient sur `astro:before-swap`.
- **`<Image>` est lazy par défaut** : les images hors écran ne se chargent qu'au scroll.
- **GSAP** est installé (dépendance) mais non utilisé pour l'instant — les animations sont en `requestAnimationFrame` vanilla + Lenis. Disponible si besoin.

---

## Reste à faire

1. Contenu réel du CV / des séries (remplacer les placeholders).
2. CV PDF (fourni ou généré).
3. Domaine de prod + déploiement Cloudflare.
4. Traductions EN à valider.

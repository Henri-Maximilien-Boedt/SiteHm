# Site portfolio — Henri-Maximilien Boedt

Contenu du CV (FR + EN) et prompt de build pour Claude Code.

> À compléter avant de lancer : `[EMAIL]`, années à l'École européenne, dates des jobs d'été, niveaux de langue.

---

## 1. Contenu — Français

### Hero
**Henri-Maximilien Boedt**
Étudiant en informatique · Photographe · Développeur web
Belgique / Luxembourg

Accroche (au choix) :
- « Je code des sites le jour et je chasse la lumière le reste du temps. »
- « Entre un terminal et un viseur. »
- « Pixels, photons et un peu trop de café. »

### À propos
Étudiant en sciences informatiques à l'UCLouvain, cofondateur de L&M Computing et photographe. Je construis des sites qui ont autant d'allure qu'ils sont efficaces, et je photographie tout ce qui va vite, tout ce qui est grand et tout ce qui est bétonné. Rigoureux, persévérant, et incapable de laisser un bug ou une photo ratée tranquille.

### Expérience
**L&M Computing** — Cofondateur & développeur full stack
Début 2026 → aujourd'hui · Belgique
Agence digitale pour PME : sites web, SaaS et applications, de la maquette au déploiement.
→ [lm-computing.com](https://lm-computing.com)

**Chef louveteau** — Animation scoute
2026 → aujourd'hui

**Barman** — Restaurant · Job d'été `[dates]`

**Ouvrier en rénovation** — Chantiers · Jobs d'été `[dates]`

### Formation
**Bachelier en sciences informatiques** — UCLouvain, Louvain-la-Neuve
2024 → aujourd'hui

**Baccalauréat européen** — École européenne Luxembourg I, Kirchberg
`[année début]` → `[2024]`

### Projets
**L&M Computing** — Une agence montée à deux, des sites livrés à de vrais clients.
**HomeLab** — Mon propre petit datacenter : Proxmox, TrueNAS, Docker, Tailscale, Jellyfin, tunnel Cloudflare. Autohébergement, réseau, et beaucoup de nuits blanches.
**Photographie** — Motorsport, paysage, urbain et architecture.

### Compétences
**Langages maîtrisés**
HTML · CSS · JavaScript · Node.js · Python · Java · C

**Terres explorées** *(langages croisés en chemin, pas forcément apprivoisés)*
Assembly · Oz

**Photo & vidéo**
Lightroom · Photoshop · DaVinci Resolve

**Infra & systèmes**
Linux · Proxmox · TrueNAS · Docker · Réseau

**Langues**
Français · Anglais · Italien `[niveaux]`

**Qualités**
Rigoureux · Persévérant · Curieux · Autonome

### Centres d'intérêt
Voyage (beaucoup) · Padel · Intelligence artificielle · Espace

### Contact
`[EMAIL]`
« Un projet, une idée, une photo ? Écris-moi. »

---

## 2. Content — English

### Hero
**Henri-Maximilien Boedt**
Computer Science Student · Photographer · Web Developer
Belgium / Luxembourg

Taglines:
- "Building websites by day, chasing light the rest of the time."
- "Somewhere between a terminal and a viewfinder."
- "Pixels, photons, and slightly too much coffee."

### About
Computer science student at UCLouvain, co-founder of L&M Computing, and photographer. I build websites that look as good as they perform, and I shoot anything fast, anything big and anything made of concrete. Rigorous, persistent, and unable to leave a bug or a bad shot alone.

### Experience
**L&M Computing** — Co-founder & Full-Stack Developer
Early 2026 → present · Belgium
Digital agency for SMEs: websites, SaaS and apps, from mockup to deployment.
→ [lm-computing.com](https://lm-computing.com)

**Cub Scout Leader** — 2026 → present

**Bartender** — Restaurant · Summer job `[dates]`

**Renovation Worker** — Construction sites · Summer jobs `[dates]`

### Education
**BSc in Computer Science** — UCLouvain, Louvain-la-Neuve · 2024 → present
**European Baccalaureate** — European School Luxembourg I, Kirchberg · `[start]` → `[2024]`

### Projects
**L&M Computing** — A two-person agency shipping real sites to real clients.
**HomeLab** — My own tiny datacenter: Proxmox, TrueNAS, Docker, Tailscale, Jellyfin, Cloudflare Tunnel.
**Photography** — Motorsport, landscape, urban and architecture.

### Skills
**Fluent in:** HTML · CSS · JavaScript · Node.js · Python · Java · C
**Explored territories:** Assembly · Oz
**Photo & Video:** Lightroom · Photoshop · DaVinci Resolve
**Infra & Systems:** Linux · Proxmox · TrueNAS · Docker · Networking
**Languages:** French · English · Italian
**Traits:** Rigorous · Persistent · Curious · Self-driven

### Interests
Travel (a lot) · Padel · Artificial intelligence · Space

### Contact
`[EMAIL]` — "A project, an idea, a photo? Drop me a line."

---

## 3. Prompt de build (à coller dans Claude Code)

```
Tu es un designer-développeur de niveau Awwwards "Site of the Day". Construis mon site
portfolio personnel. Il doit être à la fois mon portfolio photo, mon CV et la vitrine de
ce que je peux vendre en web design. Chaque page doit faire dire "wow" tout en restant
rapide et accessible.

## Qui je suis
Henri-Maximilien Boedt — Étudiant en informatique, photographe, développeur web.
Cofondateur de L&M Computing. Belgique / Luxembourg.
Ton : décalé et personnel, mais exécution irréprochable, comme un studio de design haut de gamme.
Le contenu complet FR/EN est dans `content/` (voir CONTENT.md) — ne l'invente pas, utilise-le.

## Stack
- Astro (statique par défaut, islands pour l'interactif), TypeScript
- GSAP + ScrollTrigger pour les animations, Lenis pour le smooth scroll
- OGL ou Three.js pour le WebGL (shaders sur les photos)
- View Transitions API (ou Barba.js) pour les transitions entre pages
- Astro <Image> pour l'optimisation (AVIF/WebP, srcset, lazy-load, blur placeholder)
- i18n FR/EN natif d'Astro (/fr, /en), sélecteur de langue animé
- Déploiement : Cloudflare Pages

## Structure
1. Loader : compteur 0→100 % en grande typo, puis révélation du hero.
2. Accueil : mur de photos infini en WebGL, draggable dans toutes les directions, avec
   distorsion liquide au survol. Mon nom en typographie géante cinétique qui réagit à la
   souris. Deux portes d'entrée : PHOTOGRAPHIE / TRAVAIL.
3. Photographie : séries (Motorsport, Paysage, Urbain, Séoul). Clic sur une série = la
   vignette s'agrandit et devient le hero plein écran de la page de série (shared element
   transition). Pages de série en scroll narratif : parallaxe, révélations, flou de
   vitesse lié à la vélocité du scroll pour Motorsport. Lightbox plein écran.
4. Travail / CV : timeline animée (expérience, formation), cartes projets (L&M Computing
   avec lien vers lm-computing.com, HomeLab, Photographie), compétences en liste sobre
   et élégante (pas de barres de pourcentage). Section "Terres explorées" pour Assembly
   et Oz, traitée avec humour visuel (ex : carte d'explorateur, coordonnées, badges).
   Mini terminal interactif (`help`, `about`, `skills`, `projects`, `contact`) comme
   clin d'œil dev. Bouton de téléchargement du CV en PDF.
5. À propos / Contact : texte perso, email uniquement (pas de réseaux sociaux pour
   l'instant).
6. Footer : bloc "Besoin d'un site comme celui-ci ?" qui renvoie vers L&M Computing.

## Pistes visuelles (point de départ, pas une contrainte)
Ce sont des idées. Si l'analyse de mes photos mène ailleurs, suis les photos.
- Fond sombre type galerie, beaucoup de vide : la photo est le design.
- Une couleur d'accent unique et vive ; typographie display expressive + une sans-serif
  neutre + une mono pour les détails techniques (EXIF, labels).
- Curseur custom qui change selon le contexte ("Voir", "Drag", loupe) et se teinte
  de la couleur dominante de l'image survolée.
- Micro-interactions partout : boutons magnétiques, liens soulignés animés, marquees.
- Sons de clic subtils, désactivés par défaut, avec toggle.
- Mode clair/sombre avec transition circulaire animée.

## Non négociable
- Lighthouse ≥ 90 en perf, 100 en accessibilité.
- `prefers-reduced-motion` : toutes les animations lourdes coupées, site 100 % utilisable.
- Mobile : version simplifiée mais toujours belle (pas de WebGL lourd, pas de curseur custom).
- Fallback si WebGL indisponible.
- Navigation clavier complète, contrastes AA, alt sur chaque image.
- Photos chargées depuis `src/assets/photos/<serie>/`, ajoutables sans toucher au code
  (content collection Astro avec frontmatter : titre, lieu, date, EXIF optionnel).

## Méthode — les photos dictent le design
Ne code rien avant d'avoir fait ces étapes, dans l'ordre :

1. **Mobilise tout ce que tu as.** Charge et utilise chaque skill, outil et ressource
   disponible qui touche au design (frontend-design, design system, critique de design,
   accessibilité, outils de mockup, etc.). Annonce lesquels tu utilises.
2. **Regarde mes photos, vraiment.** Ouvre et analyse chaque image de
   `src/assets/photos/` une par une : palette dominante, contraste, lumière, grain,
   cadrages, lignes, ambiance, sujets récurrents. Fais-moi une synthèse : qu'est-ce qui
   définit mon regard de photographe ?
3. **Propose 3 à 4 directions de design** nées de cette analyse, et pas de tendances
   génériques. Pour chacune : un nom, un concept en une phrase, une palette tirée de mes
   photos, un couple typographique, le style d'animation et de mise en page, les
   photos qui la portent le mieux, et pourquoi elle me correspond.
4. **Fais une maquette par direction** : au minimum l'accueil, en HTML/CSS jetable et
   avec mes vraies photos. Montre-les-moi côte à côte.
5. **J'en choisis une** (ou je mixe). Tu la **peaufines** en profondeur : accueil,
   page série photo et page CV, avec les interactions principales prototypées. Itère
   avec moi jusqu'à validation.
6. **Seulement ensuite**, fige le design system (tokens, typo, couleurs, motion) et
   construis le vrai site page par page, en commençant par l'accueil. Après chaque
   étape, dis-moi quoi tester.

Si le dossier photos est vide, arrête-toi et demande-moi les photos. N'utilise pas de
placeholders pour l'exploration de design.
```

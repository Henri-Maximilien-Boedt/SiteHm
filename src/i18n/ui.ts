export const languages = { fr: 'Français', en: 'English' } as const;
export const defaultLang = 'fr';
export type Lang = keyof typeof languages;

export const ui = {
  fr: {
    'nav.home': 'Accueil',
    'nav.photography': 'Photographie',
    'nav.work': 'Travail',
    'nav.location': 'Luxembourg / Belgique',
    'sound.on': 'Son ● on',
    'sound.off': 'Son ◦ off',
    'home.eyebrow': 'Photographe · Développeur web',
    // TODO(contenu): tagline définitive à confirmer
    'home.tagline_a': 'Je photographie',
    'home.tagline_b': 'la lumière dans le noir',
    'home.tagline_c': '. Je construis des sites qui font la même chose.',
    'home.door.photo.k': 'la série',
    'home.door.photo.h': 'Photographie',
    'home.door.work.k': 'le studio',
    'home.door.work.h': 'Travail',
    'loader.sub': 'la chambre noire',
    'a11y.drag': 'glisser',
    'a11y.view': 'voir',
    'a11y.enter': 'entrer',
    'photo.title': 'Photographie',
    'photo.lead': 'Quatre séries. La lumière dans le noir.',
    'photo.allseries': 'Les séries',
    'series.all': 'Toutes les séries',
    'series.next': 'Série suivante',
    'series.frames': 'cadres',
    'series.draft': 'Texte de série définitif à venir.',
    'lb.close': 'fermer (échap)',
    'work.back': 'Accueil',
  },
  en: {
    'nav.home': 'Home',
    'nav.photography': 'Photography',
    'nav.work': 'Work',
    'nav.location': 'Luxembourg / Belgium',
    'sound.on': 'Sound ● on',
    'sound.off': 'Sound ◦ off',
    'home.eyebrow': 'Photographer · Web developer',
    'home.tagline_a': 'I photograph',
    'home.tagline_b': 'light in the dark',
    'home.tagline_c': '. I build websites that do the same.',
    'home.door.photo.k': 'the series',
    'home.door.photo.h': 'Photography',
    'home.door.work.k': 'the studio',
    'home.door.work.h': 'Work',
    'loader.sub': 'the darkroom',
    'a11y.drag': 'drag',
    'a11y.view': 'view',
    'a11y.enter': 'enter',
    'photo.title': 'Photography',
    'photo.lead': 'Four series. Light in the dark.',
    'photo.allseries': 'The series',
    'series.all': 'All series',
    'series.next': 'Next series',
    'series.frames': 'frames',
    'series.draft': 'Final series text coming soon.',
    'lb.close': 'close (esc)',
    'work.back': 'Home',
  },
} as const;

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)['fr']): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, seg] = url.pathname.split('/');
  if (seg in ui) return seg as Lang;
  return defaultLang;
}

/** chemin équivalent dans l'autre langue (pour le sélecteur) */
export function switchLangPath(url: URL, to: Lang): string {
  const parts = url.pathname.split('/');
  if (parts[1] === 'fr' || parts[1] === 'en') parts[1] = to;
  else parts.splice(1, 0, to);
  return parts.join('/') || `/${to}`;
}

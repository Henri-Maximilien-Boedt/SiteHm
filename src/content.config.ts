import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Collection "séries" — une entrée par série photo.
 * Ajouter une série = déposer un .md ici (pas de code à toucher).
 */
const series = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
  schema: ({ image }) =>
    z.object({
      title: z.object({ fr: z.string(), en: z.string() }),
      intro: z.object({ fr: z.string(), en: z.string() }).optional(),
      order: z.number().default(99),
      cover: image().optional(),
      // flou de vélocité renforcé pour certaines séries (ex: motorsport)
      speedBlur: z.number().default(1),
      location: z.string().optional(),
      year: z.string().optional(),
    }),
});

/**
 * Collection "photos" — une entrée par image.
 * Frontmatter: titre (FR/EN), lieu, date, EXIF optionnel. Rattachée à une série.
 */
const photos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/photos' }),
  schema: ({ image }) =>
    z.object({
      series: z.string(), // slug de la série
      title: z.object({ fr: z.string(), en: z.string() }),
      src: image(),
      location: z.string().optional(),
      date: z.string().optional(),
      order: z.number().default(99),
      exif: z
        .object({
          focal: z.string().optional(),
          aperture: z.string().optional(),
          shutter: z.string().optional(),
          iso: z.union([z.number(), z.string()]).optional(),
        })
        .partial()
        .optional(),
    }),
});

export const collections = { series, photos };

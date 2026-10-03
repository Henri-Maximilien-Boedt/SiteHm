import { readFile, readdir, mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const ORIG = path.join(ROOT, 'photos'); // originaux haute résolution
const PUBLIC = path.join(ROOT, 'public', 'photos');
const OUT = path.join(ROOT, 'src', 'content', 'photos');
const SERIES_OUT = path.join(ROOT, 'src', 'content', 'series');
const ANALYSIS = 'C:/Users/hmboe/AppData/Local/Temp/claude/C--Users-hmboe-iCloudDrive-Documents-Perso-Projects-SiteHm/614a4c1a-7b77-43be-9bb9-571ed3ca5bba/scratchpad/imgtool/analysis.json';

// qualité des sorties
const MASTER = { w: 2560, q: 88 }; // source pour <Image> (Astro ré-optimise en AVIF/WebP)
const WEB = { w: 1280, q: 82 };    // public/photos : mur WebGL (petites tuiles) + cartes/aperçus

const series = [
  ['motorsport', 'Motorsport', 'Motorsport', 1, 3, 'Spa · Paul Ricard', '2023', '_BDR0798'],
  ['seoul', 'Séoul', 'Seoul', 2, 1, 'Corée du Sud', '2024', 'DSC_2904'],
  ['paysage', 'Paysage', 'Landscape', 3, 1, 'Alpes · Sicile', '2023', '_BDR7734'],
  ['nuit', 'Nuit', 'Night', 4, 2, 'Japon', '2024', 'DSC_6857'],
];

const photos = {
  _BDR0798: ['motorsport', 'Spa · en piste', 'Spa · on track', 'Spa-Francorchamps'],
  _BDR3467: ['motorsport', 'Pit lane', 'Pit lane', 'Paul Ricard'],
  _BDR3472: ['motorsport', 'Avant la course', 'Before the race', 'Paul Ricard'],
  DSC_2693: ['seoul', 'DDP · escalier', 'DDP · staircase', 'Séoul'],
  DSC_2706: ['seoul', 'DDP · béton & ciel', 'DDP · concrete & sky', 'Séoul'],
  DSC_2753: ['seoul', 'Rue de marché', 'Market street', 'Séoul'],
  DSC_2792: ['seoul', 'Han · pont', 'Han · bridge', 'Séoul'],
  DSC_2816: ['seoul', 'Namsan · panorama', 'Namsan · skyline', 'Séoul'],
  DSC_2880: ['seoul', 'DDP · courbes', 'DDP · curves', 'Séoul'],
  DSC_2891: ['seoul', 'DDP · voûte', 'DDP · vault', 'Séoul'],
  DSC_2892: ['seoul', 'DDP · faille', 'DDP · fault', 'Séoul'],
  DSC_2895: ['seoul', 'DDP · caverne', 'DDP · cavern', 'Séoul'],
  DSC_2904: ['seoul', 'DDP · tunnel', 'DDP · tunnel', 'Séoul'],
  DSC_2915: ['seoul', 'Verre · reflet', 'Glass · reflection', 'Séoul'],
  DSC_2930: ['seoul', 'Rue · Séoul', 'Street · Seoul', 'Séoul'],
  DSC_2939: ['seoul', 'Namsan · orage', 'Namsan · storm', 'Séoul'],
  DSC_3108: ['seoul', 'Arche · surimpression', 'Arch · double exposure', 'Séoul'],
  DSC_3361: ['seoul', 'Bouée', 'The buoy', 'Corée'],
  DSC_3368: ['seoul', 'Port de pêche', 'Fishing harbour', 'Corée'],
  DSC_3395: ['seoul', 'Horizon de mer', 'Sea horizon', 'Corée'],
  DSC_3825: ['seoul', 'Busan · Le Petit Prince', 'Busan · The Little Prince', 'Busan'],
  DSC_3933: ['seoul', 'Busan · statue', 'Busan · statue', 'Busan'],
  DSC_3944: ['seoul', 'Busan · port', 'Busan · harbour', 'Busan'],
  DSC_3949: ['seoul', 'Haeundae · tours', 'Haeundae · towers', 'Busan'],
  DSC_3955: ['seoul', 'Busan · côte', 'Busan · coast', 'Busan'],
  _BDR7734: ['paysage', 'Alpes · alpenglow', 'Alps · alpenglow', 'Alpes'],
  _BDR7744: ['paysage', 'Alpes · crépuscule', 'Alps · dusk', 'Alpes'],
  _BDR7757: ['paysage', 'Sommet enneigé', 'Snowy summit', 'Alpes'],
  _BDR8863: ['paysage', 'Sicile · collines', 'Sicily · hills', 'Sicile'],
  _BDR8864: ['paysage', 'Sicile · Monte Cofano', 'Sicily · Monte Cofano', 'Sicile'],
  _BDR8943: ['paysage', 'Mer & roche', 'Sea & rock', 'Sicile'],
  _BDR8944: ['paysage', 'Sicile · maquis', 'Sicily · scrubland', 'Sicile'],
  _BDR8951: ['paysage', 'Zingaro', 'Zingaro', 'Sicile'],
  _BDR9272: ['paysage', 'Etna · ascension', 'Etna · ascent', 'Sicile'],
  _BDR7370: ['paysage', 'Traînée', 'Contrail', 'Alpes'],
  _BDR6311: ['paysage', 'Nuée', 'Flock', ''],
  _BDR7703: ['paysage', 'Pleine lune', 'Full moon', ''],
  'Lampost-3474': ['paysage', 'Bassin', 'The pool', ''],
  DSC_5585: ['nuit', 'Osaka · canal', 'Osaka · canal', 'Osaka'],
  DSC_6586: ['nuit', 'Lac · crépuscule', 'Lake · dusk', 'Japon'],
  DSC_6780: ['nuit', "Feu sur l'eau", 'Fire on water', 'Japon'],
  DSC_6857: ['nuit', 'Ukai · pêche au feu', 'Ukai · fire fishing', 'Japon'],
  DSC_7158: ['nuit', 'Osaka · heure bleue', 'Osaka · blue hour', 'Osaka'],
  DSC_7175: ['nuit', 'Osaka · tours', 'Osaka · towers', 'Osaka'],
  DSC_7186: ['nuit', 'Osaka · artère', 'Osaka · artery', 'Osaka'],
};

// map base(lowercase) -> nom de fichier original réel (extensions variées)
const origFiles = await readdir(ORIG);
const origByBase = {};
for (const f of origFiles) {
  if (!/\.(jpe?g|png|tiff?)$/i.test(f)) continue;
  origByBase[f.replace(/\.[^.]+$/, '').toLowerCase()] = f;
}
const origPath = (base) => {
  const f = origByBase[base.toLowerCase()];
  if (!f) throw new Error('original introuvable: ' + base);
  return path.join(ORIG, f);
};

const resize = (src, out, { w, q }) =>
  sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: w, height: w, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: q, mozjpeg: true })
    .toFile(out);

const exifRaw = JSON.parse(await readFile(ANALYSIS, 'utf8'));
const exifByBase = {};
for (const e of exifRaw) exifByBase[e.file.replace(/\.[^.]+$/, '')] = e;

const yamlStr = (s) => `"${String(s).replace(/"/g, '\\"')}"`;

await rm(OUT, { recursive: true, force: true });
await rm(SERIES_OUT, { recursive: true, force: true });
await mkdir(SERIES_OUT, { recursive: true });
await mkdir(PUBLIC, { recursive: true });

for (const [slug, fr, en, order, speedBlur, loc, year, cover] of series) {
  await resize(origPath(cover), path.join(SERIES_OUT, `${cover}.jpg`), MASTER);
  const md = `---
title:
  fr: ${yamlStr(fr)}
  en: ${yamlStr(en)}
order: ${order}
speedBlur: ${speedBlur}
location: ${yamlStr(loc)}
year: ${yamlStr(year)}
cover: ./${cover}.jpg
---
`;
  await mkdir(path.join(OUT, slug), { recursive: true });
  await writeFile(path.join(SERIES_OUT, `${slug}.md`), md);
}

let count = 0;
const order = {};
for (const [file, [serie, fr, en, loc]] of Object.entries(photos)) {
  const dir = path.join(OUT, serie);
  await mkdir(dir, { recursive: true });
  const src = origPath(file);
  await resize(src, path.join(dir, `${file}.jpg`), MASTER);   // master pour <Image>
  await resize(src, path.join(PUBLIC, `${file}.jpg`), WEB);   // public: WebGL + cartes
  const ex = exifByBase[file] || {};
  order[serie] = (order[serie] || 0) + 1;
  const exifBlock =
    ex.focal || ex.aperture || ex.shutter || ex.iso
      ? 'exif:\n' +
        [ex.focal && `  focal: ${yamlStr(ex.focal)}`, ex.aperture && `  aperture: ${yamlStr(ex.aperture)}`, ex.shutter && `  shutter: ${yamlStr(ex.shutter)}`, ex.iso && `  iso: ${ex.iso}`].filter(Boolean).join('\n')
      : '';
  const md = `---
series: ${yamlStr(serie)}
title:
  fr: ${yamlStr(fr)}
  en: ${yamlStr(en)}
src: ./${file}.jpg
${loc ? `location: ${yamlStr(loc)}\n` : ''}${ex.date ? `date: ${yamlStr(ex.date)}\n` : ''}order: ${order[serie]}
${exifBlock}
---
`;
  await writeFile(path.join(dir, `${file}.md`), md);
  count++;
  process.stdout.write('.');
}
console.log(`\nséries: ${series.length} · photos: ${count} · masters 2560/q88 + public 2000/q85`);

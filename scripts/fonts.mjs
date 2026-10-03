import { mkdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const FONTS_DIR = path.join(ROOT, 'public', 'fonts');
await rm(FONTS_DIR, { recursive: true, force: true });
await mkdir(FONTS_DIR, { recursive: true });

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const sources = [
  { name: 'Clash Display', url: 'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap' },
  { name: 'Satoshi', url: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap' },
  { name: 'Space Mono', url: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap' },
];

const norm = (u) => (u.startsWith('//') ? 'https:' + u : u);
let combined = '/* Fonts self-hosted · généré par scripts/fonts.mjs · ne pas éditer à la main */\n';
let downloaded = 0;

for (const s of sources) {
  let css = await (await fetch(s.url, { headers: { 'User-Agent': UA } })).text();

  // 1) retirer les fallbacks woff/ttf (on ne garde que woff2, 100% local)
  css = css.replace(/,?\s*url\(["']?(?:https:)?\/\/[^)"']+\.(?:woff|ttf)["']?\)\s*format\(["'][^)"']+["']\)/g, '');

  // 2) télécharger chaque woff2 et réécrire vers /fonts/
  const urls = [...css.matchAll(/url\(["']?((?:https:)?\/\/[^)"']+\.woff2)["']?\)/g)].map((m) => m[1]);
  for (const raw of urls) {
    const abs = norm(raw);
    const base = abs.split('/').pop().split('?')[0];
    const buf = Buffer.from(await (await fetch(abs, { headers: { 'User-Agent': UA } })).arrayBuffer());
    await writeFile(path.join(FONTS_DIR, base), buf);
    css = css.split(raw).join(`/fonts/${base}`);
    downloaded++;
  }
  combined += `\n/* ${s.name} */\n${css.trim()}\n`;
}

await writeFile(path.join(ROOT, 'src', 'styles', 'fonts.css'), combined);
console.log(`woff2 téléchargés: ${downloaded}`);

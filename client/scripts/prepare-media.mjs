import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const sharp = require('sharp');
const directory = resolve('public/assets');
await mkdir(`${directory}/responsive`, { recursive: true });
const manifest = {};
for (const file of (await readdir(directory)).filter(file => file.endsWith('.jpg'))) {
  const image = sharp(`${directory}/${file}`);
  const { width, height } = await image.metadata();
  const widths = [...new Set([480, 960, 1600, width].filter(size => size <= width))].sort((a,b) => a-b);
  for (const size of widths) await image.clone().resize({ width: size }).webp({ quality: 84 }).toFile(`${directory}/responsive/${file.replace('.jpg', '')}-${size}.webp`);
  manifest[file] = { width, height, widths };
}
await writeFile('src/data/media.json', JSON.stringify(manifest, null, 2) + '\n');

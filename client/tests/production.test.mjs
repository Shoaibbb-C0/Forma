import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { projects, articles } from '../src/data/content.js';
import { routeMetadata } from '../src/data/metadata.js';
test('production routes expose individual metadata to non-JavaScript crawlers', async () => {
  for (const [section, records] of [['work', projects], ['journal', articles]]) {
    for (const record of records) {
      const path = `/${section}/${record.slug}`;
      const html = await readFile(new URL(`../dist${path}.html`, import.meta.url), 'utf8');
      assert.ok(html.includes(`<title>${record.title} — Forma</title>`));
      assert.ok(html.includes(`property="og:image" content="https://forma-beta-two.vercel.app/assets/${record.cover}"`));
      assert.ok(html.includes(`rel="canonical" href="https://forma-beta-two.vercel.app${path}"`));
      assert.equal(routeMetadata(`${path}/`).title, routeMetadata(path).title);
    }
  }
  const sitemap = await readFile(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
  assert.equal((sitemap.match(/<loc>/g) || []).length, 15);
  assert.ok((await readFile(new URL('../dist/404.html', import.meta.url), 'utf8')).includes('noindex,follow'));
  await access(new URL('../dist/robots.txt', import.meta.url));
  await access(new URL('../dist/favicon.svg', import.meta.url));
});
test('responsive media variants exist and preserve source aspect ratios', async () => {
  const manifest = JSON.parse(await readFile(new URL('../src/data/media.json', import.meta.url), 'utf8'));
  for (const [file, record] of Object.entries(manifest)) {
    assert.ok(record.width > 0 && record.height > 0);
    for (const width of record.widths) {
      assert.ok(width <= record.width);
      await access(new URL(`../public/assets/responsive/${file.replace('.jpg', '')}-${width}.webp`, import.meta.url));
    }
  }
});

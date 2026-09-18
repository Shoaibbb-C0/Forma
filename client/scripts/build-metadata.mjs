import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { projects, articles } from '../src/data/content.js';
import { routeMetadata, routeStructuredData } from '../src/data/metadata.js';
import { loadEnv } from 'vite';
import media from '../src/data/media.json' with { type: 'json' };
const env = loadEnv('production', process.cwd(), 'VITE_');
const origin = new URL(env.VITE_SITE_URL || 'https://forma-beta-two.vercel.app').origin;
const template = await readFile('dist/index.html', 'utf8');
const paths = ['/', '/work', '/studio', '/services', '/journal', '/contact', ...projects.map(p => `/work/${p.slug}`), ...articles.map(a => `/journal/${a.slug}`)];
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const path of [...paths, '/404']) {
  const meta = routeMetadata(path);
  const url = new URL(path, origin).href;
  let html = template.replace(/<title>[\s\S]*?<\/title>/, '').replace(/<meta\s+(?:name="(?:description|robots|twitter:[^"]+)"|property="og:[^"]+")[\s\S]*?>/g, '');
  const tags = { description: meta.description, robots: meta.robots, 'twitter:card': 'summary_large_image', 'twitter:title': meta.title, 'twitter:description': meta.description, 'twitter:image': new URL(meta.image, origin).href };
  const social = { title: meta.title, description: meta.description, image: new URL(meta.image, origin).href, url, type: meta.type, site_name: 'FORMA' };
  html = html.replace('</head>', `<title>${escape(meta.title)}</title>\n<link rel="canonical" href="${url}" />\n${Object.entries(tags).map(([name, content]) => `<meta name="${name}" content="${escape(content)}" />`).join('\n')}\n${Object.entries(social).map(([name, content]) => `<meta property="og:${name}" content="${escape(content)}" />`).join('\n')}\n</head>`);
  const record = projects.find(p => path === `/work/${p.slug}`) || articles.find(a => path === `/journal/${a.slug}`);
  const cover = path === '/' ? 'ridge.jpg' : record?.cover;
  if (path !== '/404') {
    html = html.replace('</head>', `<script id="route-schema" type="application/ld+json">${JSON.stringify(routeStructuredData(path, origin)).replaceAll('<', '\\u003c')}</script>\n</head>`);
  }
  if (cover) {
    const srcset = media[cover].widths.map(width => `/assets/responsive/${cover.replace('.jpg', '')}-${width}.webp ${width}w`).join(', ');
    html = html.replace('</head>', `<link rel="preload" as="image" href="${meta.image}" imagesrcset="${srcset}" imagesizes="${path === '/' ? '(max-width: 650px) 100vw, 48vw' : '(max-width: 650px) 100vw, 80vw'}" fetchpriority="high" />\n</head>`);
  }
  html = html.replace('<div id="root"></div>', `<div id="root"></div><noscript><main><h1>${escape(meta.title)}</h1><p>${escape(meta.description)}</p>${record ? `<img src="${meta.image}" alt="${escape(record.title)}" />` : ''}<p><a href="/work">Explore projects</a> · <a href="/studio">About the studio</a> · <a href="/contact">Get in touch</a></p><p>Enable JavaScript for the interactive portfolio.</p></main></noscript>`);
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path => `<url><loc>${new URL(path, origin).href}</loc></url>`).join('')}</urlset>\n`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generated metadata and sitemap for ${paths.length} public routes.`);

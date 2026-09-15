#!/usr/bin/env node
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const SITE_URL = 'https://careandprotecthomecare.com';
const today = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/physical-therapy', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/occupational-therapy', changefreq: 'monthly', priority: '0.9' },
  { path: '/services/speech-therapy', changefreq: 'monthly', priority: '0.9' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.7' },
];

function loadPosts() {
  const file = resolve(root, 'src/pages/blogData.ts');
  if (!existsSync(file)) return [];
  const src = readFileSync(file, 'utf8');
  const slugs = [...src.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
  const dates = [...src.matchAll(/date:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
  return slugs.map((slug, i) => ({
    slug,
    date: dates[i] ? new Date(dates[i]).toISOString().slice(0, 10) : today,
  }));
}

function toIsoDate(input) {
  const d = new Date(input);
  return isNaN(d.getTime()) ? today : d.toISOString().slice(0, 10);
}

const posts = loadPosts();

const urls = [
  ...staticRoutes.map((r) => ({
    loc: `${SITE_URL}${r.path === '/' ? '' : r.path}`,
    lastmod: today,
    changefreq: r.changefreq,
    priority: r.priority,
  })),
  ...posts.map((p) => ({
    loc: `${SITE_URL}/blog/${p.slug}`,
    lastmod: toIsoDate(p.date),
    changefreq: 'yearly',
    priority: '0.6',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(root, 'public/sitemap.xml');
writeFileSync(outPath, xml);
console.log(`sitemap.xml written to public/ with ${urls.length} URLs`);

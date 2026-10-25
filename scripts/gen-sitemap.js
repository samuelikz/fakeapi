// Gera docs/public/sitemap.xml a partir da lista de rotas da docs.
// Uso: node scripts/gen-sitemap.js
const fs = require('node:fs');
const path = require('node:path');

const BASE = process.env.DOCS_BASE_URL || 'https://samuelikz.github.io/fakeapi';
const MODULES = ['person', 'internet', 'location', 'phone', 'date', 'number', 'string', 'lorem', 'br', 'commerce', 'finance', 'color', 'image', 'company', 'system'];

const routes = ['/docs', '/docs/createfaker', '/docs/seed', '/docs/stability', '/docs/examples', '/docs/cheatsheet', '/docs/api/faker'];
for (const m of MODULES) routes.push(`/docs/api/${m}`);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${BASE}${r}</loc></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '..', 'docs', 'public', 'sitemap.xml'), xml);
console.log('docs/public/sitemap.xml atualizado com ' + routes.length + ' rotas.');

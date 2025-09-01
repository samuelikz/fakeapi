require('dotenv').config();
const express = require('express');
const path = require('path');              // ⬅️ novo
const db = require('./db');
const cors = require('./middleware/cors');
const logger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors);
app.use(logger);

// servir a página separada (public/index.html)
app.use(express.static(path.join(__dirname, '..', 'public')));

// endpoint usado pela página para listar recursos com contagem
app.get('/__resources', (_req, res) => {
  res.json(db.counts()); // [{ name, count }]
});

// (opcional) ajuda em texto
app.get('/_docs', (_req, res) => {
  res.type('text').send(`
GET /:resource          -> array (q, _page, _limit, _meta=1 para metadata)
GET /:resource/:id
POST/PUT/PATCH/DELETE /:resource/:id
Acesse / para a página inicial.
`);
});

// ==== CRUD dinâmico (mesmo que você já tinha) ====
function mountCollection(resource) {
  app.get(`/${resource}`, (req, res) => {
    const { items, total, page, limit } = db.list(resource, req.query);
    res.set('X-Total-Count', String(total));
    const wantMeta = String(req.query._meta || '0') === '1';
    if (!wantMeta) return res.json(items);
    const pages = Math.ceil(total / (limit || 1));
    res.json({ data: items, meta: { page, limit, total, pages } });
  });

  app.get(`/${resource}/:id`, (req, res) => {
    const item = db.get(resource, req.params.id);
    if (!item) return res.status(404).json({ error: 'Not Found' });
    res.json(item);
  });

  app.post(`/${resource}`, (req, res) => {
    const created = db.create(resource, req.body || {});
    res.status(201).json(created);
  });

  app.put(`/${resource}/:id`, (req, res) => {
    const updated = db.update(resource, req.params.id, req.body || {}, false);
    if (!updated) return res.status(404).json({ error: 'Not Found' });
    res.json(updated);
  });

  app.patch(`/${resource}/:id`, (req, res) => {
    const updated = db.update(resource, req.params.id, req.body || {}, true);
    if (!updated) return res.status(404).json({ error: 'Not Found' });
    res.json(updated);
  });

  app.delete(`/${resource}/:id`, (req, res) => {
    const removed = db.remove(resource, req.params.id);
    if (!removed) return res.status(404).json({ error: 'Not Found' });
    res.status(204).send();
  });
}

db.collections().forEach(mountCollection);

app.post('/_ensure/:resource', (req, res) => {
  const resource = req.params.resource;
  const created = db.create(resource, req.body || {});
  mountCollection(resource);
  res.status(201).json(created);
});

app.listen(port, () => {
  console.log(`✅ JSON server on http://localhost:${port}`);
});

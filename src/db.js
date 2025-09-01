const path = require('path');
const { safeReadJSON, safeWriteJSON, nextId } = require('./utils');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'data', 'db.json');

function loadDB() { return safeReadJSON(DB_PATH); }
function saveDB(db) { safeWriteJSON(DB_PATH, db); }

function ensureCollection(db, name) {
  if (!db[name]) db[name] = [];
}

function create(collection, payload) {
  const db = loadDB();
  ensureCollection(db, collection);
  const id = nextId(db[collection]);
  const item = { id, ...payload };
  db[collection].push(item);
  saveDB(db);
  return item;
}

function list(collection, query = {}) {
  const db = loadDB();
  ensureCollection(db, collection);
  let items = db[collection];

  if (query.q) {
    const q = String(query.q).toLowerCase();
    items = items.filter(i => JSON.stringify(i).toLowerCase().includes(q));
  }

  const page = parseInt(query._page || '1', 10);
  const limit = parseInt(query._limit || '50', 10);
  const start = (page - 1) * limit;
  const end = start + limit;

  const total = items.length;
  const paged = items.slice(start, end);

  return { items: paged, total, page, limit };
}

function get(collection, id) {
  const db = loadDB();
  ensureCollection(db, collection);
  return db[collection].find(i => String(i.id) === String(id)) || null;
}

function update(collection, id, payload, merge = true) {
  const db = loadDB();
  ensureCollection(db, collection);
  const idx = db[collection].findIndex(i => String(i.id) === String(id));
  if (idx === -1) return null;
  const current = db[collection][idx];
  const next = merge ? { ...current, ...payload, id: current.id } : { id: current.id, ...payload };
  db[collection][idx] = next;
  saveDB(db);
  return next;
}

function remove(collection, id) {
  const db = loadDB();
  ensureCollection(db, collection);
  const before = db[collection].length;
  db[collection] = db[collection].filter(i => String(i.id) !== String(id));
  const removed = db[collection].length < before;
  if (removed) saveDB(db);
  return removed;
}

function collections() {
  const db = loadDB();
  return Object.keys(db);
}

/** Retorna [{ name: 'posts', count: 7 }, ...] */
function counts() {
  const db = loadDB();
  return Object.keys(db)
    .sort((a, b) => a.localeCompare(b))
    .map(name => ({ name, count: Array.isArray(db[name]) ? db[name].length : 0 }));
}

module.exports = { create, list, get, update, remove, collections, counts };

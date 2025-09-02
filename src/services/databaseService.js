const DB_CONFIG = require('../config/database');
const { safeReadJSON, safeWriteJSON, nextId } = require('../utils/fileUtils');

class DatabaseService {
  constructor() {
    this.dbPath = DB_CONFIG.path;
  }

  loadDB() {
    return safeReadJSON(this.dbPath);
  }

  saveDB(db) {
    safeWriteJSON(this.dbPath, db);
  }

  ensureCollection(db, name) {
    if (!db[name]) db[name] = [];
  }

  create(collection, payload) {
    const db = this.loadDB();
    this.ensureCollection(db, collection);
    const id = nextId(db[collection]);
    const item = { 
      id, 
      ...payload, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db[collection].push(item);
    this.saveDB(db);
    return item;
  }

  list(collection, query = {}) {
    const db = this.loadDB();
    this.ensureCollection(db, collection);
    let items = db[collection];

    // Filtro de busca
    if (query.q) {
      const q = String(query.q).toLowerCase();
      items = items.filter(i => JSON.stringify(i).toLowerCase().includes(q));
    }

    // Paginação
    const page = Math.max(1, parseInt(query._page || '1', 10));
    const limit = Math.min(
      DB_CONFIG.maxItemsPerPage, 
      Math.max(1, parseInt(query._limit || DB_CONFIG.defaultPageSize, 10))
    );
    const start = (page - 1) * limit;
    const end = start + limit;

    const total = items.length;
    const paged = items.slice(start, end);

    return { items: paged, total, page, limit };
  }

  get(collection, id) {
    const db = this.loadDB();
    this.ensureCollection(db, collection);
    return db[collection].find(i => String(i.id) === String(id)) || null;
  }

  update(collection, id, payload, merge = true) {
    const db = this.loadDB();
    this.ensureCollection(db, collection);
    const idx = db[collection].findIndex(i => String(i.id) === String(id));
    if (idx === -1) return null;
    
    const current = db[collection][idx];
    const next = merge 
      ? { ...current, ...payload, id: current.id, updatedAt: new Date().toISOString() }
      : { id: current.id, ...payload, createdAt: current.createdAt, updatedAt: new Date().toISOString() };
    
    db[collection][idx] = next;
    this.saveDB(db);
    return next;
  }

  remove(collection, id) {
    const db = this.loadDB();
    this.ensureCollection(db, collection);
    const before = db[collection].length;
    db[collection] = db[collection].filter(i => String(i.id) !== String(id));
    const removed = db[collection].length < before;
    if (removed) this.saveDB(db);
    return removed;
  }

  collections() {
    const db = this.loadDB();
    return Object.keys(db);
  }

  counts() {
    const db = this.loadDB();
    return Object.keys(db)
      .sort((a, b) => a.localeCompare(b))
      .map(name => ({ 
        name, 
        count: Array.isArray(db[name]) ? db[name].length : 0 
      }));
  }

  reset() {
    const defaultDB = {};
    DB_CONFIG.defaultCollections.forEach(collection => {
      defaultDB[collection] = [];
    });
    this.saveDB(defaultDB);
    return defaultDB;
  }
}

module.exports = new DatabaseService();

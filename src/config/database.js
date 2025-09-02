const path = require('path');

const DB_CONFIG = {
  path: process.env.DB_PATH || path.join(__dirname, '..', '..', 'data', 'db.json'),
  defaultCollections: ['posts', 'users'],
  maxItemsPerPage: 100,
  defaultPageSize: 50
};

module.exports = DB_CONFIG;

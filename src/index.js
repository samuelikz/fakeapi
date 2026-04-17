/**
 * Ponto de entrada principal da aplicação
 * Este arquivo facilita imports e testes
 */

const app = require('./server');
const databaseService = require('./services/databaseService');

module.exports = {
  app,
  databaseService
};

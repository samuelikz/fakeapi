const APP_CONFIG = require('../config/app');

/**
 * Middleware CORS configurável
 * Permite requisições cross-origin com configurações personalizáveis
 */
module.exports = function cors(req, res, next) {
  // Configurações de CORS
  res.header('Access-Control-Allow-Origin', APP_CONFIG.cors.origin);
  res.header('Access-Control-Allow-Methods', APP_CONFIG.cors.methods.join(','));
  res.header('Access-Control-Allow-Headers', APP_CONFIG.cors.headers.join(', '));
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  
  next();
};
  
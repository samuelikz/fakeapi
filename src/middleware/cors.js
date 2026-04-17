const APP_CONFIG = require('../config/app');

/**
 * Middleware CORS configurável
 * Permite requisições cross-origin com configurações personalizáveis
 */
module.exports = function cors(req, res, next) {
  const origin = APP_CONFIG.cors.origin;

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', APP_CONFIG.cors.methods.join(','));
  res.header('Access-Control-Allow-Headers', APP_CONFIG.cors.headers.join(', '));

  // Allow-Credentials: true é inválido com origin wildcard '*'
  // e habilita CSRF quando usado com origem específica — só ativar quando necessário
  if (origin !== '*') {
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
};
  
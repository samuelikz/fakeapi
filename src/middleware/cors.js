const APP_CONFIG = require('../config/app');

/**
 * Middleware CORS configurável
 * Permite requisições cross-origin com configurações personalizáveis
 */
module.exports = function cors(req, res, next) {
<<<<<<< HEAD
  const origin = APP_CONFIG.cors.origin;

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', APP_CONFIG.cors.methods.join(','));
  res.header('Access-Control-Allow-Headers', APP_CONFIG.cors.headers.join(', '));

  // Allow-Credentials: true é inválido com origin wildcard '*'
  // e habilita CSRF quando usado com origem específica — só ativar quando necessário
  if (origin !== '*') {
    res.header('Access-Control-Allow-Credentials', 'true');
  }

=======
  // Configurações de CORS
  res.header('Access-Control-Allow-Origin', APP_CONFIG.cors.origin);
  res.header('Access-Control-Allow-Methods', APP_CONFIG.cors.methods.join(','));
  res.header('Access-Control-Allow-Headers', APP_CONFIG.cors.headers.join(', '));
  res.header('Access-Control-Allow-Credentials', 'true');
  
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
  // Preflight request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
<<<<<<< HEAD

=======
  
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b
  next();
};
  
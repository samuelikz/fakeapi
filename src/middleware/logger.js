const APP_CONFIG = require('../config/app');

/**
 * Middleware de logging
 * Registra todas as requisições com tempo de resposta e status
 */
module.exports = function logger(req, res, next) {
  const started = Date.now();
  const timestamp = new Date().toISOString();
  
  // Log da requisição
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl} - Started`);
  
  // Log da resposta
  res.on('finish', () => {
    const ms = Date.now() - started;
    const statusColor = res.statusCode >= 400 ? '🔴' : res.statusCode >= 300 ? '🟡' : '🟢';
    
    console.log(`[${timestamp}] ${statusColor} ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`);
    
    // Log adicional para erros
    if (res.statusCode >= 400) {
      console.error(`[${timestamp}] Error: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`);
    }
  });
  
  next();
};
  
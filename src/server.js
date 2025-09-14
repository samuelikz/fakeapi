require('dotenv').config();
const express = require('express');
const path = require('path');

// Configurações
const APP_CONFIG = require('./config/app');

// Middlewares
const cors = require('./middleware/cors');
const logger = require('./middleware/logger');
const { validateJSON, validateId, validatePagination } = require('./middleware/validation');

// Rotas existentes
const healthRoutes = require('./routes/healthRoutes');
const systemRoutes = require('./routes/systemRoutes');
const resourceRoutes = require('./routes/resourceRoutes');

// >>> AUTH (novos requires)
const { authOptional } = require('./auth/mw-auth');
const { authRouter } = require('./routes/auth.routes');
const { requireScope } = require('./auth/guard');
const { crudScopeFor } = require('./auth/crud-policy');

// Inicialização do app
const app = express();
const port = APP_CONFIG.port;

// Middlewares globais
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors);
app.use(logger);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Middleware de validação global
app.use(validateJSON);

// >>> AUTH: preenche req.user se houver Bearer + AUTH_ENABLED=true
app.use(authOptional);

// Rotas de health check (devem vir primeiro para monitoramento)
app.use('/', healthRoutes);

// Rotas do sistema (devem vir antes das rotas de recursos)
app.use('/', systemRoutes);

// >>> Rotas de autenticação (login/refresh)
app.use('/auth', authRouter);

// >>> Guard de autorização SOMENTE para recursos dinâmicos
// Evita capturar /auth, /health, /__resources, /_docs, /_reset, /_ensure, etc.
app.use(
  /^\/(?!auth|health|__resources|_docs|_reset|_ensure)([^\/]+)(\/.*)?$/i,
  requireScope(crudScopeFor)
);

// Rotas de recursos com validação específica (agora protegidas pelo guard acima)
app.use('/', validatePagination, resourceRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: APP_CONFIG.environment === 'development' ? err.message : 'Something went wrong'
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
    availableRoutes: [
      'POST /auth/login - Fake login com JWT',
      'POST /auth/refresh - Refresh de token (mock)',
      'GET /health - Health check básico',
      'GET /health/detailed - Health check detalhado',
      'GET /health/ping - Ping simples',
      'GET /health/ready - Readiness check',
      'GET /health/live - Liveness check',
      'GET /__resources - List available resources',
      'GET /_docs - API documentation',
      'GET /:resource - List items from a resource',
      'GET /:resource/:id - Get specific item',
      'POST /:resource - Create new item',
      'PUT /:resource/:id - Update item completely',
      'PATCH /:resource/:id - Update item partially',
      'DELETE /:resource/:id - Delete item'
    ]
  });
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`🚀 Fake API Server running on http://localhost:${port}`);
  console.log(`📚 Documentation available at http://localhost:${port}/_docs`);
  console.log(`🌐 Web interface available at http://localhost:${port}`);
  console.log(`💚 Health checks available at http://localhost:${port}/health`);
  console.log(`⚙️  Environment: ${APP_CONFIG.environment}`);
});

module.exports = app;

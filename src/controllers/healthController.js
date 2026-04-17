const os = require('os');
const process = require('process');
const databaseService = require('../services/databaseService');

class HealthController {
  /**
   * Health check básico
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  basic(req, res) {
    const health = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    };

    res.json(health);
  }

  /**
   * Health check detalhado com informações do sistema
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  detailed(req, res) {
    try {
      // Informações do sistema
      const systemInfo = {
        platform: os.platform(),
        arch: os.arch(),
        nodeVersion: process.version,
        memory: {
          total: os.totalmem(),
          free: os.freemem(),
          used: os.totalmem() - os.freemem(),
          usage: ((os.totalmem() - os.freemem()) / os.totalmem() * 100).toFixed(2) + '%'
        },
        cpu: {
          cores: os.cpus().length,
          loadAverage: os.loadavg()
        },
        uptime: {
          system: os.uptime(),
          process: process.uptime()
        }
      };

      // Informações da aplicação
      const appInfo = {
        pid: process.pid,
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
        nodeEnv: process.env.NODE_ENV || 'development'
      };

      // Verificar saúde do banco de dados
      let dbHealth = 'OK';
      let dbError = null;
      
      try {
        const collections = databaseService.collections();
        const counts = databaseService.counts();
        dbHealth = {
          status: 'OK',
          collections: collections.length,
          totalItems: counts.reduce((sum, col) => sum + col.count, 0),
          collectionsInfo: counts
        };
      } catch (error) {
        dbHealth = {
          status: 'ERROR',
          error: error.message
        };
        dbError = error.message;
      }

      // Status geral
      const overallStatus = dbError ? 'DEGRADED' : 'OK';

      const health = {
        status: overallStatus,
        timestamp: new Date().toISOString(),
        system: systemInfo,
        application: appInfo,
        database: dbHealth,
        checks: {
          system: 'OK',
          application: 'OK',
          database: dbError ? 'ERROR' : 'OK'
        }
      };

      // Status HTTP baseado na saúde geral
      const statusCode = overallStatus === 'OK' ? 200 : 503;
      res.status(statusCode).json(health);

    } catch (error) {
      console.error('Health check error:', error);
      res.status(503).json({
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        message: error.message
      });
    }
  }

  /**
   * Health check para load balancers (muito simples)
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  ping(req, res) {
    res.status(200).send('pong');
  }

  /**
   * Health check para readiness (pronto para receber tráfego)
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  ready(req, res) {
    try {
      // Verificar se o banco está acessível
      databaseService.collections();
      
      res.status(200).json({
        status: 'READY',
        timestamp: new Date().toISOString(),
        message: 'Application is ready to receive traffic'
      });
    } catch (error) {
      res.status(503).json({
        status: 'NOT_READY',
        timestamp: new Date().toISOString(),
        message: 'Application is not ready',
        error: error.message
      });
    }
  }

  /**
   * Health check para liveness (aplicação está viva)
   * @param {Object} req - Requisição
   * @param {Object} res - Resposta
   */
  live(req, res) {
    res.status(200).json({
      status: 'ALIVE',
      timestamp: new Date().toISOString(),
      message: 'Application is alive and running'
    });
  }
}

module.exports = new HealthController();

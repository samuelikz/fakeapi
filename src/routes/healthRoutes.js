const express = require('express');
const healthController = require('../controllers/healthController');

const router = express.Router();

// Health check básico - para monitoramento simples
router.get('/health', healthController.basic);

// Health check detalhado - para debugging e monitoramento avançado
router.get('/health/detailed', healthController.detailed);

// Ping simples - para load balancers
router.get('/health/ping', healthController.ping);

// Readiness check - para Kubernetes e orquestradores
router.get('/health/ready', healthController.ready);

// Liveness check - para Kubernetes e orquestradores
router.get('/health/live', healthController.live);

// Health check com formato alternativo (para compatibilidade)
router.get('/_health', healthController.basic);

module.exports = router;

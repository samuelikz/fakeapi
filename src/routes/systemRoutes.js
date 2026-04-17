const express = require('express');
const systemController = require('../controllers/systemController');
const { requireScope } = require('../auth/guard');

const router = express.Router();

// Endpoints do sistema — leitura livre
router.get('/__resources', systemController.getResources);
router.get('/_docs', systemController.getDocs);

// Endpoints destrutivos/de escrita — exigem escopo de admin
router.post('/_ensure/:resource', requireScope(() => 'create:*'), systemController.ensureResource);
router.post('/_reset',           requireScope(() => 'delete:*'), systemController.resetDatabase);

module.exports = router;

const express = require('express');
const systemController = require('../controllers/systemController');
<<<<<<< HEAD
const { requireScope } = require('../auth/guard');

const router = express.Router();

// Endpoints do sistema — leitura livre
router.get('/__resources', systemController.getResources);
router.get('/_docs', systemController.getDocs);

// Endpoints destrutivos/de escrita — exigem escopo de admin
router.post('/_ensure/:resource', requireScope(() => 'create:*'), systemController.ensureResource);
router.post('/_reset',           requireScope(() => 'delete:*'), systemController.resetDatabase);
=======

const router = express.Router();

// Endpoints do sistema
router.get('/__resources', systemController.getResources);
router.get('/_docs', systemController.getDocs);
router.post('/_ensure/:resource', systemController.ensureResource);
router.post('/_reset', systemController.resetDatabase);
>>>>>>> 3214833aa1adf06f8d18c37b49f1d4571f951a4b

module.exports = router;
